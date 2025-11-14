<script setup lang="ts">
import { columns } from '@/utils/tableColumns/tasksColumns'
import { useTasksStore } from '@/stores/loaders/tasks.ts'

usePageStore().pageData.title = 'My Tasks'

const { getGroupedCollabs, groupedCollabs } = useCollabs()

const defineTasks = useTasksStore()
const { tasks } = storeToRefs(defineTasks)
const { getTasks } = defineTasks

await getTasks()
getGroupedCollabs(tasks.value ?? [])
const columnsWithCollabs = columns(groupedCollabs)
</script>

<template>
  <DataTable v-if="tasks" :columns="columnsWithCollabs" :data="tasks" />
</template>
