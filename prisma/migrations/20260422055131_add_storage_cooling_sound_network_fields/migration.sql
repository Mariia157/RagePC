-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "bitDepth" INTEGER,
ADD COLUMN     "cacheMb" INTEGER,
ADD COLUMN     "capacityGb" INTEGER,
ADD COLUMN     "capacityTb" INTEGER,
ADD COLUMN     "channels" TEXT,
ADD COLUMN     "interfaceType" TEXT,
ADD COLUMN     "networkSpeed" TEXT,
ADD COLUMN     "radiatorMm" INTEGER,
ADD COLUMN     "readSpeedMBs" INTEGER,
ADD COLUMN     "rpm" INTEGER,
ADD COLUMN     "sampleRateKhz" INTEGER,
ADD COLUMN     "wireless" BOOLEAN,
ADD COLUMN     "writeSpeedMBs" INTEGER;
