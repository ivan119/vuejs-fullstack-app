import {
  type Project,
  projectQuery,
  type Projects,
  projectsWithProjectsQuery,
} from '@/utils/supaQueries.ts'
import { useMemoize } from '@vueuse/core'

export const useProjectsStore = defineStore('projects-store', () => {
  const project = ref<Project | null>(null)
  const projects = ref<Projects | null>(null)

  const loadProject = useMemoize(async (slug: string) => await projectQuery(slug))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadProjects = useMemoize(async (key: string) => await projectsWithProjectsQuery)

  interface ValidateCacheParams {
    ref: typeof project | typeof projects
    query: typeof projectQuery | typeof projectsWithProjectsQuery
    key: string
    loaderFn: typeof loadProject | typeof loadProjects
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
  const getProjects = async () => {
    projects.value = null
    const { data, error, status } = await loadProjects('projects')
    if (error) useErrorState().setError({ error, customCode: status })
    if (data) projects.value = data
    validateCache({
      ref: projects,
      query: projectsWithProjectsQuery,
      key: 'projects',
      loaderFn: loadProjects,
    })
  }
  const getProject = async (slug: string) => {
    project.value = null
    const { data, error, status } = await loadProject(slug)
    if (error) useErrorState().setError({ error, customCode: status })
    if (data) project.value = data
    validateCache({
      ref: project,
      query: projectQuery,
      key: slug,
      loaderFn: loadProject,
    })
  }
  return {
    project,
    projects,
    getProject,
    getProjects,
  }
})
