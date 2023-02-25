/*
  Warnings:

  - You are about to drop the column `class_of` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `date_registered` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `registered` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `class_of`,
    DROP COLUMN `date_registered`,
    DROP COLUMN `registered`,
    ADD COLUMN `username` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `RegisteredStudent` (
    `id` VARCHAR(191) NOT NULL,
    `stusent_tg_Id` INTEGER NOT NULL,
    `registeredDate` DATETIME(3) NOT NULL,
    `classof` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RegisteredStudent_stusent_tg_Id_key`(`stusent_tg_Id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RegisteredStudent` ADD CONSTRAINT `RegisteredStudent_stusent_tg_Id_fkey` FOREIGN KEY (`stusent_tg_Id`) REFERENCES `User`(`tg_id`) ON DELETE CASCADE ON UPDATE CASCADE;
