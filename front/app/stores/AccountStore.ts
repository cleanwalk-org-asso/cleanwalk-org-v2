import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { User, Association, modifyAssociation } from '@/interfaces/userInterface'
import { isNotFoundError } from '@/services/apiError'

export const useAccountStore = defineStore('account', () => {
  const { $api: api } = useNuxtApp()
  const router = useRouter()

  const CurrentUser: Ref<User | undefined> = ref()
  const isLoggedIn = ref(false)
  let sessionCheck: Promise<boolean> | null = null

  const clearSession = () => {
    isLoggedIn.value = false
    CurrentUser.value = undefined
  }

  const getOrganizationById = async (organizationId: number) => {
    try {
      const response = await api.get(`associations/${organizationId}`)
      return (await response.json()) as Association
    } catch (error) {
      if (isNotFoundError(error)) return undefined
      throw error
    }
  }

  const getAssoList = async () => {
    const response = await api.get('associations')
    return (await response.json()) as Association[]
  }

  async function logout() {
    try {
      await api.post('auth/logout')
    } finally {
      clearSession()
      sessionCheck = Promise.resolve(false)
    }
    await router.push({ name: 'login' })
  }

  const fetchSession = async () => {
    try {
      const res = await api.get('auth/me')
      CurrentUser.value = (await res.json()) as User
      isLoggedIn.value = true
      return true
    } catch {
      clearSession()
      return false
    }
  }

  /** Vérifie la session une seule fois. `force` relit l'utilisateur, par exemple après une connexion. */
  const checkAuth = (force = false) => {
    if (force || !sessionCheck) {
      sessionCheck = fetchSession()
    }
    return sessionCheck
  }

  const modifyUser = async (userId: number, name?: string, profilePicture?: string) => {
    const response = await api.put(`users/${userId}`, {
      json: { name, profilePicture },
    })
    return response.ok
  }

  const modifyAssociation = async (asso: modifyAssociation) => {
    const response = await api.put(`associations/${CurrentUser.value!.id}`, {
      json: asso,
    })
    return response.ok
  }

  const deleteAccount = async () => {
    if (!CurrentUser.value) {
      return false
    }
    try {
      await api.delete(`users/${CurrentUser.value.id}`)
      await api.post('auth/logout')
    } catch (error) {
      console.error('Error deleting account:', error)
      return false
    }
    clearSession()
    sessionCheck = Promise.resolve(false)
    window.location.assign('/')
    return true
  }

  return {
    logout,
    isLoggedIn,
    CurrentUser,
    modifyUser,
    getOrganizationById,
    modifyAssociation,
    getAssoList,
    checkAuth,
    deleteAccount,
  }
})
