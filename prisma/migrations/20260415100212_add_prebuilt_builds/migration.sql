-- CreateTable
CREATE TABLE "PrebuiltBuild" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "BuildComponent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "buildId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "BuildComponent_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "PrebuiltBuild" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "BuildComponent_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PrebuiltBuild_slug_key" ON "PrebuiltBuild"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BuildComponent_buildId_productId_key" ON "BuildComponent"("buildId", "productId");
