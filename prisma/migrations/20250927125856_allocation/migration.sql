/*
  Warnings:

  - Added the required column `dateend_allocation` to the `tb_allocation` table without a default value. This is not possible if the table is not empty.
  - Made the column `datestart_allocation` on table `tb_allocation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."tb_allocation" ADD COLUMN     "dateend_allocation" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "datestart_allocation" SET NOT NULL;
