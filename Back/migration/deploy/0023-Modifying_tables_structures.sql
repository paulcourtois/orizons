-- Deploy orizons:0023-Modifying_tables_structures to pg

BEGIN;

ALTER TABLE "trip" ADD COLUMN "category_id" INT REFERENCES "category"("id");
ALTER TABLE "category" ADD COLUMN "image" TEXT;

COMMIT;
