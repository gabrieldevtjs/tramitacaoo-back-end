/*
  Warnings:

  - You are about to alter the column `sigla` on the `Setor` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `descricao` on the `Setor` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `tipo` on the `TipoDocumento` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `status` on the `Tramite` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nmrDocumento]` on the table `Documento` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `statusId` to the `Tramite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Setor" ALTER COLUMN "sigla" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "descricao" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "TipoDocumento" ALTER COLUMN "tipo" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Tramite" DROP COLUMN "status",
ADD COLUMN     "statusId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "situacao" VARCHAR(255) NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Documento_nmrDocumento_key" ON "Documento"("nmrDocumento");

-- AddForeignKey
ALTER TABLE "Tramite" ADD CONSTRAINT "Tramite_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
