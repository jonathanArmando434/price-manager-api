/*
  Warnings:

  - You are about to drop the column `OriginalPrice` on the `product` table. All the data in the column will be lost.
  - Added the required column `originalPrice` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `OriginalPrice`,
    ADD COLUMN `originalPrice` INTEGER NOT NULL;
