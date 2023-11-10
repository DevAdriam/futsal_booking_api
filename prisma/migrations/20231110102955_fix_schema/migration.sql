/*
  Warnings:

  - You are about to drop the `UserOnTeam` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `charges` to the `booking_records` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserOnTeam" DROP CONSTRAINT "UserOnTeam_teamId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnTeam" DROP CONSTRAINT "UserOnTeam_userId_fkey";

-- AlterTable
ALTER TABLE "booking_records" ADD COLUMN     "charges" INTEGER NOT NULL;

-- DropTable
DROP TABLE "UserOnTeam";

-- CreateTable
CREATE TABLE "user_on_Team" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_on_Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_on_Team_userId_key" ON "user_on_Team"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_on_Team_teamId_key" ON "user_on_Team"("teamId");

-- AddForeignKey
ALTER TABLE "user_on_Team" ADD CONSTRAINT "user_on_Team_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_on_Team" ADD CONSTRAINT "user_on_Team_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
