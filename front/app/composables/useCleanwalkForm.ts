import { differenceInMinutes, parse, set } from 'date-fns'

const STORAGE_KEY = 'cleanwalk-form-data'

const emptyCleanwalk = () => ({
  name: '',
  description: '',
  img_url: '',
  date_begin: '',
  duration: 0,
  pos_lat: 0,
  pos_long: 0,
  address: '',
  city: '',
  participant_count_public: false,
})

const emptyDate = () => ({
  dateDay: undefined as string | undefined,
  hourBegin: '',
  hourEnd: '',
})

const loadFromStorage = () => {
  if (import.meta.server) return null
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error('Error loading from sessionStorage:', error)
    return null
  }
}

export interface SelectedAddress {
  address: string
  lat: string
  lon: string
  city: string
}

export function useCleanwalkForm() {
  const router = useRouter()
  const { showToast } = useUtilsStore()
  const cleanwalkStore = useCleanwalkStore()
  const accountStore = useAccountStore()

  const dropzone = ref<{ handleUpload: () => Promise<string | undefined> } | null>(null)
  const stored = loadFromStorage()
  const newCleanwalk = ref({ ...emptyCleanwalk(), ...stored?.newCleanwalk })
  const dateCleanwalk = ref({ ...emptyDate(), ...stored?.dateCleanwalk })

  watch(
    [newCleanwalk, dateCleanwalk],
    () => {
      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ newCleanwalk: newCleanwalk.value, dateCleanwalk: dateCleanwalk.value }),
        )
      } catch (error) {
        console.error('Error saving to sessionStorage:', error)
      }
    },
    { deep: true },
  )

  const clearStorage = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Error clearing sessionStorage:', error)
    }
  }

  const handleSelectAddress = (address: SelectedAddress) => {
    newCleanwalk.value.address = address.address
    newCleanwalk.value.pos_lat = parseFloat(address.lat)
    newCleanwalk.value.pos_long = parseFloat(address.lon)
    newCleanwalk.value.city = address.city
  }

  const setDate = () => {
    const { dateDay, hourBegin, hourEnd } = dateCleanwalk.value
    if (!dateDay || !hourBegin || !hourEnd) {
      return { ok: false as const, reason: 'missing' as const }
    }

    const atHour = (hour: string) => {
      const [hours, minutes] = hour.split(':').map(Number)
      return set(parse(dateDay, 'yyyy-MM-dd', new Date()), { hours, minutes })
    }
    const startDate = atHour(hourBegin)

    if (startDate.getTime() < Date.now()) {
      showToast('La date de début ne peut pas être dans le passé', false)
      return { ok: false as const, reason: 'past' as const }
    }

    newCleanwalk.value.date_begin = startDate.toISOString()
    newCleanwalk.value.duration = differenceInMinutes(atHour(hourEnd), startDate)
    return { ok: true as const }
  }

  const publish = async () => {
    try {
      const imageUrl = await dropzone.value?.handleUpload()
      if (imageUrl) {
        newCleanwalk.value.img_url = imageUrl
      }
      if (!newCleanwalk.value.img_url) {
        newCleanwalk.value.img_url = `${window.location.origin}/default_cover.webp`
      }

      await cleanwalkStore.createCleanwalk({ ...newCleanwalk.value, user_id: accountStore.CurrentUser!.id! })
      clearStorage()
      showToast('Your cleanwalk has been successfully published', true)
      await router.push({ name: 'map' })
    } catch {
      showToast('Error while creating the event', false)
    }
  }

  const reset = () => {
    clearStorage()
    newCleanwalk.value = emptyCleanwalk()
    dateCleanwalk.value = emptyDate()
  }

  return { dropzone, newCleanwalk, dateCleanwalk, handleSelectAddress, setDate, publish, reset }
}
