<script setup lang="ts">
import { profileQuery } from '@/utils/supaQueries.ts'
import type { Tables } from '../../../database/types.ts'
import { useErrorState } from '@/stores/error'
import { usePageStore } from '@/stores/page.ts'

const { username } = useRoute('/users/[username]').params
const profile = ref<Tables<'profiles'> | null>()
const getProfile = async () => {
  const { error, data, status } = await profileQuery({ column: 'username', value: username })
  if (error) useErrorState().setError({ error: error.message, customCode: status })
  profile.value = data
}
usePageStore().pageData.title = ''
await getProfile()
</script>

<template>
  <div class="mx-auto mb-10 flex w-full flex-col items-center justify-center py-10 text-center">
    <div class="flex flex-col items-center justify-center pb-4">
      <Avatar size="lg">
        <AvatarImage v-if="profile?.avatar_url" :src="profile?.avatar_url" alt="@radix-vue" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <pre>{{ profile }}</pre>
      <p class="mt-2 text-gray-500">{{ profile?.full_name }}</p>
      <h1 class="mt-5 text-4xl font-bold">{{ profile?.bio }}</h1>
      <p class="mt-2 text-sm text-green-500">MODE: {{ profile?.mode }}</p>
    </div>
    <Button class="cursor-pointer">Edit profile</Button>
  </div>
</template>
