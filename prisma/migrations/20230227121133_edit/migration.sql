/*
  Warnings:

  - You are about to drop the column `natural` on the `tutorialClass` table. All the data in the column will be lost.
  - You are about to drop the column `social` on the `tutorialClass` table. All the data in the column will be lost.
  - Added the required column `class_tg_id` to the `tutorialClass` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tutorialClass` DROP COLUMN `natural`,
    DROP COLUMN `social`,
    ADD COLUMN `class_tg_id` INTEGER NOT NULL,
    ADD COLUMN `stream` VARCHAR(191) NOT NULL DEFAULT 'na';
