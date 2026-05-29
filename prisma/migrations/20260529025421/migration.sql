/*
  Warnings:

  - You are about to drop the column `position` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `areaId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hireDate` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "position",
ADD COLUMN     "areaId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hireDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Area" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Area_departmentId_idx" ON "Area"("departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Area_name_departmentId_key" ON "Area"("name", "departmentId");

-- CreateIndex
CREATE INDEX "Employee_areaId_idx" ON "Employee"("areaId");

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
