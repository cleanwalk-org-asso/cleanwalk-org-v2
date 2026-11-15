-- AlterTable
ALTER TABLE "CleanwalkChatMessage" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "CleanwalkChatMessage" ADD CONSTRAINT "CleanwalkChatMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Retrouve l'auteur des anciens messages : le participant de la cleanwalk qui porte ce nom,
-- seulement s'il est le seul à le porter (sinon le message reste sans auteur).
UPDATE "CleanwalkChatMessage" AS m
SET "userId" = u."id"
FROM "CleanwalkUser" AS cu
JOIN "User" AS u ON u."id" = cu."userId"
WHERE cu."cleanwalkId" = m."cleanwalkId"
  AND u."name" = m."user"
  AND (
    SELECT COUNT(*)
    FROM "CleanwalkUser" AS cu2
    JOIN "User" AS u2 ON u2."id" = cu2."userId"
    WHERE cu2."cleanwalkId" = m."cleanwalkId" AND u2."name" = m."user"
  ) = 1;
