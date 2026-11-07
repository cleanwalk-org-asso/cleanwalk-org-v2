import type { Cleanwalk } from '@/interfaces/cleanwalkInterface'
import { getCleanwalkRouteParams } from '@/services/cleanwalkSlug'

type ParticipationTarget = Pick<Cleanwalk, 'id' | 'name' | 'host'>

/**
 * Inscription et désinscription à une cleanwalk, partagées par la fiche et la carte.
 * La participation est propre à l'utilisateur : elle se lit donc dans le navigateur, une fois la session connue.
 */
export function useCleanwalkParticipation(cleanwalk: MaybeRefOrGetter<ParticipationTarget>, joinLabel = "S'inscrire") {
  const route = useRoute()
  const router = useRouter()
  const cleanwalkStore = useCleanwalkStore()
  const { CurrentUser } = storeToRefs(useAccountStore())
  const { showToast } = useUtilsStore()

  const userId = computed(() => CurrentUser.value?.id)
  const target = computed(() => toValue(cleanwalk))
  const isParticipant = ref(false)
  const showJoinPopup = ref(false)
  const showLeavePopup = ref(false)

  const isHost = computed(() => !!userId.value && target.value.host?.id === userId.value)

  const actionLabel = computed(() => {
    if (isHost.value) return 'Éditer la cleanwalk'
    return isParticipant.value ? 'Se désinscrire' : joinLabel
  })

  const goToLogin = () => router.push({ name: 'login', query: { redirect: route.fullPath } })

  const refreshParticipation = async () => {
    const cleanwalkId = target.value.id
    if (!cleanwalkId || !userId.value) {
      isParticipant.value = false
      return
    }
    try {
      const participation = await cleanwalkStore.checkUserParticipation(cleanwalkId, userId.value)
      isParticipant.value = !!participation?.is_participant
    } catch (error) {
      console.error('Failed to check participation:', error)
    }
  }

  watch([() => target.value.id, userId], refreshParticipation, { immediate: import.meta.client })

  const runAction = () => {
    if (!userId.value) {
      goToLogin()
    } else if (isHost.value) {
      router.push({ name: 'editCleanwalk', params: getCleanwalkRouteParams(target.value) })
    } else if (isParticipant.value) {
      showLeavePopup.value = true
    } else {
      showJoinPopup.value = true
    }
  }

  const join = async (participantCount: number) => {
    if (!target.value.id || !userId.value) {
      goToLogin()
      return
    }
    try {
      await cleanwalkStore.joinCleanwalk(target.value.id, participantCount, userId.value)
      isParticipant.value = true
      showToast('Inscription réussie', true)
    } catch {
      showToast("Erreur lors de l'inscription", false)
    }
    showJoinPopup.value = false
  }

  const leave = async () => {
    if (!target.value.id || !userId.value) {
      goToLogin()
      return
    }
    try {
      await cleanwalkStore.leaveCleanwalk(target.value.id, userId.value)
      isParticipant.value = false
      showToast('Désinscription réussie', true)
    } catch {
      showToast('Erreur lors de la désinscription', false)
    }
    showLeavePopup.value = false
  }

  return { isHost, isParticipant, actionLabel, showJoinPopup, showLeavePopup, runAction, join, leave }
}
