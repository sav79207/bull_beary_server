CREATE DATABASE IF NOT EXISTS `dev-database`;

USE `dev-database`;
-- DROP TABLE `users`;

CREATE TABLE IF NOT EXISTS `users` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tg_user_id` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255),
    `language_code` VARCHAR(10),
    `refId` INT UNSIGNED,
    `tg_file_id` VARCHAR(255),
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`refId`) REFERENCES `users`(`id`)
);