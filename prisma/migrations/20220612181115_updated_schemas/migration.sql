/*
  Warnings:

  - You are about to drop the `Offer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Shop` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[pricespyId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
DROP TABLE "Offer";

-- DropTable
DROP TABLE "Shop";

-- CreateTable
CREATE TABLE "shops" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pricespyId" INTEGER,
    "name" TEXT NOT NULL,
    "companyName" TEXT,
    "rootDomain" TEXT NOT NULL,
    "logo176" TEXT,
    "logo88" TEXT,
    "externalUri" TEXT,
    "information" TEXT,
    "countryCode" TEXT,
    "market" TEXT,
    "currency" TEXT,
    "storeLocationCount" INTEGER,

    CONSTRAINT "shops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offers" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rootDomain" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "coupon" TEXT,
    "name" TEXT,
    "page" TEXT,
    "terms" TEXT,
    "trackinUrl" TEXT,
    "validTo" TIMESTAMP(3),
    "validFrom" TIMESTAMP(3),
    "amount" TEXT NOT NULL,
    "verifiedCoupon" BOOLEAN,
    "status" TEXT,
    "feedbackPositive" INTEGER,
    "feedbackNegative" INTEGER,
    "clicked" INTEGER,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shops_pricespyId_key" ON "shops"("pricespyId");

-- CreateIndex
CREATE UNIQUE INDEX "shops_rootDomain_key" ON "shops"("rootDomain");

-- CreateIndex
CREATE UNIQUE INDEX "Product_pricespyId_key" ON "Product"("pricespyId");

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_rootDomain_fkey" FOREIGN KEY ("rootDomain") REFERENCES "shops"("rootDomain") ON DELETE RESTRICT ON UPDATE CASCADE;
