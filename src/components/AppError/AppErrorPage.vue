<script setup lang="ts">
import { useErrorState } from '@/stores/error.ts'

const router = useRouter()
router.afterEach(() => {
  useErrorState().activeError = null
})
const { activeError, isCustomError, clearErrors } = useErrorState()
const error = ref(activeError)
const message = ref('')
const customCode = ref(0)
const details = ref('')
const code = ref('')
const hint = ref('')
const statusCode = ref(0)
if (error.value) {
  if (!('code' in error.value)) {
    message.value = error.value.message
    customCode.value = error.value.customCode ?? 0
  }
  if ('code' in error.value) {
    message.value = error.value.message
    details.value = error.value.details
    hint.value = error.value.hint
    code.value = error.value.code
    statusCode.value = error.value.statusCode ?? 0
  }
}
const ErrorTemplate = import.meta.env.DEV
  ? defineAsyncComponent(() => import('./AppErrorDevSection.vue'))
  : defineAsyncComponent(() => import('./AppErrorProductionSection.vue'))
router.afterEach(() => {
  clearErrors()
})
</script>

<template>
  <section class="error">
    <ErrorTemplate
      :message
      :custom-code
      :code
      :status-code
      :hint
      :details
      :is-custom-error="isCustomError"
    />
  </section>
</template>

<style scoped>
@reference '@/assets/main.css'
.error {
}

:deep(.error__icon) {
  @apply text-7xl text-destructive;
}

:deep(.error__code) {
  @apply font-extrabold text-7xl text-secondary;
}

:deep(.error__msg) {
  @apply text-3xl font-extrabold text-primary;
}

:deep(.error-footer) {
  @apply flex flex-col items-center justify-center gap-5 mt-6 font-light;
}

:deep(.error-footer__text) {
  @apply text-lg text-muted-foreground;
}

:deep(p) {
  @apply my-2;
}
</style>
