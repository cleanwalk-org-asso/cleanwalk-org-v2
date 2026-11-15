export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const isAuthenticated = await useAccountStore().checkAuth()
  if (!isAuthenticated) {
    return navigateTo({ name: 'login', query: { redirect: to.fullPath } })
  }
})
