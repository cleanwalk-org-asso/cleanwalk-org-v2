export interface AddressSuggestion {
  place_id: number
  osm_id: number
  display_name: string
  lat: string
  lon: string
  address?: {
    house_number?: string
    road?: string
    city?: string
    town?: string
    village?: string
    municipality?: string
    postcode?: string
    public_building?: string
  }
}

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org'
const DEBOUNCE_MS = 300
const MIN_LENGTH = 3

export const getSuggestionCity = ({ address }: AddressSuggestion) =>
  address?.city || address?.town || address?.village || address?.municipality || ''

export const formatSuggestion = (suggestion: AddressSuggestion) => {
  const { address } = suggestion
  if (!address) return suggestion.display_name

  return [address.house_number, address.road, address.public_building, getSuggestionCity(suggestion), address.postcode]
    .filter(Boolean)
    .join(', ')
}

export function useAddressSearch() {
  const suggestions = ref<AddressSuggestion[]>([])
  const loading = ref(false)
  const searchedText = ref('')
  let timeout: ReturnType<typeof setTimeout> | undefined

  const fetchSuggestions = async (text: string) => {
    searchedText.value = text
    if (text.length < MIN_LENGTH) {
      suggestions.value = []
      return
    }

    loading.value = true
    try {
      const params = new URLSearchParams({
        format: 'json',
        'accept-language': 'fr',
        addressdetails: '1',
        limit: '5',
        countrycodes: 'fr,be',
        q: text,
      })
      const response = await fetch(`${NOMINATIM_URL}/search?${params}`)
      if (!response.ok) throw new Error('Network response was not ok')

      const results = (await response.json()) as AddressSuggestion[]
      suggestions.value = results.filter(
        (item, index) => results.findIndex((other) => other.display_name === item.display_name) === index,
      )
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      suggestions.value = []
    } finally {
      loading.value = false
    }
  }

  const search = (text: string) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fetchSuggestions(text), DEBOUNCE_MS)
  }

  onUnmounted(() => clearTimeout(timeout))

  return { suggestions, loading, searchedText, search }
}
