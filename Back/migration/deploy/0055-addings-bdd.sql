-- Deploy orizons:0055-addings-bdd to pg

BEGIN;

ALTER TABLE "photo" ADD COLUMN "step_id" INT REFERENCES "step"("id");

ALTER TABLE "step" ALTER COLUMN "localisation_id" DROP NOT NULL;

COMMIT;
