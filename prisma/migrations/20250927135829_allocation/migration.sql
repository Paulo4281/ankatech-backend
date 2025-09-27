/*
  Warnings:

  - You are about to drop the `tb_heritage` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "public"."tb_allocationregistry" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "public"."tb_heritage";
