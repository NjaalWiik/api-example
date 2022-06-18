/*
  Warnings:

  - Added the required column `amountType` to the `offers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_rootDomain_fkey";

-- AlterTable
ALTER TABLE "offers" ADD COLUMN     "amountType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "shops" ADD COLUMN     "favicon" TEXT;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_rootDomain_fkey" FOREIGN KEY ("rootDomain") REFERENCES "shops"("rootDomain") ON DELETE CASCADE ON UPDATE CASCADE;
