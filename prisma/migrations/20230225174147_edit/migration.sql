-- CreateTable
CREATE TABLE `waitingListStudent` (
    `id` VARCHAR(191) NOT NULL,
    `stusent_tg_Id` INTEGER NOT NULL,

    UNIQUE INDEX `waitingListStudent_stusent_tg_Id_key`(`stusent_tg_Id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `waitingListStudent` ADD CONSTRAINT `waitingListStudent_stusent_tg_Id_fkey` FOREIGN KEY (`stusent_tg_Id`) REFERENCES `User`(`tg_id`) ON DELETE CASCADE ON UPDATE CASCADE;
