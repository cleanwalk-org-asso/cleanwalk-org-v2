const MOBILE_MAX_WIDTH = 1024

export function useDevice() {
  // Pendant l'hydratation, la valeur doit rester celle du rendu serveur.
  const nuxtApp = useNuxtApp()
  const readIsMobile = () => window.innerWidth < MOBILE_MAX_WIDTH
  const isMobile = ref(import.meta.client && !nuxtApp.isHydrating ? readIsMobile() : false)

  const update = () => {
    isMobile.value = readIsMobile()
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  return { isMobile }
}
