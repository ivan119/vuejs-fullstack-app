<script setup lang="ts">
import { useDataTableHeaders } from '@/composables/DataTableHeaders.ts'
import { taskWithProjectsQuery, type TasksWithProjects } from '@/utils/supaQueries'
usePageStore().pageData.title = 'My Tasks'
const { columns, setColumns } = useDataTableHeaders<TasksWithProjects[number]>()
const tasks = ref<TasksWithProjects | null>(null)

const blacklist = ['id', 'created_at', 'description', 'project_id'] as string[]
const isLoading = ref(true)
const getData = async () => {
  isLoading.value = true
  try {
    const { data } = await taskWithProjectsQuery
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
