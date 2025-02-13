-- CreateTable
CREATE TABLE "Setor" (
    "id" SERIAL NOT NULL,
    "sigla" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Setor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tramite" (
    "id" SERIAL NOT NULL,
    "documentoId" INTEGER NOT NULL,
    "setorEnvioId" INTEGER NOT NULL,
    "dataEnvio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "setorRecebimentoId" INTEGER NOT NULL,
    "dataHoraRecebimento" TIMESTAMP(3),

    CONSTRAINT "Tramite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" SERIAL NOT NULL,
    "nmrDocumento" INTEGER NOT NULL,
    "setorCreateId" INTEGER NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "path" TEXT NOT NULL,
    "tipoDocumentoId" INTEGER NOT NULL,

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoDocumento" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "TipoDocumento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Setor_sigla_key" ON "Setor"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "Documento_nmrDocumento_key" ON "Documento"("nmrDocumento");

-- AddForeignKey
ALTER TABLE "Tramite" ADD CONSTRAINT "Tramite_setorEnvioId_fkey" FOREIGN KEY ("setorEnvioId") REFERENCES "Setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tramite" ADD CONSTRAINT "Tramite_setorRecebimentoId_fkey" FOREIGN KEY ("setorRecebimentoId") REFERENCES "Setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tramite" ADD CONSTRAINT "Tramite_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "Documento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_setorCreateId_fkey" FOREIGN KEY ("setorCreateId") REFERENCES "Setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_tipoDocumentoId_fkey" FOREIGN KEY ("tipoDocumentoId") REFERENCES "TipoDocumento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
