/*
  Warnings:

  - Changed the type of `amount` on the `offers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "offers" DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER NOT NULL;
