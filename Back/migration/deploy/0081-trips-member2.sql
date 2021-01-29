-- Deploy orizons:0081-trips-member2 to pg

BEGIN;
CREATE OR REPLACE VIEW "trip_by_member" AS
SELECT m."id",
        m."first_name",
        m."last_name",
        m."nickname",
        m."email",
        m."biography",
        m."cover_member",
        m."profile_photo",
        m."registration_date",
        m."localisation",
        JSON_AGG(cbt) AS "trips"
FROM "member" m
LEFT OUTER JOIN "trip" ON "trip"."member_id" = m."id"
LEFT OUTER JOIN "category_by_trip" cbt ON cbt."id" = "trip"."id"
GROUP BY m."id",
m."nickname",
        m."biography",
        m."cover_member",
        m."profile_photo",
        m."registration_date",
        m."localisation";


COMMIT;
