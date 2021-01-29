-- Deploy orizons:0070-modifying-cause-photos to pg

BEGIN;
ALTER TABLE "member" ADD COLUMN "cover_member" TEXT DEFAULT 'default-cover';

ALTER TABLE "member" ALTER COLUMN "profile_photo" DROP DEFAULT;
ALTER TABLE "member" ALTER COLUMN "profile_photo" SET DEFAULT 'default-profile';


ALTER TABLE "trip" ADD COLUMN "cover_trip" TEXT DEFAULT 'default-trip';

--DROP VIEW "trip_with_duration_status";


        




COMMIT;
