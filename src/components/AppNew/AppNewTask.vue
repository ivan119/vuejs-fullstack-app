<script setup lang="ts">
import { SheetContent } from '@/components/ui/sheet'
import type { CreateNewTask } from '@/types/CreateNewForm.ts'
import {
  profilesQuery,
  projectsWithProjectsQuery,
  createNewTaskQuery,
} from '@/utils/supaQueries.ts'

const sheetOpen = defineModel<boolean>()

type SelectOption = { label: string; value: number | string }
const selectOptions = ref({
  projects: [] as SelectOption[],
  profiles: [] as SelectOption[],
})

const getProjectsOptions = async () => {
  const { data: allProjects } = await projectsWithProjectsQuery
  if (!allProjects) return
  allProjects.forEach((project) => {
    selectOptions.value.projects.push({ label: project.name, value: project.id })
  })
}
const getProfilesOptions = async () => {
  const { data: allProfiles } = await profilesQuery
  if (!allProfiles) return
  allProfiles.forEach((profile) => {
    selectOptions.value.profiles.push({ label: profile.full_name, value: profile.id })
  })
}
const { profile } = storeToRefs(useAuthStore())
const createNewTask = async (formData: CreateNewTask) => {
  const task = {
    ...formData,
    collaborators: [profile.value!.id],
  }
  const { error } = await createNewTaskQuery(task)
  if (!error) sheetOpen.value = false
}
const getOptions = async () => {
  await Promise.all([getProjectsOptions(), getProfilesOptions()])
}
getOptions()
</script>
<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create New Task</SheetTitle>
      </SheetHeader>
      <FormKit
        type="form"
        @submit="createNewTask"
        submit-label="Create Task"
        :config="{
          validationVisibility: 'submit',
        }"
      >
        <FormKit
          type="text"
          name="name"
          id="name"
          label="Name"
          placeholder="My new task"
          validation="required | lenght:1,11"
        />
        <FormKit
          type="select"
          name="profile_id"
          id="profile_id"
          label="User"
          placeholder="Select a user"
          validation="required"
          :options="selectOptions.profiles"
        />
        <FormKit
          type="select"
          name="project_id"
          id="project_id"
          label="Project"
          placeholder="Select a project"
          validation="required"
          :options="selectOptions.projects"
        />
        <FormKit
          type="textarea"
          name="description"
          id="description"
          label="Description"
          validation="lenght:0,500"
          placeholder="Task description"
        />
      </FormKit>
    </SheetContent>
  </Sheet>
</template>
