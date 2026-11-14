// En staging (NUXT_NO_INDEX=true), demande aux moteurs de ne rien indexer, même une
// page trouvée par un lien externe : le robots.txt seul n'empêche que l'exploration.
export default defineEventHandler((event) => {
  if (useRuntimeConfig(event).noIndex) {
    setHeader(event, 'X-Robots-Tag', 'noindex, nofollow')
  }
})
