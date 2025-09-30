/*
  Warnings:

  - Added the required column `class_movement` to the `tb_movement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value_movement` to the `tb_movement` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."MovementClass" AS ENUM ('financial', 'fixed');

-- AlterTable
ALTER TABLE "public"."tb_movement" ADD COLUMN     "class_movement" "public"."MovementClass" NOT NULL,
ADD COLUMN     "value_movement" INTEGER NOT NULL;
