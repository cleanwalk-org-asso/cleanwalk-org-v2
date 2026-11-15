import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUtilsStore = defineStore('utils', () => {
  const toast = ref({
    message: '',
    isSuccess: false,
    isVisible: false,
  })

  const showToast = (message: string, isSuccess: boolean) => {
    toast.value.isVisible = true
    toast.value.isSuccess = isSuccess
    toast.value.message = message
    setTimeout(() => {
      toast.value.isVisible = false
    }, 3000)
  }

  return { toast, showToast }
})
