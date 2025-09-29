/*
  Warnings:

  - Added the required column `datestart_simulation` to the `tb_simulation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."tb_simulation" ADD COLUMN     "datestart_simulation" TIMESTAMP(3) NOT NULL;
