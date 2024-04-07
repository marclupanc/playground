-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "visitTime" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
