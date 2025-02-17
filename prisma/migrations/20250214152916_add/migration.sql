/*
  Warnings:

  - Added the required column `setorId` to the `Documento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Documento" ADD COLUMN     "setorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "Setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
