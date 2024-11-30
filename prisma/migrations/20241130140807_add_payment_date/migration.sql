/*
  Warnings:

  - You are about to drop the column `date` on the `payments` table. All the data in the column will be lost.
  - Added the required column `paymentDate` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "payments_date_idx";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "date",
ADD COLUMN     "paymentDate" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "payments_paymentDate_idx" ON "payments"("paymentDate");
