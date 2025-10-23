<script setup lang="ts">
import { useDataTableHeaders } from '@/composables/DataTableHeaders.ts'
import { taskWithProjectsQuery, type TasksWithProjects } from '@/utils/supaQueries'
usePageStore().pageData.title = 'My Tasks'
const { columns, setColumns } = useDataTableHeaders<TasksWithProjects[number]>()
const tasks = ref<TasksWithProjects | null>(null)

const blacklist = ['id', 'created_at', 'description', 'project_id'] as string[]
const getData = async () => {
  const { data, error, status } = await taskWithProjectsQuery
  if (error) {
    useErrorState().setError({ error, customCode: status })
  }
  tasks.value = data
}

const getTasksAndSetColumns = async () => {
  await getData()
  if (tasks.value?.length) setColumns(tasks.value, blacklist, 'tasks')
}
await getTasksAndSetColumns()
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
