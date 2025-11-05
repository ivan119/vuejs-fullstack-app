import { supabaseClient } from '../lib/supabaseClient.ts'
import type { QueryData } from '@supabase/supabase-js'
export const taskWithProjectsQuery = supabaseClient
  .from('tasks')
  .select(` *, projects(id, name, slug)`)
export const projectsWithProjectsQuery = supabaseClient.from('projects').select()
export type TasksWithProjects = QueryData<typeof taskWithProjectsQuery>
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

// Single Task Query
export const taskQuery = (id: string) =>
  supabaseClient.from('tasks').select(`*, projects(id, name, slug)`).eq('id', id).single()
// Single Task Type
export type Task = QueryData<ReturnType<typeof taskQuery>>

export const profileQuery = (id: string) => {
  return supabaseClient.from('profiles').select().eq('id', id).single()
}
