-- Revert orizons:0030-trips-functions from pg

BEGIN;

DROP VIEW "trip_with_duration_status";
DROP VIEW "step_author";

COMMIT;
