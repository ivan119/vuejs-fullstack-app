<script setup lang="ts">
import { supabaseClient } from '@/lib/supabaseClient.ts'
import type { Tables } from '../../../database/types.ts'
import { ref } from 'vue'
const tasks = ref<Tables<'tasks'>[] | null>(null)

;(async () => {
  const { data, error } = await supabaseClient.from('tasks').select()
  if (error) console.log(error)
  tasks.value = data
})()
</script>

<template>
  <h1>Tasks View</h1>
  <RouterLink to="/">Go to HomeView</RouterLink>
  <ul>
    <li v-for="task in tasks" :key="task.id">{{ task.name }}</li>
  </ul>
</template>
