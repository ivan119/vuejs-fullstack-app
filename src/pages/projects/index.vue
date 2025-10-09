<script setup lang="ts">
import { supabaseClient } from '@/lib/supabaseClient.ts'
import type { Tables } from '../../../database/types.ts'
import { useDataTableHeaders } from '@/composables/DataTableHeaders.ts'
import DataTable from '@/components/ui/data-table/DataTable.vue'
const projects = ref<Tables<'projects'>[] | null>(null)
const { setColumns, columns } = useDataTableHeaders()
const isLoading = ref(false)
const getProjects = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabaseClient.from('projectss').select()
    if (error) console.log(error)
    projects.value = data
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(async () => {
  await getProjects()
  if (projects.value) setColumns(projects.value, ['id', 'created_at', 'slug'], 'projects')
})
</script>

<template>
  <div>
    <div v-if="isLoading">⏳ Loading projects...</div>
    <DataTable v-else-if="projects" :columns="columns" :data="projects" />
    <div v-else>No tasks found.</div>
  </div>
</template>
