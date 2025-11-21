<script setup lang="ts">
const value = defineModel<'in-progress' | 'completed'>()
const emit = defineEmits(['commit'])

const { readonly = false } = defineProps<{
  readonly?: boolean
}>()

const toggleValue = () => {
  if (readonly) return
  value.value = value.value === 'completed' ? 'in-progress' : 'completed'
  emit('commit')
}
</script>

<template>
  <div class="text-xl" :class="{ 'cursor-pointer': !readonly }" @click="toggleValue">
    <Transition name="scale" mode="out-in">
      <iconify-icon
        v-if="value === 'completed'"
        icon="lucide:circle-check"
        class="text-green-500"
        key="completed"
      />
      <iconify-icon v-else icon="lucide:circle-dot" class="text-gray-500" key="in-progress" />
    </Transition>
  </div>
</template>
