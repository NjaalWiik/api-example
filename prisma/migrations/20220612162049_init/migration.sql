-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "pricespyId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rootDomain" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "coupon" TEXT,
    "name" TEXT,
    "page" TEXT,
    "terms" TEXT,
    "trackinUrl" TEXT,
    "validTo" TIMESTAMP(3),
    "validFrom" TIMESTAMP(3),
    "amount" TEXT NOT NULL,
    "verifiedCoupon" BOOLEAN,
    "status" TEXT,
    "feedbackPositive" INTEGER,
    "feedbackNegative" INTEGER,
    "clicked" INTEGER,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shop" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pricespyId" INTEGER,
    "name" TEXT NOT NULL,
    "companyName" TEXT,
    "root_domain" TEXT NOT NULL,
    "logo176" TEXT,
    "logo88" TEXT,
    "externalUri" TEXT,
    "information" TEXT,
    "countryCode" TEXT,
    "market" TEXT,
    "currency" TEXT,
    "storeLocationCount" INTEGER,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);
