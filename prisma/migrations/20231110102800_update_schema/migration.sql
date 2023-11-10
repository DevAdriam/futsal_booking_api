-- CreateEnum
CREATE TYPE "BOOKING_STATUS" AS ENUM ('ACTIVE', 'CANCELED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "INVITATION_STATUS" AS ENUM ('ACCEPTED', 'PENDING', 'REJECTED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "invitaionStatus" "INVITATION_STATUS" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOnTeam" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserOnTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "futsal_stadium" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "townShipId" TEXT NOT NULL,
    "isBookingFull" BOOLEAN NOT NULL DEFAULT false,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "futsal_stadium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking_records" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "timeDuration" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" "BOOKING_STATUS" NOT NULL DEFAULT 'ACTIVE',
    "Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "booking_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "townships" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "townships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserOnTeam_userId_key" ON "UserOnTeam"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserOnTeam_teamId_key" ON "UserOnTeam"("teamId");

-- AddForeignKey
ALTER TABLE "UserOnTeam" ADD CONSTRAINT "UserOnTeam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnTeam" ADD CONSTRAINT "UserOnTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "futsal_stadium" ADD CONSTRAINT "futsal_stadium_townShipId_fkey" FOREIGN KEY ("townShipId") REFERENCES "townships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
