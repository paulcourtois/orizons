-- Revert orizons:0040-settings-member-table from pg

BEGIN;

ALTER TABLE "member" DROP COLUMN "localisation";


COMMIT;
