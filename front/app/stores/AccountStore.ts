import { HTTPError } from 'ky'
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

  // L'API demande le mot de passe actuel et répond 400 s'il est faux.
  const deleteAccount = async (password: string): Promise<'deleted' | 'wrong-password' | 'error'> => {
    if (!CurrentUser.value) {
      return 'error'
    }
    try {
      await api.delete(`users/${CurrentUser.value.id}`, { json: { password } })
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 400) {
        return 'wrong-password'
      }
      console.error('Error deleting account:', error)
      return 'error'
    }
    // Le compte est supprimé : la déconnexion ne doit pas empêcher de quitter la session.
    await api.post('auth/logout').catch(() => undefined)
    clearSession()
    sessionCheck = Promise.resolve(false)
    window.location.assign('/')
    return 'deleted'
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
