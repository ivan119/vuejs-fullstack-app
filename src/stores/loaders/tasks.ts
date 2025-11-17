import {
  deleteTaskQuery,
  type Task,
  taskQuery,
  type TasksWithProjects,
  tasksWithProjectsQuery,
  updateTaskQuery,
} from '@/utils/supaQueries.ts'
import { useMemoize } from '@vueuse/core'
export const useTasksStore = defineStore('tasks-store', () => {
  const task = ref<Task | null>(null)
  const tasks = ref<TasksWithProjects | null>(null)

  const loadTask = useMemoize(async (id: string) => await taskQuery(id))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadTasks = useMemoize(async (key: string) => await tasksWithProjectsQuery)
  // Single Task
  const getTask = async (id: string) => {
    task.value = null
    const { data, error, status } = await loadTask(id)
    if (error) useErrorState().setError({ error, customCode: status })
    task.value = data
    validateCache({
      ref: task,
      query: taskQuery,
      key: id,
      loaderFn: loadTask,
    })
  }
  // Multiple Tasks
  const getTasks = async () => {
    const { data, error, status } = await loadTasks('tasks')
    if (error) useErrorState().setError({ error, customCode: status })
    tasks.value = data
    validateCache({
      ref: tasks,
      query: tasksWithProjectsQuery,
      key: 'tasks',
      loaderFn: loadTasks,
    })
  }

  interface ValidateCacheParams {
    ref: typeof task | typeof tasks
    query: typeof taskQuery | typeof tasksWithProjectsQuery
    key: string
    loaderFn: typeof loadTask | typeof loadTasks
  }

  // Caching technique simulating SWR
  const validateCache = ({ ref, query, key, loaderFn }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query
      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(data) === JSON.stringify(ref.value)) {
          console.log('cached and matched data are same')
          return
        } else {
          console.log('cached and matched data have mismatched')
          loaderFn.delete(key)
          if (!error && data) ref.value = data
        }
      })
    }
  }
  // Update Task
  const updateTask = async () => {
    if (!task.value) return
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, projects, ...taskProperties } = task.value
    await updateTaskQuery(taskProperties, task.value.id)
  }
  // Delete Task
  const deleteTask = async () => {
    if (!task.value) return
    await deleteTaskQuery(task.value.id)
  }
  return {
    task,
    tasks,
    updateTask,
    getTask,
    getTasks,
    deleteTask,
  }
})
