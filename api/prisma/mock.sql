-- Données de test pour une base de développement VIDE.
--
-- Pour lancer (applique les migrations puis importe ce fichier) :
--   npm run db:mock
-- (ou : npx prisma migrate deploy && psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f prisma/mock.sql)
--
-- Ne pas utiliser en production : ce fichier crée un compte administrateur
-- dont le mot de passe est partagé avec tous les comptes de test.
--
-- Mot de passe : le hash fourni commençait par $2y$, un préfixe que le module
-- bcrypt de l'API refuse. Il est donc enregistré en $2b$, le reste est identique.

BEGIN;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM "User") THEN
    RAISE EXCEPTION 'mock.sql : la table "User" contient déjà des données, import annulé.';
  END IF;
END $$;

INSERT INTO "User" ("id", "name", "email", "password", "role") VALUES
  (1, 'Admin Cleanwalk',        'admin@cleanwalk.org',            '$2b$10$IxqZF/tZL8GXjgz8jeL0Oun51YyzXNQnVD153gM9eXaxNsGDFwvEe', 'ADMIN'),
  (2, 'Les Mains Vertes',       'mains-vertes@example.org',       '$2b$10$IxqZF/tZL8GXjgz8jeL0Oun51YyzXNQnVD153gM9eXaxNsGDFwvEe', 'ASSOCIATION'),
  (3, 'Rivages Propres',        'rivages-propres@example.org',    '$2b$10$IxqZF/tZL8GXjgz8jeL0Oun51YyzXNQnVD153gM9eXaxNsGDFwvEe', 'ASSOCIATION'),
  (4, 'Camille Test',           'camille@example.org',            '$2b$10$IxqZF/tZL8GXjgz8jeL0Oun51YyzXNQnVD153gM9eXaxNsGDFwvEe', 'USER'),
  (5, 'Sacha Test',             'sacha@example.org',              '$2b$10$IxqZF/tZL8GXjgz8jeL0Oun51YyzXNQnVD153gM9eXaxNsGDFwvEe', 'USER'),
  (6, 'Alex Test',              'alex@example.org',               '$2b$10$IxqZF/tZL8GXjgz8jeL0Oun51YyzXNQnVD153gM9eXaxNsGDFwvEe', 'USER');

INSERT INTO "Organization" ("userId", "description", "webSite", "socialMedias", "lastEvent") VALUES
  (2, 'Association fictive de nettoyage des parcs et des quais.',  'https://example.org/mains-vertes',    '"https://example.org/mains-vertes/social"',    NOW() - INTERVAL '20 days'),
  (3, 'Association fictive de protection du littoral.',            'https://example.org/rivages-propres', '"https://example.org/rivages-propres/social"', NULL);

INSERT INTO "City" ("id", "name") VALUES
  (1, 'Paris'),
  (2, 'Lyon'),
  (3, 'Marseille'),
  (4, 'Bordeaux'),
  (5, 'Nantes');

-- Les dates dépendent de NOW() pour que les événements à venir le restent.
INSERT INTO "Cleanwalk" ("id", "name", "posLat", "posLong", "dateBegin", "duration", "description", "address", "participantCountPublic", "cityId") VALUES
  (1, 'Nettoyage des quais de Seine',     48.8566,  2.3522, NOW() + INTERVAL '7 days',  120, 'Ramassage des déchets le long des quais. Gants et sacs fournis.',    'Quai de la Tournelle, Paris',  TRUE,  1),
  (2, 'Berges du Rhône propres',          45.7578,  4.8320, NOW() + INTERVAL '14 days',  90, 'Une matinée pour nettoyer les berges du Rhône.',                     'Berges du Rhône, Lyon',        FALSE, 2),
  (3, 'Calanques sans déchets',           43.2120,  5.4500, NOW() + INTERVAL '21 days', 180, 'Ramassage sur les sentiers. Prévoir de bonnes chaussures.',           'Les Goudes, Marseille',        TRUE,  3),
  (4, 'Miroir d''eau et quais',           44.8416, -0.5698, NOW() + INTERVAL '30 days',  60, 'Petite sortie accessible aux familles.',                             'Place de la Bourse, Bordeaux', FALSE, 4),
  (5, 'Île de Nantes (édition passée)',   47.2065, -1.5640, NOW() - INTERVAL '20 days', 120, 'Événement terminé, utile pour tester l''affichage des anciennes dates.', 'Île de Nantes, Nantes',    TRUE,  5);

INSERT INTO "CleanwalkUser" ("userId", "cleanwalkId", "nbPerson", "isHost") VALUES
  (2, 1, 1, TRUE),
  (2, 2, 1, TRUE),
  (3, 3, 1, TRUE),
  (3, 4, 1, TRUE),
  (2, 5, 1, TRUE),
  (4, 1, 2, FALSE),
  (5, 1, 1, FALSE),
  (6, 2, 3, FALSE),
  (4, 3, 1, FALSE),
  (5, 5, 1, FALSE);

INSERT INTO "CleanwalkChatMessage" ("id", "cleanwalkId", "userId", "user", "text") VALUES
  (1, 1, 2, 'Les Mains Vertes', 'Bienvenue ! Rendez-vous à 10 h devant le pont.'),
  (2, 1, 4, 'Camille Test',     'Merci, nous serons deux.'),
  (3, 3, 3, 'Rivages Propres',  'Pensez à apporter de l''eau et une casquette.');

INSERT INTO "Category" ("id", "category") VALUES
  (1, 'Conseils'),
  (2, 'Environnement'),
  (3, 'Vie associative');

INSERT INTO "Article" ("id", "title", "authorId", "content", "description", "published") VALUES
  (1, 'Organiser sa première cleanwalk',  1, '"Choisissez un lieu, prévenez la mairie, puis préparez les gants et les sacs."', 'Les étapes pour bien démarrer.',        TRUE),
  (2, 'Que deviennent les déchets ?',     1, '"Le tri après la collecte permet de recycler une partie de ce qui est ramassé."', 'Le tri après une collecte.',            TRUE),
  (3, 'Brouillon : bilan de l''année',    1, '"Article non publié, utile pour tester les brouillons."',                         'Article non publié pour les tests.',    FALSE);

INSERT INTO "CategoryArticle" ("categoryId", "articleId") VALUES
  (1, 1),
  (2, 2),
  (3, 2),
  (3, 3);

-- Les identifiants ci-dessus sont explicites : on recale les séquences
-- pour que les prochaines insertions ne provoquent pas de conflit.
SELECT setval(pg_get_serial_sequence('"User"', 'id'),                 (SELECT MAX("id") FROM "User"));
SELECT setval(pg_get_serial_sequence('"City"', 'id'),                 (SELECT MAX("id") FROM "City"));
SELECT setval(pg_get_serial_sequence('"Cleanwalk"', 'id'),            (SELECT MAX("id") FROM "Cleanwalk"));
SELECT setval(pg_get_serial_sequence('"CleanwalkChatMessage"', 'id'), (SELECT MAX("id") FROM "CleanwalkChatMessage"));
SELECT setval(pg_get_serial_sequence('"Category"', 'id'),             (SELECT MAX("id") FROM "Category"));
SELECT setval(pg_get_serial_sequence('"Article"', 'id'),              (SELECT MAX("id") FROM "Article"));

COMMIT;
