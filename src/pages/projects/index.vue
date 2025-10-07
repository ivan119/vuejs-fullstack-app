<script setup lang="ts">
import { supabaseClient } from '@/lib/supabaseClient.ts'
import type { Tables } from '../../../database/types.ts'
import { ref } from 'vue'
const projects = ref<Tables<'projects'>[] | null>(null)

;(async () => {
  const { data, error } = await supabaseClient.from('projects').select()
  if (error) console.log(error)
  projects.value = data
})()
</script>

<template>
  <h1>Projects View</h1>
  <RouterLink to="/">Go to HomeView</RouterLink>
  <ul>
    <li v-for="project in projects" :key="project.id">{{ project.name }}</li>
  </ul>
</template>
