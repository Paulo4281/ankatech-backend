/*
  Warnings:

  - Added the required column `id_familymember` to the `tb_allocation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."tb_allocation" ADD COLUMN     "id_familymember" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."tb_allocation" ADD CONSTRAINT "tb_allocation_id_familymember_fkey" FOREIGN KEY ("id_familymember") REFERENCES "public"."tb_family"("id_family") ON DELETE RESTRICT ON UPDATE CASCADE;
