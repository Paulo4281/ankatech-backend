/*
  Warnings:

  - Added the required column `type_simulation` to the `tb_simulation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."SimulationType" AS ENUM ('original', 'custom');

-- AlterTable
ALTER TABLE "public"."tb_simulation" ADD COLUMN     "type_simulation" "public"."SimulationType" NOT NULL;
