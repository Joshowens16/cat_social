/*
  Warnings:

  - Added the required column `followerUsername` to the `Followers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followeeUsername` to the `Following` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followersNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Followers" ADD COLUMN     "followerUsername" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Following" ADD COLUMN     "followeeUsername" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "followersNumber" INTEGER NOT NULL,
ADD COLUMN     "followingNumber" INTEGER NOT NULL;
