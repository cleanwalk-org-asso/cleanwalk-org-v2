/**
 * Ajoute des données structurées au HTML. `<` est échappé car ces données contiennent
 * des textes saisis par les utilisateurs, placés ensuite dans une balise `<script>`.
 */
export function useJsonLd(data: MaybeRefOrGetter<Record<string, unknown>>) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: () => JSON.stringify(toValue(data)).replace(/</g, '\\u003c'),
      },
    ],
  })
}
