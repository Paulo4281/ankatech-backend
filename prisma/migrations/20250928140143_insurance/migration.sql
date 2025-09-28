/*
  Warnings:

  - Added the required column `type_insurance` to the `tb_insurance` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."InsuranceType" AS ENUM ('life', 'disability');

-- AlterTable
ALTER TABLE "public"."tb_insurance" ADD COLUMN     "type_insurance" "public"."InsuranceType" NOT NULL;
