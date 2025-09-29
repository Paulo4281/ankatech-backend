/*
  Warnings:

  - You are about to drop the column `type_simulation` on the `tb_simulation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."tb_simulation" DROP COLUMN "type_simulation";

-- DropEnum
DROP TYPE "public"."SimulationType";
