-- CreateEnum
CREATE TYPE "public"."MovementType" AS ENUM ('earning', 'expense');

-- CreateEnum
CREATE TYPE "public"."MovementFrequency" AS ENUM ('unique', 'monthly', 'yearly');

-- CreateEnum
CREATE TYPE "public"."MovementCategory" AS ENUM ('credit', 'dependent', 'fixed');

-- CreateTable
CREATE TABLE "public"."tb_movement" (
    "id_movement" TEXT NOT NULL,
    "datestart_movement" TIMESTAMP(3) NOT NULL,
    "dateend_movement" TIMESTAMP(3),
    "type_movement" "public"."MovementType" NOT NULL,
    "frequency_movement" "public"."MovementFrequency" NOT NULL,
    "category_movement" "public"."MovementCategory" NOT NULL,
    "id_familymember" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_movement_pkey" PRIMARY KEY ("id_movement")
);

-- AddForeignKey
ALTER TABLE "public"."tb_movement" ADD CONSTRAINT "tb_movement_id_familymember_fkey" FOREIGN KEY ("id_familymember") REFERENCES "public"."tb_familymember"("id_familymember") ON DELETE RESTRICT ON UPDATE CASCADE;
