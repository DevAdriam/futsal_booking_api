/*
  Warnings:

  - You are about to drop the column `name` on the `townships` table. All the data in the column will be lost.
  - Added the required column `MMName` to the `townships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `engName` to the `townships` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "townships" DROP COLUMN "name",
ADD COLUMN     "MMName" TEXT NOT NULL,
ADD COLUMN     "engName" TEXT NOT NULL;
