/*
  Warnings:

  - A unique constraint covering the columns `[manager_id]` on the table `companies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "companies_manager_id_key" ON "companies"("manager_id");
