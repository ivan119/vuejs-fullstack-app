import { h, ref } from 'vue'
import type { Tables } from '../../database/types.ts'
import type { ColumnDef } from '@tanstack/vue-table'

export const useDataTableHeaders = <TableName extends keyof Tables<never>>() => {
  const columns = ref<ColumnDef<Tables<never>[TableName]>[]>([])

  const setColumns = (data: Tables<'projects' | 'tasks'>[], blacklist?: string[]) => {
    if (!data || !data.length) return
    let keys = Object.keys(data[0] as Record<TableName, unknown>)
    keys = blacklist ? keys.filter((key) => !blacklist.includes(key)) : keys
    columns.value = keys.map((key) => ({
      accessorKey: key,
      header: () => h('div', { class: 'text-left capitalize' }, key.replace('_', ' ')),
      cell: ({ row }) => {
        const value = row.getValue(key)
        return h(
          'div',
          { class: 'text-left font-medium' },
          Array.isArray(value) ? JSON.stringify(value) : row.getValue(key),
        )
      },
    }))
  }

  return { columns, setColumns }
}
