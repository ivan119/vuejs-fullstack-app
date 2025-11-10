<script setup lang="ts">
import { useDataTableHeaders } from '@/composables/DataTableHeaders.ts'
import { useProjectsStore } from '@/stores/loaders/projects.ts'
import type { Projects } from '@/utils/supaQueries.ts'

const { setColumns, columns } = useDataTableHeaders<Projects[number]>()

usePageStore().pageData.title = 'Projects'
const projectsLoader = useProjectsStore()
const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader
const getProjectsAndSetColumns = async () => {
  await getProjects()
  if (projects.value) setColumns(projects.value, ['id', 'created_at', 'slug'], 'projects')
}
await getProjectsAndSetColumns()
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
