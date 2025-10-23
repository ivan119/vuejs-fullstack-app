import type { CustomError, ExtendedPostgrestError } from '@/types/Error'
import type { PostgrestError } from '@supabase/supabase-js'

export const useErrorState = defineStore('error-store', () => {
  const activeError = ref<null | CustomError | ExtendedPostgrestError>(null)
  const isCustomError = ref(false)
  const setError = ({
    error,
    customCode,
  }: {
    error: string | PostgrestError | Error
    customCode?: number
  }): void => {
    if (typeof error === 'string') isCustomError.value = true
    if (typeof error === 'string' || error instanceof Error) {
      activeError.value = typeof error === 'string' ? Error(error) : error
      activeError.value.customCode = customCode || 500
      return
    }

    activeError.value = error
    // @ts-ignore
    activeError.value.statusCode = customCode || 500
  }
  const clearErrors = () => {
    activeError.value = null
    isCustomError.value = false
  }
  return {
    activeError,
    isCustomError,
    setError,
    clearErrors,
  }
})
