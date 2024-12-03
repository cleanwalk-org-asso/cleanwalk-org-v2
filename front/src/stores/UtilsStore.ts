// stores/counter.js
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useUtilsStore = defineStore('utils', () => {

    const toast = ref({
        message: '',
        isSuccess: false,
        isVisible: false,
    });

    const showToast = (error: string, isSuccess: boolean, ) => {
        toast.value.isVisible = true;
        toast.value.isSuccess = isSuccess;
        toast.value.message = error;
        setTimeout(() => {
            toast.value.isVisible = false;
        }, 3000);
    }

    return {toast, showToast}
  
})
