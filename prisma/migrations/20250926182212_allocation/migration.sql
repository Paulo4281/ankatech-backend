/*
  Warnings:

  - You are about to drop the `tb_allocationregister` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."tb_allocationregister" DROP CONSTRAINT "tb_allocationregister_id_allocation_fkey";

-- DropTable
DROP TABLE "public"."tb_allocationregister";

-- CreateTable
CREATE TABLE "public"."tb_allocationregistry" (
    "id_allocationregistry" TEXT NOT NULL,
    "date_allocationregistry" TIMESTAMP(3) NOT NULL,
    "value_allocationregistry" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "id_allocation" TEXT NOT NULL,

    CONSTRAINT "tb_allocationregistry_pkey" PRIMARY KEY ("id_allocationregistry")
);

-- AddForeignKey
ALTER TABLE "public"."tb_allocationregistry" ADD CONSTRAINT "tb_allocationregistry_id_allocation_fkey" FOREIGN KEY ("id_allocation") REFERENCES "public"."tb_allocation"("id_allocation") ON DELETE RESTRICT ON UPDATE CASCADE;
