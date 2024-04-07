-- CreateEnum
CREATE TYPE "ChartType" AS ENUM ('barChart', 'lineChart', 'pieChart');

-- DropEnum
DROP TYPE "enum_Anthogram_chartType";

-- DropEnum
DROP TYPE "enum_Anthograms_chartType";

-- CreateTable
CREATE TABLE "Anthogram" (
    "id" SERIAL NOT NULL,
    "chartType" "ChartType" NOT NULL,
    "name" TEXT,
    "xAxe" TEXT[],
    "yAxe" TEXT[],
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Anthogram_pkey" PRIMARY KEY ("id")
);
