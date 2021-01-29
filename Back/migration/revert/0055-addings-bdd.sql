-- Revert orizons:0055-addings-bdd from pg

BEGIN;

UPDATE "step" SET "localisation_id" = 1;
ALTER TABLE "step" ALTER COLUMN "localisation_id" SET NOT NULL;

ALTER TABLE "photo" DROP COLUMN "step_id" CASCADE;
COMMIT;
