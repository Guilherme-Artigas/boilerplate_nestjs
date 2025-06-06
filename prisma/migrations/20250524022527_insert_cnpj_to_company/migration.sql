/*
  Warnings:

  - Added the required column `cnpj` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "cnpj" TEXT NOT NULL;
