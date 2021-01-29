-- Revert orizons:0020-step_table_corrections from pg

BEGIN;
 ALTER TABLE "step" RENAME "member_id" TO "member";
 ALTER TABLE "step" RENAME "number_step" TO "number_day";
COMMIT;
