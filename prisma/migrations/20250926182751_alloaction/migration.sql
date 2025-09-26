/*
  Warnings:

  - You are about to drop the `AllocationType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."tb_allocationtypemap" DROP CONSTRAINT "tb_allocationtypemap_id_allocationtype_fkey";

-- DropTable
DROP TABLE "public"."AllocationType";

-- CreateTable
CREATE TABLE "public"."tb_allocationtype" (
    "id_allocationtype" TEXT NOT NULL,
    "name_allocationtype" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_allocationtype_pkey" PRIMARY KEY ("id_allocationtype")
);

-- AddForeignKey
ALTER TABLE "public"."tb_allocationtypemap" ADD CONSTRAINT "tb_allocationtypemap_id_allocationtype_fkey" FOREIGN KEY ("id_allocationtype") REFERENCES "public"."tb_allocationtype"("id_allocationtype") ON DELETE RESTRICT ON UPDATE CASCADE;
