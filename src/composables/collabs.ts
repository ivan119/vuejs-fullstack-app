import { groupedProfilesQuery, type Projects, type TasksWithProjects } from '@/utils/supaQueries.ts'
import type { Collabs } from '@/utils/supaQueries.ts'
import type { GroupedCollabs } from '@/types/GroupedCollabs.ts'

export const useCollabs = () => {
  const groupedCollabs = ref<GroupedCollabs>({})
  const collabs = ref<Collabs>([])
  const getProfilesByIds = async (userIds: string[]) => {
    const { data, error } = await groupedProfilesQuery(userIds)
    if (error || !data) return []
    return data
  }
  const nonAsyncGetProfilesByIds = (userIds: string[]) => {
    groupedProfilesQuery(userIds).then(({ data, error }) => {
      if (error || !data) return []
      collabs.value = data
    })
  }
  const getGroupedCollabs = async (items: Projects | TasksWithProjects) => {
    const filteredItems = items.filter((item) => item.collaborators.length)
    const promises = filteredItems.map((item) => getProfilesByIds(item.collaborators))
    const results = await Promise.all(promises)
    filteredItems.forEach((item, index) => {
      groupedCollabs.value[item.id] = results[index]
    })
  }
  return {
    collabs,
    groupedCollabs,
    getProfilesByIds,
    nonAsyncGetProfilesByIds,
    getGroupedCollabs,
  }
}
