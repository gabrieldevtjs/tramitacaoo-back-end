/*
  Warnings:

  - Changed the type of `arquivo` on the `Documento` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Documento" DROP COLUMN "arquivo",
ADD COLUMN     "arquivo" BYTEA NOT NULL;
