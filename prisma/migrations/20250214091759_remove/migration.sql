/*
  Warnings:

  - You are about to drop the column `setorCreateId` on the `Documento` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Documento" DROP CONSTRAINT "Documento_setorCreateId_fkey";

-- AlterTable
ALTER TABLE "Documento" DROP COLUMN "setorCreateId";
