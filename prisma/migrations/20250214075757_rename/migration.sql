/*
  Warnings:

  - You are about to drop the column `path` on the `Documento` table. All the data in the column will be lost.
  - Added the required column `arquivo` to the `Documento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Documento" DROP COLUMN "path",
ADD COLUMN     "arquivo" BYTEA NOT NULL;
