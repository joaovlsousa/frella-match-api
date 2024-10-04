-- CreateEnum
CREATE TYPE "WorkStatus" AS ENUM ('OPEN', 'CLOSED', 'FINISHED');

-- CreateTable
CREATE TABLE "freelancers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "freelancers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recruters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recruters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "works" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "delivery_time" TIMESTAMP(3),
    "amount_charged" DOUBLE PRECISION NOT NULL,
    "status" "WorkStatus" NOT NULL,
    "owner_id" TEXT NOT NULL,
    "freelancer_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "works_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submissions" (
    "id" TEXT NOT NULL,
    "freelancer_id" TEXT NOT NULL,
    "work_id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "portfolio_link" TEXT,
    "linkedin_link" TEXT,
    "delivery_time" TIMESTAMP(3) NOT NULL,
    "amount_charged" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "freelancers_email_key" ON "freelancers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "recruters_email_key" ON "recruters"("email");

-- AddForeignKey
ALTER TABLE "works" ADD CONSTRAINT "works_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "recruters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "works" ADD CONSTRAINT "works_freelancer_id_fkey" FOREIGN KEY ("freelancer_id") REFERENCES "freelancers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_freelancer_id_fkey" FOREIGN KEY ("freelancer_id") REFERENCES "freelancers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "works"("id") ON DELETE CASCADE ON UPDATE CASCADE;
