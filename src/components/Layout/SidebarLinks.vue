<script setup lang="ts">
interface linkProp {
  title: string
  to?: string
  icon: string
}
defineProps<{
  links: linkProp[]
}>()
const emits = defineEmits<{
  actionClicked: [string]
}>()

const emitActionClicked = (linkTitle: string): void => {
  emits('actionClicked', linkTitle)
}
const { menuOpen } = useMenu()
</script>
<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink
      v-if="link.to"
      :to="link.to"
      active-class="text-primary bg-muted"
      :class="{ 'justify-normal': menuOpen, 'justify-center': !menuOpen }"
      class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary text-muted-foreground"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span :class="{ block: menuOpen, hidden: !menuOpen }" class="text-nowrap">{{
        link.title
      }}</span>
    </RouterLink>
    <div
      v-else
      :class="{ 'justify-normal': menuOpen, 'justify-center': !menuOpen }"
      class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary text-muted-foreground cursor-pointer"
      @click="emitActionClicked(link.title)"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span :class="{ block: menuOpen, hidden: !menuOpen }" class="text-nowrap">{{
        link.title
      }}</span>
    </div>
  </template>
</template>

<style scoped>
@reference '@/assets/main.css'
TODO: SEE WHY THIS DOES NOT WORK AS EXPECTED
.nav-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground;
}
</style>
