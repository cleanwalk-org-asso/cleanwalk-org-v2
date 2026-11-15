import { HTTPError } from 'ky'

export const isNotFoundError = (error: unknown) => error instanceof HTTPError && error.response.status === 404

/** `ky` lève une erreur pour toute réponse non-2xx : on récupère le message renvoyé par l'API. */
export async function getApiErrorMessage(error: unknown, fallback: string) {
  if (error instanceof HTTPError) {
    try {
      const data = (await error.response.clone().json()) as { message?: string }
      if (data.message) return data.message
    } catch {
      // Réponse sans JSON : on garde le message par défaut.
    }
  }
  return fallback
}
