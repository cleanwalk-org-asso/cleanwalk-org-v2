import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type {
  Cleanwalk,
  CleanwalkCreation,
  CleanwalkUserSummary,
  SingleCleanwalk,
} from '@/interfaces/cleanwalkInterface'
import { isNotFoundError } from '@/services/apiError'

export const useCleanwalkStore = defineStore('cleanwalk', () => {
  const { $api: api } = useNuxtApp()
  const route = 'cleanwalks'

  const cleanwalksTab: Ref<Cleanwalk[]> = ref([])

  async function getAllCleanwalks() {
    try {
      const response = await api.get(`${route}/current`)
      if (response.ok) {
        cleanwalksTab.value = (await response.json()) as Cleanwalk[]
      } else {
        console.error('Failed to fetch cleanwalks')
      }
    } catch (error) {
      console.error('Request failed:', error)
    }
    return cleanwalksTab.value
  }

  async function getCleanwalkById(id: number): Promise<SingleCleanwalk | undefined> {
    try {
      const response = await api.get(`${route}/${id}`)
      return (await response.json()) as SingleCleanwalk
    } catch (error) {
      if (isNotFoundError(error)) return undefined
      throw error
    }
  }

  async function getCleanwalkUsers(cleanwalkId: number): Promise<CleanwalkUserSummary[]> {
    const response = await api.get(`${route}/${cleanwalkId}/users`)
    if (response.ok) {
      return (await response.json()) as CleanwalkUserSummary[]
    }
    return []
  }

  async function createCleanwalk(cleanwalk: CleanwalkCreation): Promise<boolean> {
    const response = await api.post(route, { json: cleanwalk })
    return response.ok
  }

  async function joinCleanwalk(cleanwalkId: number, nb_participants: number, user_id: number): Promise<boolean> {
    const response = await api.post(`${route}/join`, {
      json: { cleanwalk_id: cleanwalkId, user_id, nb_person: nb_participants },
    })
    return response.ok
  }

  async function leaveCleanwalk(cleanwalkId: number, user_id: number): Promise<boolean> {
    const response = await api.delete(`${route}/leave`, {
      json: { cleanwalk_id: cleanwalkId, user_id },
    })
    return response.ok
  }

  async function checkUserParticipation(
    cleanwalkId: number,
    userId: number,
  ): Promise<{ is_host?: boolean; is_participant: boolean; nb_person?: number } | null> {
    const response = await api.get(
      `${route}/check_user_participation?user_id=${userId}&cleanwalk_id=${cleanwalkId}`,
    )
    if (response.ok) {
      return (await response.json()) as { is_host?: boolean; is_participant: boolean; nb_person?: number }
    }
    return null
  }

  async function getMyCleanwalks(): Promise<Cleanwalk[]> {
    try {
      const response = await api.get(`${route}/me`)
      if (response.ok) {
        return (await response.json()) as Cleanwalk[]
      }
    } catch (error) {
      console.error('Failed to fetch my cleanwalks:', error)
    }
    return []
  }

  return {
    getAllCleanwalks,
    cleanwalksTab,
    getCleanwalkById,
    getCleanwalkUsers,
    createCleanwalk,
    joinCleanwalk,
    leaveCleanwalk,
    checkUserParticipation,
    getMyCleanwalks,
  }
})
