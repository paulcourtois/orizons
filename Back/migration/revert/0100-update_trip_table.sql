-- Revert orizons:0100-update_trip_table from pg

BEGIN;
ALTER TABLE "trip" ALTER COLUMN "cover_trip" SET DEFAULT 'default-trip';

COMMIT;
