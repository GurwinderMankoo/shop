-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "subtotal" DECIMAL NOT NULL,
    "discountAmount" DECIMAL NOT NULL DEFAULT 0,
    "taxAmount" DECIMAL NOT NULL DEFAULT 0,
    "shippingAmount" DECIMAL NOT NULL DEFAULT 0,
    "total" DECIMAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "couponId" TEXT,
    "couponCode" TEXT,
    "paymentIntent" TEXT,
    "stripeCheckoutSessionId" TEXT,
    "stripeSessionExpiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("couponCode", "couponId", "createdAt", "discountAmount", "id", "paymentIntent", "paymentStatus", "shippingAmount", "status", "stripeCheckoutSessionId", "stripeSessionExpiresAt", "subtotal", "taxAmount", "total", "updatedAt", "userId") SELECT "couponCode", "couponId", "createdAt", "discountAmount", "id", "paymentIntent", "paymentStatus", "shippingAmount", "status", "stripeCheckoutSessionId", "stripeSessionExpiresAt", "subtotal", "taxAmount", "total", "updatedAt", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_paymentIntent_key" ON "Order"("paymentIntent");
CREATE UNIQUE INDEX "Order_stripeCheckoutSessionId_key" ON "Order"("stripeCheckoutSessionId");
CREATE INDEX "Order_userId_idx" ON "Order"("userId");
CREATE INDEX "Order_status_idx" ON "Order"("status");
CREATE INDEX "Order_paymentStatus_idx" ON "Order"("paymentStatus");
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
