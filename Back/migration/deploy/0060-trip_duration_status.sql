-- Deploy orizons:0060-trip_duration_status to pg

BEGIN;



CREATE OR REPLACE VIEW "category_trip_id" AS
SELECT c.id, c.entitled, c.color, tc.trip_id
FROM "category" c
JOIN "_m2m_trip_category" tc
        ON tc."category_id" = c."id";
DROP VIEW IF EXISTS "trip_with_duration_status";
CREATE OR REPLACE VIEW "trip_with_duration_status" AS
SELECT t."id",
        t."title",
        t."summary",
        t."departure_date",
        t."arrival_date",
            (CASE WHEN t."arrival_date" IS NULL 
                THEN 'En cours'
            WHEN CURRENT_DATE > t."departure_date" 
                    AND CURRENT_DATE < t."arrival_date"
                THEN 'En cours'
                ELSE 'Terminé'
                END) AS "status",
        t."score",
        JSON_AGG("photo") AS "cover_photo",
        JSON_AGG("member") AS "author",
        JSON_AGG("category_trip_id") AS "categories"
FROM "trip" t
LEFT OUTER JOIN "photo" ON "photo"."id" = t."photo_id"
LEFT OUTER JOIN "member" ON "member"."id" = t."member_id"
LEFT OUTER JOIN "category_trip_id" ON "category_trip_id"."trip_id" = t.id
GROUP BY t."id",
        t."title",
        t."summary",
        t."departure_date",
        t."arrival_date";


--DROP VIEW step_author;

CREATE OR REPLACE VIEW step_photo AS
SELECT "step"."id" AS "id_step",
    "longitude","latitude", "step"."title" AS "step_title", "number_step", "content",
    "step"."trip_id" AS "trip_id",
    JSON_AGG("photo") AS "photos"
    FROM "step"
    JOIN "photo" ON "photo"."step_id" = "step"."id"
    GROUP BY "id_step",
    "longitude","latitude", "step_title", "number_step", "content", "trip_id";

--CREATE VIEW all_trips AS
--SELECT * FROM "trip_with_duration_status" JOIN "category_trip_id" ON "category_trip_id"."trip_id" = "trip_with_duration_status"."id" GROUP BY *;

COMMIT;
