<script setup lang="ts">
import { supabaseClient } from '@/lib/supabaseClient.ts'
import { useDataTableHeaders } from '@/composables/DataTableHeaders.ts'
import type { Tables } from '../../../database/types.ts'

usePageStore().pageData.title = 'Tasks'

const { columns, setColumns } = useDataTableHeaders()
const tasks = ref<Tables<'tasks'>[] | null>(null)

const blacklist = ['id', 'created_at', 'description'] as string[]
const isLoading = ref(true)
const getData = async () => {
  isLoading.value = true
  try {
    const { data } = await supabaseClient.from('tasks').select()
    tasks.value = data
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const getTasksAndSetColumns = async () => {
  await getData()
  if (tasks.value?.length) setColumns(tasks.value, blacklist, 'tasks')
}
await getTasksAndSetColumns()
</script>

<template>
  <div>
    <div v-if="isLoading">⏳ Loading tasks...</div>
    <DataTable v-else-if="tasks" :columns="columns" :data="tasks" />
    <div v-else>No tasks found.</div>
  </div>
</template>
