/*
  Warnings:

  - You are about to drop the column `situacaoId` on the `Tramite` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Tramite` table. All the data in the column will be lost.
  - Added the required column `statusId` to the `Tramite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tramite" DROP CONSTRAINT "Tramite_situacaoId_fkey";

-- AlterTable
ALTER TABLE "Tramite" DROP COLUMN "situacaoId",
DROP COLUMN "status",
ADD COLUMN     "statusId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Tramite" ADD CONSTRAINT "Tramite_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Situacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
