/*
  Warnings:

  - Added the required column `situacaoId` to the `Tramite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tramite" ADD COLUMN     "situacaoId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Situacao" (
    "id" SERIAL NOT NULL,
    "situacao" TEXT NOT NULL,

    CONSTRAINT "Situacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tramite" ADD CONSTRAINT "Tramite_situacaoId_fkey" FOREIGN KEY ("situacaoId") REFERENCES "Situacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
