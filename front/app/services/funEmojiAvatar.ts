import { createAvatar } from '@dicebear/core'
import * as funEmoji from '@dicebear/fun-emoji'
import { v4 as uuidv4 } from 'uuid'

/**
 * Avatars « fun-emoji » de DiceBear : https://www.dicebear.com/styles/fun-emoji/
 * L'avatar est enregistré comme une URL de l'API DiceBear (champ `profilePicture`),
 * l'éditeur le dessine en local pour que l'aperçu change sans attendre le réseau.
 */

const API_URL = 'https://api.dicebear.com/9.x/fun-emoji/svg'

export const AVATAR_EYES = {
  plain: 'Neutres',
  cute: 'Mignons',
  love: 'Amoureux',
  stars: 'Étoiles',
  wink: "Clin d'œil",
  wink2: "Clin d'œil malicieux",
  closed: 'Fermés',
  closed2: 'Plissés',
  sleepClose: 'Endormis',
  glasses: 'Lunettes',
  shades: 'Lunettes de soleil',
  sad: 'Tristes',
  tearDrop: 'Une larme',
  crying: 'En pleurs',
  pissed: 'Énervés',
} as const

export const AVATAR_MOUTHS = {
  plain: 'Neutre',
  lilSmile: 'Petit sourire',
  wideSmile: 'Grand sourire',
  smileTeeth: 'Sourire en dents',
  smileLol: 'Mort de rire',
  cute: 'Mignonne',
  shy: 'Timide',
  tongueOut: 'Langue tirée',
  kissHeart: 'Bisou',
  shout: 'Cri',
  drip: 'Bave',
  sad: 'Triste',
  pissed: 'Énervée',
  sick: 'Malade',
  faceMask: 'Masque',
} as const

/** Couleurs du visage proposées : celles de DiceBear, puis celles du site. */
export const AVATAR_COLORS = ['fcbc34', 'f6d594', 'd9915b', '71cf62', '72bda3', '059ff2', '2348de', 'd84be5', 'f472b6', 'ef4444']

export type AvatarEyes = keyof typeof AVATAR_EYES
export type AvatarMouth = keyof typeof AVATAR_MOUTHS

export interface FunEmojiAvatar {
  eyes: AvatarEyes
  mouth: AvatarMouth
  /** Couleur hexadécimale sur 6 caractères, sans « # ». */
  color: string
}

const isEyes = (value: string | null): value is AvatarEyes => !!value && value in AVATAR_EYES
const isMouth = (value: string | null): value is AvatarMouth => !!value && value in AVATAR_MOUTHS
const isColor = (value: string | null): value is string => !!value && /^[0-9a-f]{6}$/i.test(value)

/** Résout les options : celles qui manquent sont tirées à partir du seed, comme le fait l'API. */
const resolve = (options: funEmoji.Options & { seed?: string }): FunEmojiAvatar => {
  const extra = createAvatar(funEmoji, options).toJson().extra as {
    eyes: AvatarEyes
    mouth: AvatarMouth
    primaryBackgroundColor: string
  }
  return { eyes: extra.eyes, mouth: extra.mouth, color: extra.primaryBackgroundColor.replace('#', '').toLowerCase() }
}

export const randomAvatar = () => resolve({ seed: uuidv4() })

/** Relit les options d'une URL fun-emoji, y compris les anciens avatars tirés au hasard (`?seed=`). */
export function avatarFromUrl(url?: string | null): FunEmojiAvatar {
  if (!url) return randomAvatar()
  try {
    const { hostname, pathname, searchParams: params } = new URL(url)
    if (hostname !== 'api.dicebear.com' || !pathname.includes('/fun-emoji/')) return randomAvatar()

    const eyes = params.get('eyes')
    const mouth = params.get('mouth')
    const color = params.get('backgroundColor')
    return resolve({
      seed: params.get('seed') ?? '',
      eyes: isEyes(eyes) ? [eyes] : undefined,
      mouth: isMouth(mouth) ? [mouth] : undefined,
      backgroundColor: isColor(color) ? [color] : undefined,
    })
  } catch {
    return randomAvatar()
  }
}

export function avatarToUrl({ eyes, mouth, color }: FunEmojiAvatar) {
  const params = new URLSearchParams({ eyes, mouth, backgroundColor: color })
  return `${API_URL}?${params}`
}

export function renderAvatar({ eyes, mouth, color }: FunEmojiAvatar) {
  return createAvatar(funEmoji, { eyes: [eyes], mouth: [mouth], backgroundColor: [color] }).toDataUri()
}
