/*
  Warnings:

  - The primary key for the `Anthogram` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Anthogram" DROP CONSTRAINT "Anthogram_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Anthogram_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Anthogram_id_seq";
