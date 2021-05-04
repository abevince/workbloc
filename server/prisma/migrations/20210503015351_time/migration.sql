/*
  Warnings:

  - Changed the type of `time_from` on the `worklog_items` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `time_to` on the `worklog_items` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "worklog_items" DROP COLUMN "time_from",
ADD COLUMN     "time_from" TIME(4) NOT NULL,
DROP COLUMN "time_to",
ADD COLUMN     "time_to" TIME(4) NOT NULL;
