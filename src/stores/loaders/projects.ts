import { type Projects, projectsWithProjectsQuery } from '@/utils/supaQueries.ts'
import { useMemoize } from '@vueuse/core'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects>([])
  const loadProjects = useMemoize(async (key: string) => await projectsWithProjectsQuery)

  // Caching technique simulating SWR
  const validateCache = () => {
    if (projects.value?.length) {
      projectsWithProjectsQuery.then(({ data, error }) => {
        if (JSON.stringify(data) === JSON.stringify(projects.value)) {
          console.log('cached and mateched data are same')
          return
        } else {
          console.log('cached and mateched data have missmatched')
          loadProjects.delete('projects')
          if (!error && data) projects.value = data
        }
      })
    }
  }
  const getProjects = async () => {
    const { data, error, status } = await loadProjects('projects')
    if (error) useErrorState().setError({ error, customCode: status })
    if (data) projects.value = data
    validateCache()
  }
  return {
    projects,
    getProjects,
  }
})
