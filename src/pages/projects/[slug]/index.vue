<script setup lang="ts">
import { type RouteLocationNormalizedLoaded } from 'vue-router'

type ProjectRoute = RouteLocationNormalizedLoaded & {
  params: {
    slug: string
  }
}
const route = useRoute() as ProjectRoute
</script>

<template>
  <h1>Single Project View {{ route.params.slug }}</h1>
</template>
