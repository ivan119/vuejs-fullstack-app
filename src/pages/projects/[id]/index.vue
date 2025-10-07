<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <h1>Single Project View {{ route.params?.id }}</h1>
</template>
