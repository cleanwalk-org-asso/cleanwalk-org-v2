import type { InjectionKey, ShallowRef } from 'vue'
import type { Map as MapLibreMap } from 'maplibre-gl'
import type { Cleanwalk } from '@/interfaces/cleanwalkInterface'

// Carte de MapView, transmise à ses marqueurs.
export const mapInjectionKey: InjectionKey<ShallowRef<MapLibreMap | null>> = Symbol('map')

export function useCleanwalkMap() {
  const cleanwalkStore = useCleanwalkStore()
  const mapInstance = shallowRef<MapLibreMap | null>(null)
  const selectedCleanwalk = ref<Cleanwalk | null>(null)
  const searchInput = ref('')

  const filteredCleanwalks = computed(() => {
    const search = searchInput.value.toLowerCase()
    if (!search) {
      return cleanwalkStore.cleanwalksTab
    }
    return cleanwalkStore.cleanwalksTab.filter(
      (cleanwalk) => cleanwalk.name.toLowerCase().includes(search) || cleanwalk.address.toLowerCase().includes(search),
    )
  })

  const setMapEvents = (map: MapLibreMap) => {
    mapInstance.value = map
  }

  const setSelectedCleanwalk = (cleanwalkId: number) => {
    const cleanwalk = cleanwalkStore.cleanwalksTab.find((item) => item.id === cleanwalkId)
    if (cleanwalk) {
      selectedCleanwalk.value = cleanwalk
    }
  }

  const isPointVisible = (lat: number, lng: number) => mapInstance.value?.getBounds().contains([lng, lat]) ?? false

  const mapClick = () => {
    selectedCleanwalk.value = null
  }

  return {
    mapInstance,
    filteredCleanwalks,
    selectedCleanwalk,
    searchInput,
    setMapEvents,
    setSelectedCleanwalk,
    isPointVisible,
    mapClick,
  }
}
