/*
  Warnings:

  - The `status` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('ADMIN', 'END_USER');

-- CreateEnum
CREATE TYPE "USER_STATUS" AS ENUM ('ACTIVE', 'SUSPENDED', 'OFFLINE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "USER_ROLE" NOT NULL DEFAULT 'END_USER',
DROP COLUMN "status",
ADD COLUMN     "status" "USER_STATUS" NOT NULL DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "UserStatus";
