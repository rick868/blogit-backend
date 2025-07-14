/*
  Warnings:

  - You are about to drop the column `dateCreated` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdated` on the `posts` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "dateCreated",
DROP COLUMN "lastUpdated",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
