-- DropForeignKey
ALTER TABLE "public"."tb_allocation" DROP CONSTRAINT "tb_allocation_id_familymember_fkey";

-- AddForeignKey
ALTER TABLE "public"."tb_allocation" ADD CONSTRAINT "tb_allocation_id_familymember_fkey" FOREIGN KEY ("id_familymember") REFERENCES "public"."tb_familymember"("id_familymember") ON DELETE RESTRICT ON UPDATE CASCADE;
