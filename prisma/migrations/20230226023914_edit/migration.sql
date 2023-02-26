/*
  Warnings:

  - You are about to drop the column `isPayed` on the `Refferal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[index]` on the table `feedback` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `index` to the `feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Refferal` DROP COLUMN `isPayed`;

-- AlterTable
ALTER TABLE `feedback` ADD COLUMN `content` VARCHAR(191) NULL,
    ADD COLUMN `first_name` VARCHAR(191) NULL,
    ADD COLUMN `index` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `message_type` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `feedback_index_key` ON `feedback`(`index`);
