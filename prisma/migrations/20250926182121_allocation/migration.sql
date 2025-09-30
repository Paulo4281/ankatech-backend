-- CreateTable
CREATE TABLE "public"."tb_allocation" (
    "id_allocation" TEXT NOT NULL,
    "title_allocation" TEXT NOT NULL,
    "datestart_allocation" TIMESTAMP(3),
    "installments_allocation" INTEGER,
    "interestrate_allocation" DOUBLE PRECISION,
    "entryvalue_allocation" INTEGER,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_allocation_pkey" PRIMARY KEY ("id_allocation")
);

-- CreateTable
CREATE TABLE "public"."AllocationType" (
    "id_allocationtype" TEXT NOT NULL,
    "name_allocationtype" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AllocationType_pkey" PRIMARY KEY ("id_allocationtype")
);

-- CreateTable
CREATE TABLE "public"."tb_allocationtypemap" (
    "id_allocationtypemap" TEXT NOT NULL,
    "id_allocation" TEXT NOT NULL,
    "id_allocationtype" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_allocationtypemap_pkey" PRIMARY KEY ("id_allocationtypemap")
);

-- CreateTable
CREATE TABLE "public"."tb_allocationregister" (
    "id_allocationregister" TEXT NOT NULL,
    "date_allocationregister" TIMESTAMP(3) NOT NULL,
    "value_allocationregister" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "id_allocation" TEXT NOT NULL,

    CONSTRAINT "tb_allocationregister_pkey" PRIMARY KEY ("id_allocationregister")
);

-- CreateTable
CREATE TABLE "public"."tb_heritage" (
    "id_heritage" TEXT NOT NULL,
    "value_heritage" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_heritage_pkey" PRIMARY KEY ("id_heritage")
);

-- AddForeignKey
ALTER TABLE "public"."tb_allocationtypemap" ADD CONSTRAINT "tb_allocationtypemap_id_allocation_fkey" FOREIGN KEY ("id_allocation") REFERENCES "public"."tb_allocation"("id_allocation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_allocationtypemap" ADD CONSTRAINT "tb_allocationtypemap_id_allocationtype_fkey" FOREIGN KEY ("id_allocationtype") REFERENCES "public"."AllocationType"("id_allocationtype") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_allocationregister" ADD CONSTRAINT "tb_allocationregister_id_allocation_fkey" FOREIGN KEY ("id_allocation") REFERENCES "public"."tb_allocation"("id_allocation") ON DELETE RESTRICT ON UPDATE CASCADE;
