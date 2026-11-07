import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import filter from "leo-profanity";

// Filtre des messages du chat : dictionnaires français et anglais de leo-profanity,
// complétés par la table ProfanityWord (mots et expressions à censurer ou à laisser passer).

// Rattrape les modifications faites hors des routes admin (Prisma Studio, SQL) ou sur une autre instance.
const RELOAD_INTERVAL_MS = 5 * 60 * 1000;

declare module "fastify" {
  interface FastifyInstance {
    profanity: {
      /** Remplace chaque mot ou expression de la liste par des « * » de la même longueur. */
      censor: (text: string) => string;
      /** Relit la table ProfanityWord. */
      reload: () => Promise<void>;
    };
  }
}

/** Forme sous laquelle les valeurs sont enregistrées : minuscules, espaces simples. */
export const normalizeProfanityValue = (value: string) => value.trim().toLowerCase().replace(/\s+/g, " ");

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// leo-profanity compare mot par mot : les expressions passent par une regex.
// Expressions entières uniquement (« bon jour » ne touche pas « bon journal »), quels que soient la casse et les espaces.
function buildPhrasesPattern(phrases: string[]) {
  if (phrases.length === 0) return null;
  const alternatives = phrases.map((phrase) => escapeRegExp(phrase).replace(/ /g, "\\s+")).join("|");
  return new RegExp(`(?<![\\p{L}\\p{N}])(?:${alternatives})(?![\\p{L}\\p{N}])`, "giu");
}

// leo-profanity garde une seule liste globale : elle est reconstruite entièrement à chaque chargement.
function resetDictionaries() {
  filter.loadDictionary("fr");
  filter.add(filter.getDictionary("en"));
}

export default fp(async (fastify: FastifyInstance) => {
  let phrasesPattern: RegExp | null = null;

  const reload = async () => {
    const words = await fastify.prisma.profanityWord.findMany({ select: { value: true, kind: true } });
    const blocked = words.filter((word) => word.kind === "BLOCK").map((word) => word.value);
    const allowed = words.filter((word) => word.kind === "ALLOW").map((word) => word.value);

    // Sans await à partir d'ici : aucun message n'est filtré avec une liste à moitié reconstruite.
    resetDictionaries();
    filter.add(blocked.filter((value) => !value.includes(" ")));
    filter.remove(allowed);
    phrasesPattern = buildPhrasesPattern(blocked.filter((value) => value.includes(" ")));
  };

  const censor = (text: string) => {
    const withoutPhrases = phrasesPattern ? text.replace(phrasesPattern, (match) => match.replace(/\S/g, "*")) : text;
    return filter.clean(withoutPhrases);
  };

  const safeReload = () =>
    reload().catch((err) => {
      fastify.log.error({ err }, "Impossible de charger la liste des mots censurés");
    });

  // Si la base ne répond pas, le chat reste filtré avec les seuls dictionnaires.
  resetDictionaries();
  await safeReload();

  const timer = setInterval(safeReload, RELOAD_INTERVAL_MS);
  timer.unref();
  fastify.addHook("onClose", async () => clearInterval(timer));

  fastify.decorate("profanity", { censor, reload });
});
