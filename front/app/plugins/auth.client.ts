// Les cookies de session sont liés à l'API : seul le navigateur peut vérifier la session.
export default defineNuxtPlugin((nuxtApp) => {
  const accountStore = useAccountStore()
  nuxtApp.hook('app:mounted', () => {
    accountStore.checkAuth()
  })
})
