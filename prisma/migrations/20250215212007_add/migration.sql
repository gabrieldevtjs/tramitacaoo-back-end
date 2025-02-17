/*
  Warnings:

  - Added the required column `status` to the `Tramite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tramite" ADD COLUMN     "status" TEXT NOT NULL;
