/*
  Warnings:

  - You are about to drop the column `delivery_time` on the `works` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `works` table. All the data in the column will be lost.
  - You are about to drop the `freelancers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recruters` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ends_at` to the `works` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recruiter_id` to the `works` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('RECRUITER', 'FREELANCER');

-- DropForeignKey
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_freelancer_id_fkey";

-- DropForeignKey
ALTER TABLE "works" DROP CONSTRAINT "works_freelancer_id_fkey";

-- DropForeignKey
ALTER TABLE "works" DROP CONSTRAINT "works_owner_id_fkey";

-- AlterTable
ALTER TABLE "works" DROP COLUMN "delivery_time",
DROP COLUMN "owner_id",
ADD COLUMN     "ends_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "recruiter_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "freelancers";

-- DropTable
DROP TABLE "recruters";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image_url" TEXT,
    "password" TEXT,
    "role" "UserRole" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "works" ADD CONSTRAINT "works_recruiter_id_fkey" FOREIGN KEY ("recruiter_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "works" ADD CONSTRAINT "works_freelancer_id_fkey" FOREIGN KEY ("freelancer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_freelancer_id_fkey" FOREIGN KEY ("freelancer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
