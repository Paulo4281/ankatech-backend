/*
  Warnings:

  - Added the required column `value_allocation` to the `tb_allocation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."tb_allocation" ADD COLUMN     "value_allocation" INTEGER NOT NULL;
