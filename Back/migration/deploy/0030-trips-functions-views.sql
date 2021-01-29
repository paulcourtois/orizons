-- Deploy orizons:0030-trips-functions to pg

BEGIN;


CREATE OR REPLACE VIEW step_author AS
SELECT "member"."id" AS "id_member",
    "member"."nickname",
    "step"."trip_id" AS "trip_id",
    JSON_AGG("step") AS "steps"
    FROM "member"
    JOIN "step" ON "step"."member_id" = "member"."id"
    GROUP BY "member"."id", "member"."nickname", "step"."trip_id";



CREATE OR REPLACE VIEW "trip_with_duration_status" AS
SELECT t."id",
        t."title",
        t."summary",
        t."departure_date",
        t."arrival_date",(t."arrival_date"-t."departure_date" + 1) AS "duration",
        (CASE WHEN t."arrival_date" IS NULL 
                THEN 'En cours'
                ELSE 'Terminé'
                END) AS "status",
        t."score",
        JSON_AGG("photo") AS "cover_photo"
FROM "trip" t
JOIN "photo" ON "photo"."id" = t."photo_id"
GROUP BY t."id",
        t."title",
        t."summary",
        t."departure_date",
        t."arrival_date";


--CREATE OR REPLACE VIEW "trips_over" AS 




COMMIT;
