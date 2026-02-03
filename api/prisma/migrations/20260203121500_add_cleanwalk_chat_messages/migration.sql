-- CreateTable
CREATE TABLE "CleanwalkChatMessage" (
    "id" SERIAL NOT NULL,
    "cleanwalkId" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CleanwalkChatMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CleanwalkChatMessage" ADD CONSTRAINT "CleanwalkChatMessage_cleanwalkId_fkey" FOREIGN KEY ("cleanwalkId") REFERENCES "Cleanwalk"("id") ON DELETE CASCADE ON UPDATE CASCADE;
