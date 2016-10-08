CREATE TABLE `app_contact_master` (
  `contact_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(500) NULL,
  `last_name` VARCHAR(500) NULL,
  `state` VARCHAR(500) NULL,
  `city` VARCHAR(500) NULL,
  `added_on` DATETIME NULL,
  `status` INT(11) NULL,
  PRIMARY KEY (`contact_id`));

CREATE TABLE `contact_mobile_master` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `master_id` INT(11) NULL,
  `mobile` VARCHAR(45) NULL,
  `status` INT(11) NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `contact_email_master` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `master_id` INT(11) NULL,
  `email` VARCHAR(45) NULL,
  `status` INT(11) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `contact_address_master` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `master_id` INT(11) NULL,
  `address` VARCHAR(500) NULL,
  `status` INT(11) NULL,
  PRIMARY KEY (`id`));