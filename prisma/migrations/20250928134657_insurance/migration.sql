-- CreateTable
CREATE TABLE "public"."tb_insurance" (
    "id_insurance" TEXT NOT NULL,
    "title_insurance" TEXT NOT NULL,
    "value_insurance" INTEGER NOT NULL,
    "datestart_insurance" TIMESTAMP(3) NOT NULL,
    "duration_insurance" INTEGER NOT NULL,
    "prize_insurance" INTEGER NOT NULL,
    "id_familymember" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_insurance_pkey" PRIMARY KEY ("id_insurance")
);

-- AddForeignKey
ALTER TABLE "public"."tb_insurance" ADD CONSTRAINT "tb_insurance_id_familymember_fkey" FOREIGN KEY ("id_familymember") REFERENCES "public"."tb_familymember"("id_familymember") ON DELETE RESTRICT ON UPDATE CASCADE;
