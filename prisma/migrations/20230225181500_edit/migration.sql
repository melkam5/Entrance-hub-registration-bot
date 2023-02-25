/*
  Warnings:

  - You are about to drop the column `name` on the `Refferal` table. All the data in the column will be lost.
  - You are about to alter the column `invitorId` on the `Refferal` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `invitedId` on the `Refferal` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `Refferal` DROP FOREIGN KEY `Refferal_invitedId_fkey`;

-- DropForeignKey
ALTER TABLE `Refferal` DROP FOREIGN KEY `Refferal_invitorId_fkey`;

-- AlterTable
ALTER TABLE `Refferal` DROP COLUMN `name`,
    MODIFY `invitorId` INTEGER NOT NULL,
    MODIFY `invitedId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Refferal` ADD CONSTRAINT `Refferal_invitorId_fkey` FOREIGN KEY (`invitorId`) REFERENCES `User`(`tg_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Refferal` ADD CONSTRAINT `Refferal_invitedId_fkey` FOREIGN KEY (`invitedId`) REFERENCES `User`(`tg_id`) ON DELETE CASCADE ON UPDATE CASCADE;
