CREATE DATABASE `api_exemple` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `api_exemple`;

CREATE TABLE `user`(
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `firstname` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `password` VARCHAR(250) NOT NULL,
    `date_of_birthday` DATETIME NOT NULL,
    `id_address` INT NOT NULL,
    `date_created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
)Engine = InnoDB;

CREATE TABLE `address`(
      `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
      `number` INT NULL,
      `street` VARCHAR(250) NULL,
      `additional_address` VARCHAR(250) NULL,
      `zipcode` VARCHAR(50) NULL,
      `city` VARCHAR(100) NOT NULL,
      `country` VARCHAR(100) NOT NULL
)Engine = InnoDB;

/* on peut supprimer l'adresse mais pas la mettre à jour */
ALTER TABLE `user` ADD CONSTRAINT `fk_user_address` FOREIGN KEY (`id_address`) REFERENCES `address`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
