-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `tg_id` INTEGER NOT NULL,
    `first_name` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `registered_name` VARCHAR(191) NULL,
    `lang` VARCHAR(191) NULL,
    `phone_number` VARCHAR(191) NULL,
    `stream` VARCHAR(191) NULL,
    `school` VARCHAR(191) NULL,
    `credited` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_tg_id_key`(`tg_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Refferal` (
    `id` VARCHAR(191) NOT NULL,
    `invitorId` INTEGER NOT NULL,
    `invitedId` INTEGER NOT NULL,

    UNIQUE INDEX `Refferal_invitedId_key`(`invitedId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RegisteredStudent` (
    `id` VARCHAR(191) NOT NULL,
    `stusent_tg_Id` INTEGER NOT NULL,
    `registeredDate` DATETIME(3) NOT NULL,
    `classof` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RegisteredStudent_stusent_tg_Id_key`(`stusent_tg_Id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `waitingListStudent` (
    `id` VARCHAR(191) NOT NULL,
    `stusent_tg_Id` INTEGER NOT NULL,

    UNIQUE INDEX `waitingListStudent_stusent_tg_Id_key`(`stusent_tg_Id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feedback` (
    `id` VARCHAR(191) NOT NULL,
    `index` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NULL,
    `message_type` VARCHAR(191) NULL,
    `content` VARCHAR(191) NULL,

    UNIQUE INDEX `feedback_index_key`(`index`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Refferal` ADD CONSTRAINT `Refferal_invitorId_fkey` FOREIGN KEY (`invitorId`) REFERENCES `User`(`tg_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Refferal` ADD CONSTRAINT `Refferal_invitedId_fkey` FOREIGN KEY (`invitedId`) REFERENCES `User`(`tg_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegisteredStudent` ADD CONSTRAINT `RegisteredStudent_stusent_tg_Id_fkey` FOREIGN KEY (`stusent_tg_Id`) REFERENCES `User`(`tg_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `waitingListStudent` ADD CONSTRAINT `waitingListStudent_stusent_tg_Id_fkey` FOREIGN KEY (`stusent_tg_Id`) REFERENCES `User`(`tg_id`) ON DELETE CASCADE ON UPDATE CASCADE;
