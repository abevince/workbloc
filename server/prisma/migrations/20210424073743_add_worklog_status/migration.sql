-- CreateEnum
CREATE TYPE "WorklogStatus" AS ENUM ('PENDING', 'APPROVED', 'DISAPPROVED');

-- AlterTable
ALTER TABLE "worklogs" ADD COLUMN     "status" "WorklogStatus" NOT NULL DEFAULT E'PENDING';
