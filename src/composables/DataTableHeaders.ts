import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'
// Helper type for items that might have slug/id
type WithIdentifier = {
  slug?: string
  id?: string | number
}
// Helper type for items that might have nested relations
type WithRelations<T> = T & {
  projects?: WithIdentifier & { name?: string }
  tasks?: WithIdentifier & { name?: string }
}

export const useDataTableHeaders = <T extends Record<string, unknown>>() => {
  const columns = ref<ColumnDef<T>[]>([])

  const setColumns = (data: T[], blacklist: string[] = [], to: string) => {
    if (!data || !data.length) return
    let keys = Object.keys(data[0] as T) as (keyof T)[]
    keys = blacklist ? keys.filter((key) => !blacklist.includes(key as string)) : keys
    columns.value = keys.map((key) => ({
      accessorKey: key as string,
      header: () => h('div', { class: 'text-left capitalize' }, (key as string).replace('_', ' ')),
      cell: ({ row }) => {
        const value = row.getValue(key as string)
        const includesLinks = ['name', 'projects', 'tasks']
        const original = row.original as WithRelations<WithIdentifier>
        const keyStr = key as string
        const { slug, id } =
          keyStr === 'projects' || keyStr === 'tasks' ? (original[keyStr] ?? {}) : original
        return includesLinks.includes(keyStr) && (slug || id)
          ? h(
              RouterLink,
              {
                to: ['projects', 'tasks'].includes(keyStr)
                  ? `/${keyStr}/${slug}`
                  : `/${to}/${to === 'projects' ? slug : id}`,
                class: 'text-center hover:bg-muted block w-full text-left',
              },
              () =>
                keyStr === 'projects'
                  ? original.projects?.name
                  : keyStr === 'tasks'
                    ? original.tasks?.name
                    : row.getValue(key as string),
            )
          : h(
              'div',
              { class: 'text-left font-medium' },
              Array.isArray(value) ? JSON.stringify(value) : row.getValue(key as string),
            )
      },
    }))
  }
  return { columns, setColumns }
}
