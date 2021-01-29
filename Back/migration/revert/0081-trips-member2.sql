-- Revert orizons:0081-trips-member2 from pg

BEGIN;

DROP VIEW "trip_by_member";

COMMIT;
