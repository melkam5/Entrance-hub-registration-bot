-- DropForeignKey
ALTER TABLE `Refferal` DROP FOREIGN KEY `Refferal_invitedId_fkey`;

-- DropForeignKey
ALTER TABLE `Refferal` DROP FOREIGN KEY `Refferal_invitorId_fkey`;

-- DropForeignKey
ALTER TABLE `RegisteredStudent` DROP FOREIGN KEY `RegisteredStudent_stusent_tg_Id_fkey`;

-- DropForeignKey
ALTER TABLE `waitingListStudent` DROP FOREIGN KEY `waitingListStudent_stusent_tg_Id_fkey`;

-- AlterTable
ALTER TABLE `Refferal` MODIFY `invitorId` VARCHAR(191) NOT NULL,
    MODIFY `invitedId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `RegisteredStudent` MODIFY `stusent_tg_Id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `tg_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tutorialClass` MODIFY `class_tg_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `waitingListStudent` MODIFY `stusent_tg_Id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Refferal` ADD CONSTRAINT `Refferal_invitorId_fkey` FOREIGN KEY (`invitorId`) REFERENCES `User`(`tg_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Refferal` ADD CONSTRAINT `Refferal_invitedId_fkey` FOREIGN KEY (`invitedId`) REFERENCES `User`(`tg_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegisteredStudent` ADD CONSTRAINT `RegisteredStudent_stusent_tg_Id_fkey` FOREIGN KEY (`stusent_tg_Id`) REFERENCES `User`(`tg_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `waitingListStudent` ADD CONSTRAINT `waitingListStudent_stusent_tg_Id_fkey` FOREIGN KEY (`stusent_tg_Id`) REFERENCES `User`(`tg_id`) ON DELETE CASCADE ON UPDATE CASCADE;
