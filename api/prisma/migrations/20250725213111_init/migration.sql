-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profilePicture" TEXT,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "userId" INTEGER NOT NULL,
    "description" TEXT,
    "webSite" TEXT,
    "socialMedias" JSONB,
    "bannerImg" TEXT,
    "lastEvent" TIMESTAMP(3),

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Cleanwalk" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "posLat" DOUBLE PRECISION NOT NULL,
    "posLong" DOUBLE PRECISION NOT NULL,
    "dateBegin" TIMESTAMP(3) NOT NULL,
    "imgUrl" TEXT,
    "duration" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "Cleanwalk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CleanwalkUser" (
    "userId" INTEGER NOT NULL,
    "cleanwalkId" INTEGER NOT NULL,
    "nbPerson" INTEGER NOT NULL,
    "isHost" BOOLEAN NOT NULL,

    CONSTRAINT "CleanwalkUser_pkey" PRIMARY KEY ("userId","cleanwalkId")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL,
    "previewPicture" TEXT,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryArticle" (
    "categoryId" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,

    CONSTRAINT "CategoryArticle_pkey" PRIMARY KEY ("categoryId","articleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cleanwalk" ADD CONSTRAINT "Cleanwalk_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CleanwalkUser" ADD CONSTRAINT "CleanwalkUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CleanwalkUser" ADD CONSTRAINT "CleanwalkUser_cleanwalkId_fkey" FOREIGN KEY ("cleanwalkId") REFERENCES "Cleanwalk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryArticle" ADD CONSTRAINT "CategoryArticle_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryArticle" ADD CONSTRAINT "CategoryArticle_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
