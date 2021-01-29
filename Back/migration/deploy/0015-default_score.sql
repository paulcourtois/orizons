-- Deploy orizons:0015-default_score to pg

BEGIN;

ALTER TABLE "trip" ALTER COLUMN "score" SET DEFAULT 0;

COMMIT;
