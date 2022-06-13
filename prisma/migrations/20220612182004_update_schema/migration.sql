/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Product_pricespyId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Product_url_key" ON "Product"("url");
