-- Deploy orizons:0020-step_table_corrections to pg

BEGIN;
 
 ALTER TABLE "step" RENAME "member" TO "member_id";
 ALTER TABLE "step" RENAME "number_day" TO "number_step";

COMMIT;
