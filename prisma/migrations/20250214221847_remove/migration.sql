/*
  Warnings:

  - You are about to drop the column `setorId` on the `Documento` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Documento" DROP CONSTRAINT "Documento_setorId_fkey";

-- AlterTable
ALTER TABLE "Documento" DROP COLUMN "setorId";
