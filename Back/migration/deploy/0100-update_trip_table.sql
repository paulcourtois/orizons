-- Deploy orizons:0100-update_trip_table to pg

BEGIN;

ALTER TABLE "trip" ALTER COLUMN "cover_trip" 
    SET DEFAULT 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80';


COMMIT;
