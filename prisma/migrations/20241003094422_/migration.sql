/*
  Warnings:

  - You are about to alter the column `priceInKZ` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `originalPrice` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `priceInKZ` DOUBLE NOT NULL,
    MODIFY `originalPrice` DOUBLE NOT NULL;
