-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Metadata" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "messagesCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Metadata_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("authId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Metadata_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Metadata" ("createdAt", "id", "messagesCount", "postId", "updatedAt", "userId") SELECT "createdAt", "id", "messagesCount", "postId", "updatedAt", "userId" FROM "Metadata";
DROP TABLE "Metadata";
ALTER TABLE "new_Metadata" RENAME TO "Metadata";
CREATE UNIQUE INDEX "Metadata_userId_postId_key" ON "Metadata"("userId", "postId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
