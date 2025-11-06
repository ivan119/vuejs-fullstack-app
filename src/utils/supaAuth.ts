import { supabaseClient } from '@/lib/supabaseClient.ts'
import type { RegisterForm, LoginForm } from '@/types/AuthForm.ts'

const authStore = useAuthStore()

export const register = async (formData: RegisterForm) => {
  const { data, error } = await supabaseClient.auth.signUp({
    email: formData.email,
    password: formData.password,
  })
  if (error) return console.log(error)

  if (data.user) {
    const { error } = await supabaseClient.from('profiles').insert({
      id: data.user.id,
      username: formData.username,
      full_name: formData.firstName.concat(' ', formData.lastName),
    })
    if (error) return console.log(`Profiles error: ${error}`)
  }
  await authStore.setAuth(data.session)
  return true
}

export const login = async (formData: LoginForm) => {
  const { error, data } = await supabaseClient.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })
  if (error) return console.error('Login Error', error)
  await authStore.setAuth(data.session)
  return true
}

export const logout = async () => {
  const { error } = await supabaseClient.auth.signOut()
  if (error) return console.error('Logout Error', error)
  await authStore.setAuth()
  return true
}
