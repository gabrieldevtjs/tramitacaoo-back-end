/*
  Warnings:

  - You are about to drop the column `responavel` on the `Setor` table. All the data in the column will be lost.
  - Added the required column `responsavel` to the `Setor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Setor" DROP COLUMN "responavel",
ADD COLUMN     "responsavel" VARCHAR(255) NOT NULL;
