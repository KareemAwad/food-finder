-- CreateTable
CREATE TABLE "ApiUsageDay" (
    "id" SERIAL NOT NULL,
    "day" DATE NOT NULL,
    "googleCalls" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApiUsageDay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiUsageDay_day_key" ON "ApiUsageDay"("day");
