// Généré au lancement plutôt que figé dans public/ : la même image sert le staging
// (NUXT_NO_INDEX=true, indexation bloquée) et la prod.
export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')

  if (useRuntimeConfig(event).noIndex) {
    return 'User-agent: *\nDisallow: /\n'
  }

  return 'User-agent: *\nAllow: /\n\nSitemap: https://cleanwalk.org/sitemap.xml\n'
})
