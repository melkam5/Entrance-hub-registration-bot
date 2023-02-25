-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `tg_id` INTEGER NOT NULL,
    `first_name` VARCHAR(191) NULL,
    `registered_name` VARCHAR(191) NULL,
    `lang` VARCHAR(191) NULL,
    `phone_number` VARCHAR(191) NULL,
    `stream` VARCHAR(191) NULL,
    `school` VARCHAR(191) NULL,
    `class_of` VARCHAR(191) NULL,
    `registered` INTEGER NOT NULL DEFAULT -1,
    `date_registered` DATETIME(3) NULL,
    `payed` INTEGER NOT NULL,
    `points` INTEGER NOT NULL DEFAULT 0,
    `credited` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_tg_id_key`(`tg_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Refferal` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `invitorId` VARCHAR(191) NOT NULL,
    `invitedId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Refferal_invitedId_key`(`invitedId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feedback` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Refferal` ADD CONSTRAINT `Refferal_invitorId_fkey` FOREIGN KEY (`invitorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Refferal` ADD CONSTRAINT `Refferal_invitedId_fkey` FOREIGN KEY (`invitedId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
