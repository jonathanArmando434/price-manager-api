/*
  Warnings:

  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.
  - Added the required column `OriginalPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceInKZ` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `price`,
    ADD COLUMN `OriginalPrice` INTEGER NOT NULL,
    ADD COLUMN `priceInKZ` INTEGER NOT NULL;
