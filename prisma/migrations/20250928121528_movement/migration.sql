/*
  Warnings:

  - Added the required column `title_movement` to the `tb_movement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."tb_movement" ADD COLUMN     "title_movement" TEXT NOT NULL;
