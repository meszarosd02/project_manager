-- AlterTable
ALTER TABLE `task` ADD COLUMN `priority` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL DEFAULT 'LOW';
