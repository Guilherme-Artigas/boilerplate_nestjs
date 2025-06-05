-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "empresaId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
