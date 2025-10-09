import { h, ref } from 'vue'
import type { Tables } from '../../database/types.ts'
import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'

export const useDataTableHeaders = <TableName extends keyof Tables<'projects' | 'tasks'>>() => {
  const columns = ref<ColumnDef<Tables<'projects' | 'tasks'>[TableName]>[]>([])

  const setColumns = (data: Tables<'projects' | 'tasks'>[], blacklist: string[], to: string) => {
    if (!data || !data.length) return
    let keys = Object.keys(data[0] as Record<TableName, unknown>)
    keys = blacklist ? keys.filter((key) => !blacklist.includes(key)) : keys
    columns.value = keys.map((key) => ({
      accessorKey: key,
      header: () => h('div', { class: 'text-left capitalize' }, key.replace('_', ' ')),
      cell: ({ row }) => {
        const value = row.getValue(key as string)
        const { slug, id } = row?.original as never
        return key === 'name' && (slug || id)
          ? h(
              RouterLink,
              {
                to: `/${to}/${id ?? slug}`,
                class: 'text-center hover:bg-muted block w-full text-left',
              },
              () => row.getValue(key),
            )
          : h(
              'div',
              { class: 'text-left font-medium' },
              Array.isArray(value) ? JSON.stringify(value) : row.getValue(key),
            )
      },
    }))
  }

  return { columns, setColumns }
}
