-- Revert orizons:0070-modifying-cause-photos from pg

BEGIN;

--DROP VIEW "trip_with_duration_status";
--CREATE OR REPLACE VIEW "trip_with_duration_status" AS




--ALTER TABLE "member" ADD COLUMN "photo_id" INT REFERENCES "photo"("id");
--ALTER TABLE "trip" ADD COLUMN "photo_id" INT REFERENCES "photo"("id");
ALTER TABLE "trip" DROP COLUMN "cover_trip";

ALTER TABLE "member" ALTER COLUMN "profile_photo" DROP DEFAULT;
ALTER TABLE "member" ALTER COLUMN "profile_photo" SET DEFAULT 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg';

ALTER TABLE "member" DROP COLUMN "cover_member";





COMMIT;
