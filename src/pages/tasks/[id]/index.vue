<script setup lang="ts">
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router'
type ProjectRoute = RouteLocationNormalizedLoaded & {
  params: {
    id: string
  }
}
const route = useRoute() as ProjectRoute
</script>

<template>
  <h1>Single Task View {{ route.params?.id }}</h1>
</template>
