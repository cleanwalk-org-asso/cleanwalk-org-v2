import ky, { HTTPError } from 'ky'

let isRefreshing = false
let refreshPromise: Promise<Response> | null = null

const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  credentials: 'include', // Nécessaire pour httpOnly cookies
  hooks: {
    beforeRequest: [
      request => {
        // Exemple: tu pourrais ajouter des headers ici si besoin
      }
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status !== 401) return response

        // Éviter les multiples refresh simultanés
        if (!isRefreshing) {
          isRefreshing = true
          refreshPromise = fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
          }).finally(() => {
            isRefreshing = false
          })
        }

        const refreshResponse = await refreshPromise

        if (refreshResponse && refreshResponse.ok) {
          // Rejoue la requête d'origine
          return ky(request, options)
        }

        // Échec du refresh
        if (refreshResponse) {
          throw new HTTPError(refreshResponse, request, options)
        } else {
          // Crée une réponse vide pour satisfaire le type
          throw new HTTPError(new Response(null, { status: 500, statusText: 'Refresh failed' }), request, options)
        }
      }
    ],
  }
})

export default api
