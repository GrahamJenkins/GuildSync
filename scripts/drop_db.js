/**
 * Purge all data from the development database.
 *
 * Deletes all records from GroupChannel, SyncGroup, Guild, and User tables.
 * Does NOT drop tables or affect migrations.
 *
 * Intended for manual use during development to reset database state.
 * Usage: node scripts/drop_db.js
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function purgeDatabase() {
  try {
    console.log('[PurgeDB] Connecting to database...');
    await prisma.$connect();

    console.log('[PurgeDB] Deleting GroupChannel records...');
    await prisma.groupChannel.deleteMany();

    console.log('[PurgeDB] Deleting SyncGroup records...');
    await prisma.syncGroup.deleteMany();

    console.log('[PurgeDB] Deleting Guild records...');
    await prisma.guild.deleteMany();

    console.log('[PurgeDB] Deleting User records...');
    await prisma.user.deleteMany();

    console.log('[PurgeDB] Database purge complete.');
  } catch (error) {
    console.error('[PurgeDB] Error during purge:', error);
  } finally {
    await prisma.$disconnect();
  }
}

purgeDatabase();