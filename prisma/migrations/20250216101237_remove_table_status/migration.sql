/*
  Warnings:

  - You are about to drop the column `statusId` on the `Tramite` table. All the data in the column will be lost.
  - You are about to drop the `Situacao` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `Tramite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tramite" DROP CONSTRAINT "Tramite_statusId_fkey";

-- AlterTable
ALTER TABLE "Tramite" DROP COLUMN "statusId",
ADD COLUMN     "status" TEXT NOT NULL;

-- DropTable
DROP TABLE "Situacao";
