import type { FolderType } from '@/interfaces/FolderUploadinterfaces'
import { getApiErrorMessage } from '@/services/apiError'

export function useImageUpload() {
  const { $api: api } = useNuxtApp()
  const { showToast } = useUtilsStore()

  /** Renvoie l'URL de l'image, ou `undefined` après avoir affiché l'erreur. */
  const uploadImage = async (file: File, folder: FolderType) => {
    // L'API ne lit que les champs placés avant le fichier.
    const formData = new FormData()
    formData.append('folder', folder)
    formData.append('file', file)

    try {
      const response = await api.post('upload/image', { body: formData })
      const data = (await response.json()) as { url: string }
      return data.url
    } catch (error) {
      showToast(await getApiErrorMessage(error, "Erreur lors de l'upload de l'image"), false)
      return undefined
    }
  }

  return { uploadImage }
}
