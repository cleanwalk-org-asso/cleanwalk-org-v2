interface PageSeo {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  ogImage?: MaybeRefOrGetter<string | undefined>
}

const DEFAULT_OG_IMAGE = '/default-banner.svg'

export function usePageSeo({ title, description, ogImage }: PageSeo) {
  const origin = useSiteOrigin()

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: () => {
      const image = toValue(ogImage) || DEFAULT_OG_IMAGE
      return image.startsWith('http') ? image : `${origin}${image}`
    },
  })
}
