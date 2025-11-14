import { supabaseClient } from '../lib/supabaseClient.ts'
import type { QueryData } from '@supabase/supabase-js'
export const tasksWithProjectsQuery = supabaseClient
  .from('tasks')
  .select(` *, projects(id, name, slug)`)
export const projectsWithProjectsQuery = supabaseClient.from('projects').select()
export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>
export type Projects = QueryData<typeof projectsWithProjectsQuery>

// Single Project Query
export const projectQuery = (slug: string) =>
  supabaseClient
    .from('projects')
    .select(
      `*, tasks(
id,name,status,due_date)`,
    )
    .eq('slug', slug)
    .single()
// Single Project Type
export type Project = QueryData<ReturnType<typeof projectQuery>>

// Update Project
export const updateProjectQuery = (updatedProject = {}, id: number) => {
  return supabaseClient.from('projects').update(updatedProject).eq('id', id)
}

// Single Task Query
export const taskQuery = (id: string) =>
  supabaseClient.from('tasks').select(`*, projects(id, name, slug)`).eq('id', id).single()
// Single Task Type
export type Task = QueryData<ReturnType<typeof taskQuery>>

// Update Task Query

export const updateTaskQuery = (updatedTask = {}, id: number) => {
  return supabaseClient.from('tasks').update(updatedTask).eq('id', id)
}

export const profileQuery = ({ column, value }: { column: string; value: string }) => {
  return supabaseClient.from('profiles').select().eq(column, value).single()
}

export const groupedProfilesQuery = (userIds: string[]) =>
  supabaseClient.from('profiles').select('username, avatar_url, id, full_name').in('id', userIds)

export type Collabs = QueryData<ReturnType<typeof groupedProfilesQuery>>
