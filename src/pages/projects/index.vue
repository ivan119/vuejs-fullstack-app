<script setup lang="ts">
import { useDataTableHeaders } from '@/composables/DataTableHeaders.ts'
import { projectsWithProjectsQuery, type Projects } from '@/utils/supaQueries'
const projects = ref<Projects | null>(null)
const { setColumns, columns } = useDataTableHeaders<Projects[number]>()

usePageStore().pageData.title = 'Projects'
const getProjects = async () => {
  const { data, error, status } = await projectsWithProjectsQuery
  if (error) useErrorState().setError({ error, customCode: status })
  projects.value = data
}
const getProjectsAndSetColumns = async () => {
  await getProjects()
  if (projects.value) setColumns(projects.value, ['id', 'created_at', 'slug'], 'projects')
}
await getProjectsAndSetColumns()
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
