-- Deploy orizons:0010-add_role to pg

BEGIN;
DROP TABLE IF EXISTS "docket";

CREATE TABLE IF NOT EXISTS "docket"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"role_name" TEXT_ONLY 
);

INSERT INTO "docket"("role_name") VALUES
('Member'),
('Admin');

ALTER TABLE "member" ADD COLUMN "docket_id" INT NOT NULL REFERENCES "docket"("id") DEFAULT 1;

COMMIT;
