/*
  Warnings:

  - You are about to drop the column `content` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `deadline` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `decription` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "content",
ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "decription" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
