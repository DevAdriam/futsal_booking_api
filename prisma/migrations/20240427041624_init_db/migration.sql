-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('ADMIN', 'END_USER');

-- CreateEnum
CREATE TYPE "USER_STATUS" AS ENUM ('ACTIVE', 'SUSPENDED', 'OFFLINE');

-- CreateEnum
CREATE TYPE "BOOKING_STATUS" AS ENUM ('ACTIVE', 'CANCELED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "INVITATION_STATUS" AS ENUM ('ACCEPTED', 'PENDING', 'REJECTED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "otp" INTEGER,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT,
    "role" "USER_ROLE" NOT NULL DEFAULT 'END_USER',
    "status" "USER_STATUS" NOT NULL DEFAULT 'ACTIVE',
    "invitaionStatus" "INVITATION_STATUS" NOT NULL DEFAULT 'PENDING',
    "refresh_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_on_Team" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_on_Team_pkey" PRIMARY KEY ("id")
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
    "stadiumId" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "timeDuration" INTEGER NOT NULL,
    "charges" INTEGER NOT NULL,
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
    "engName" TEXT NOT NULL,
    "MMName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "townships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_on_Team_userId_key" ON "user_on_Team"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_on_Team_teamId_key" ON "user_on_Team"("teamId");

-- AddForeignKey
ALTER TABLE "user_on_Team" ADD CONSTRAINT "user_on_Team_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_on_Team" ADD CONSTRAINT "user_on_Team_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "futsal_stadium" ADD CONSTRAINT "futsal_stadium_townShipId_fkey" FOREIGN KEY ("townShipId") REFERENCES "townships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_records" ADD CONSTRAINT "booking_records_stadiumId_fkey" FOREIGN KEY ("stadiumId") REFERENCES "futsal_stadium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
