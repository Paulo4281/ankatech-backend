-- CreateTable
CREATE TABLE "public"."tb_family" (
    "id_family" TEXT NOT NULL,
    "name_family" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_family_pkey" PRIMARY KEY ("id_family")
);

-- CreateTable
CREATE TABLE "public"."tb_familymember" (
    "id_familymember" TEXT NOT NULL,
    "name_familymember" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_family" TEXT NOT NULL,

    CONSTRAINT "tb_familymember_pkey" PRIMARY KEY ("id_familymember")
);

-- AddForeignKey
ALTER TABLE "public"."tb_familymember" ADD CONSTRAINT "tb_familymember_id_family_fkey" FOREIGN KEY ("id_family") REFERENCES "public"."tb_family"("id_family") ON DELETE RESTRICT ON UPDATE CASCADE;
