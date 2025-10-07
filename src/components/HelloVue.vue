<script setup lang="ts">
import { ref } from 'vue'

const x = ref<number>(6)
</script>

<template>
  <div v-for="(num, index) in x" :key="index">{{ num }}</div>
</template>
