/*
  Warnings:

  - You are about to alter the column `value_allocation` on the `tb_allocation` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "public"."tb_allocation" ALTER COLUMN "value_allocation" SET DATA TYPE INTEGER;
