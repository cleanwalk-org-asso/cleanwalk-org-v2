-- CreateEnum
CREATE TYPE "ProfanityWordKind" AS ENUM ('BLOCK', 'ALLOW');

-- CreateTable
CREATE TABLE "ProfanityWord" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "kind" "ProfanityWordKind" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProfanityWord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfanityWord_value_key" ON "ProfanityWord"("value");
