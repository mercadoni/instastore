#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	-- Create table with spatial column
	CREATE TABLE mytable (
	  id SERIAL PRIMARY KEY,
	  geom GEOMETRY(Point, 26910),
	  name VARCHAR(128)
	);
	 
	-- Add a spatial index
	CREATE INDEX mytable_gix
	  ON mytable
	  USING GIST (geom);
	 
	-- Add a point
	INSERT INTO mytable (geom) VALUES (
	  ST_GeomFromText('POINT(0 0)', 26910)
	);	
EOSQL
