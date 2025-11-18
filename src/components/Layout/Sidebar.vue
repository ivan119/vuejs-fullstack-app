<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { menuKey, type MenuInjectionOptions } from '@/utils/injectionKeys.ts'
const links = [
  {
    title: 'Dashboard',
    to: '/',
    icon: 'lucide:house',
  },
  {
    title: 'Projects',
    to: '/projects',
    icon: 'lucide:building',
  },
  {
    title: 'My Tasks',
    to: '/tasks',
    icon: 'lucide:badge-check',
  },
]
const bottomLinks = [
  {
    title: 'Profile',
    to: '/profile',
    icon: 'lucide:user',
  },
  {
    title: 'Settings',
    to: '/settings',
    icon: 'lucide:settings',
  },
  {
    title: 'Sign Out',
    icon: 'lucide:log-out',
  },
]
const router = useRouter()
const executeAction = async (linkTitle: string) => {
  if (linkTitle === 'Sign Out') {
    const { logout } = await import('@/utils/supaAuth')
    const isLoggedOut = await logout()

    if (isLoggedOut) {
      router.push('/login')
    }
  }
}
defineEmits(['taskClicked'])

const { menuOpen, toggleMenu } = inject(menuKey) as MenuInjectionOptions

const windowWidth = useWindowSize().width

watchEffect(() => {
  menuOpen.value = windowWidth.value > 1024
})
</script>

<template>
  <aside
    class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 transition-[width]"
    :class="{ 'w-52': menuOpen, 'w-24': !menuOpen }"
  >
    <div class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between">
      <Button @click="toggleMenu" variant="outline" size="icon" class="w-8 h-8 cursor-pointer">
        <iconify-icon icon="lucide:menu"></iconify-icon>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" size="icon" class="w-8 h-8 cursor-pointer">
            <iconify-icon icon="lucide:plus"></iconify-icon>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="$emit('taskClicked')">Task</DropdownMenuItem>
          <DropdownMenuItem>Project</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div>
        <SidebarLinks :links />
      </div>

      <div class="border-y text-center bg-background py-3">
        <SidebarLinks :links="bottomLinks" @action-clicked="executeAction" />
      </div>
    </nav>
  </aside>
</template>
