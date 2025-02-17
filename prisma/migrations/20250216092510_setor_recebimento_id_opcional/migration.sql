-- DropForeignKey
ALTER TABLE "Tramite" DROP CONSTRAINT "Tramite_setorRecebimentoId_fkey";

-- AlterTable
ALTER TABLE "Tramite" ALTER COLUMN "setorRecebimentoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Tramite" ADD CONSTRAINT "Tramite_setorRecebimentoId_fkey" FOREIGN KEY ("setorRecebimentoId") REFERENCES "Setor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
