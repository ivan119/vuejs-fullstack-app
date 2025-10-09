<script setup lang="ts">
import { useDataTableHeaders } from '@/composables/DataTableHeaders.ts'
import { projectsWithProjectsQuery, type Projects } from '@/utils/supaQueries'
const isLoading = ref(false)
const projects = ref<Projects | null>(null)
const { setColumns, columns } = useDataTableHeaders<Projects[number]>()

usePageStore().pageData.title = 'Projects'
const getProjects = async () => {
  isLoading.value = true
  try {
    const { data, error } = await projectsWithProjectsQuery
    if (error) console.log(error)
    projects.value = data
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
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
