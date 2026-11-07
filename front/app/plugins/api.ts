import ky, { HTTPError } from 'ky'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const prefixUrl = import.meta.server
    ? config.apiInternalUrl || config.public.apiUrl
    : config.public.apiUrl

  let refreshPromise: Promise<Response> | null = null

  const api = ky.create({
    prefixUrl,
    credentials: 'include', // Nécessaire pour les cookies httpOnly
    hooks: {
      afterResponse: [
        async (request, options, response) => {
          // Le serveur Nuxt ne reçoit pas les cookies de l'API : pas de session à rafraîchir.
          if (response.status !== 401 || import.meta.server) return response

          // Une seule demande de refresh à la fois
          refreshPromise ??= fetch(`${config.public.apiUrl}/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
          }).finally(() => {
            refreshPromise = null
          })

          const refreshResponse = await refreshPromise
          if (refreshResponse.ok) {
            return ky(request, options)
          }
          throw new HTTPError(refreshResponse, request, options)
        },
      ],
    },
  })

  return { provide: { api } }
})
