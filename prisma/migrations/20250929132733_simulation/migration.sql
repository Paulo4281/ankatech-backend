-- CreateTable
CREATE TABLE "public"."tb_simulation" (
    "id_simulation" TEXT NOT NULL,
    "name_simulation" TEXT NOT NULL,
    "rate_simulation" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_familymember" TEXT NOT NULL,

    CONSTRAINT "tb_simulation_pkey" PRIMARY KEY ("id_simulation")
);

-- AddForeignKey
ALTER TABLE "public"."tb_simulation" ADD CONSTRAINT "tb_simulation_id_familymember_fkey" FOREIGN KEY ("id_familymember") REFERENCES "public"."tb_familymember"("id_familymember") ON DELETE RESTRICT ON UPDATE CASCADE;
