/*
  Warnings:

  - Added the required column `stadiumId` to the `booking_records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking_records" ADD COLUMN     "stadiumId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "booking_records" ADD CONSTRAINT "booking_records_stadiumId_fkey" FOREIGN KEY ("stadiumId") REFERENCES "futsal_stadium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
