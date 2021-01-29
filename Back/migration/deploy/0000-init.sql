-- Deploy orizons:0000-init to pg

BEGIN;


DROP TABLE IF EXISTS "_m2m_trip_category" CASCADE;
DROP TABLE IF EXISTS "_m2m_trip_localisation" CASCADE;
DROP TABLE IF EXISTS "step" CASCADE;
DROP TABLE IF EXISTS "comment" CASCADE;
DROP TABLE IF EXISTS "category" CASCADE;
DROP TABLE IF EXISTS "trip" CASCADE;
DROP TABLE IF EXISTS "member" CASCADE;
DROP TABLE IF EXISTS "photo" CASCADE;
DROP TABLE IF EXISTS "localisation" CASCADE;

CREATE TABLE IF NOT EXISTS "localisation"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"country" TEXT,
"region" TEXT,
"city" TEXT
);

CREATE TABLE IF NOT EXISTS "photo"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"title" TEXT NOT NULL,
"url" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "member"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"first_name" TEXT NOT NULL,
"last_name" TEXT NOT NULL,
"nickname" TEXT NOT NULL UNIQUE,
"email" TEXT NOT NULL UNIQUE,
"password" TEXT NOT NULL,
"profile_photo" TEXT, -- NOT NULL ? default picture ?
"registration_date" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
"localisation_id" INT REFERENCES "localisation"("id"),
"photo_id" INT REFERENCES "photo"("id") --bannière NOT NULL default picture
);

CREATE TABLE IF NOT EXISTS "trip"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"title" TEXT NOT NULL,
"summary" TEXT,
"departure_date" DATE,
"arrival_date" DATE CHECK ("arrival_date" >= "departure_date"),
"creation_date" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
"score" INT NOT NULL CHECK ("score" >=0),
"localisation_id" INT REFERENCES "localisation"("id"), -- /!\ 1 trip plusieurs destinations
"photo_id" INT REFERENCES "photo"("id"),
"member_id" INT NOT NULL REFERENCES "member"("id")
);

CREATE TABLE IF NOT EXISTS "category"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"entitled" TEXT NOT NULL UNIQUE,
"color" TEXT NOT NULL DEFAULT('#FFFFFF')
);

CREATE TABLE IF NOT EXISTS "comment"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"title" TEXT NOT NULL,
"content" TEXT NOT NULL,
"score" INT NOT NULL DEFAULT 0 CHECK("score" >=0),
"member_id" INT NOT NULL REFERENCES "member"("id"),
"trip_id" INT NOT NULL REFERENCES "trip"("id")
);

CREATE TABLE IF NOT EXISTS "step"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"longitude" FLOAT,
"latitude" FLOAT,
"title" TEXT NOT NULL,
"number_day" INT NOT NULL, --  CHECK ?
"content" TEXT NOT NULL,
"member" INT NOT NULL REFERENCES "member"("id"),--user_id
"localisation_id" INT NOT NULL REFERENCES "localisation"("id"),
"trip_id" INT NOT NULL REFERENCES "trip"("id")
);

CREATE TABLE IF NOT EXISTS "_m2m_trip_localisation"( --trip_has_localisation
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"localisation_id" INT NOT NULL REFERENCES "localisation"("id"),
"trip_id" INT NOT NULL REFERENCES "trip"("id")
);

CREATE TABLE IF NOT EXISTS "_m2m_trip_category"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"category_id" INT NOT NULL REFERENCES "category"("id"),
"trip_id" INT NOT NULL REFERENCES "trip"("id")
);

ALTER TABLE "photo" ADD COLUMN "member_id" INT REFERENCES "member"("id");

COMMIT;
