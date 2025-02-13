/*
  Warnings:

  - Added the required column `responavel` to the `Setor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Setor" ADD COLUMN     "responavel" VARCHAR(255) NOT NULL;
