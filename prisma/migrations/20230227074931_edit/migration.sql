/*
  Warnings:

  - Made the column `lang` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `lang` VARCHAR(191) NOT NULL DEFAULT '';
