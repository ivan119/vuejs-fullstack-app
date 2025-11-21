<script setup lang="ts">
import { useTasksStore } from '@/stores/loaders/tasks.ts'
const { id } = useRoute('/tasks/[id]/').params

const defineTask = useTasksStore()
const { task } = storeToRefs(defineTask)

const { getTask, updateTask, deleteTask } = defineTask
await getTask(id)
watch(
  () => task.value?.name,
  () => {
    usePageStore().pageData.title = `Task ${task.value.name || ''}`
  },
  {
    immediate: true,
  },
)
const { getProfilesByIds } = useCollabs()

const collabs = task.value?.collaborators ? await getProfilesByIds(task.value.collaborators) : []

const deleteLoading = ref(false)
const router = useRouter()
const triggerDeleteTask = async () => {
  deleteLoading.value = true
  await deleteTask()
  deleteLoading.value = false
  router.push('/tasks')
}
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <Table v-if="task">
      <TableRow>
        <TableHead> Name </TableHead>
        <TableCell>
          <AppInPlaceEditText v-model="task.name" @commit="updateTask" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Description </TableHead>
        <TableCell>
          <AppInPlaceEditTextarea v-model="task.description" @commit="updateTask" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Assignee </TableHead>
        <TableCell>-</TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Project </TableHead>
        <TableCell> {{ task.projects?.name }} </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Status </TableHead>
        <TableCell>
          <AppInPlaceEditStatus v-model="task.status" @commit="updateTask" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Collaborators </TableHead>
        <TableCell>
          <div class="flex">
            <Avatar
              v-for="collab in collabs"
              :key="collab.id"
              class="-mr-4 border border-primary hover:scale-110 transition-transform"
            >
              <RouterLink
                :to="{ name: '/users/[username]', params: { username: collab.username } }"
                class="w-full h-full flex items-center justify-center"
              >
                <AvatarImage :src="collab.avatar_url || ''" :alt="collab.avatar_url || collab.id" />
                <AvatarFallback> </AvatarFallback>
              </RouterLink>
            </Avatar>
          </div>
        </TableCell>
      </TableRow>
      <TableRow class="hover:bg-transparent">
        <TableHead class="align-top pt-4"> Comments </TableHead>

        <TableCell>
          Comments cards goes in here..

          <div class="flex flex-col justify-between p-3 bg-muted my-2 rounded-md">
            <textarea
              placeholder="Add your comment.."
              class="w-full max-w-full overflow-y-auto prose-sm prose border rounded dark:prose-invert hover:border-muted bg-background border-muted p-3"
            >
            </textarea>
            <div class="flex justify-between mt-3">
              <Button> Comment </Button>
              <div class="flex gap-4">
                <button variant="ghost" @click.prevent>
                  <iconify-icon icon="lucide:paperclip"></iconify-icon>
                  <span class="sr-only">Attach file</span>
                </button>
                <button variant="ghost" @click.prevent>
                  <iconify-icon icon="lucide:image-up"></iconify-icon>

                  <span class="sr-only">Upload image</span>
                </button>
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </Table>
    <Button @click="triggerDeleteTask" class="self-end mt-3 w-full max-w-40" variant="destructive">
      <Transition name="scale" mode="out-in">
        <iconify-icon
          v-if="deleteLoading"
          icon="lucide:loader-circle"
          class="animate-spin"
        ></iconify-icon>
        <iconify-icon v-else icon="lucide:trash-2" class="mr-1"></iconify-icon>
      </Transition>
      Delete Task
    </Button>
  </div>
</template>
