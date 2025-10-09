<script setup lang="ts">
usePageStore().pageData.title = 'Home'
</script>

<template>
  <div>
    <h1 class="text-green-500">Home Page</h1>
    <RouterLink to="/projects">Go to projects</RouterLink>
  </div>
</template>
