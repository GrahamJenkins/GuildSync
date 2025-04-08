-- CreateTable
CREATE TABLE "Guild" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SyncGroup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "join_code" TEXT,
    "created_by_user_id" BIGINT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "SyncGroup_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GroupChannel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "discord_id" BIGINT NOT NULL,
    "guild_id" BIGINT NOT NULL,
    "sync_group_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rate_limit" INTEGER NOT NULL,
    "language_code" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "added_by_user_id" BIGINT NOT NULL,
    "added_by_username" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "GroupChannel_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GroupChannel_sync_group_id_fkey" FOREIGN KEY ("sync_group_id") REFERENCES "SyncGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GroupChannel_added_by_user_id_fkey" FOREIGN KEY ("added_by_user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
