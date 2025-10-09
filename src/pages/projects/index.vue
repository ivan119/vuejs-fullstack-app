<script setup lang="ts">
import { supabaseClient } from '@/lib/supabaseClient.ts'
import { useDataTableHeaders } from '@/composables/DataTableHeaders.ts'
import type { Tables } from '../../../database/types.ts'
const projects = ref<Tables<'projects'>[] | null>(null)
const { setColumns, columns } = useDataTableHeaders()
const isLoading = ref(false)
const getProjects = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabaseClient.from('projects').select()
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
