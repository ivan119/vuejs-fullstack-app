import { supabaseClient } from '../lib/supabaseClient.ts'
import type { QueryData } from '@supabase/supabase-js'
export const taskWithProjectsQuery = supabaseClient
  .from('tasks')
  .select(` *, projects(id, name, slug)`)
export const projectsWithProjectsQuery = supabaseClient.from('projects').select()
export type TasksWithProjects = QueryData<typeof taskWithProjectsQuery>
export type Projects = QueryData<typeof projectsWithProjectsQuery>
