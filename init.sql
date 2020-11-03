CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;
-- Enable PostGIS Advanced 3D
-- and other geoprocessing algorithms
-- sfcgal not available with all distributions
CREATE EXTENSION IF NOT EXISTS postgis_sfcgal;
-- fuzzy matching needed for Tiger
CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;
-- rule based standardizer
CREATE EXTENSION IF NOT EXISTS address_standardizer;
-- example rule data set
CREATE EXTENSION IF NOT EXISTS address_standardizer_data_us;
-- Enable US Tiger Geocoder
CREATE EXTENSION IF NOT EXISTS postgis_tiger_geocoder;
CREATE TABLE IF NOT EXISTS grocery_store(
  id SERIAL PRIMARY KEY,
  geom GEOGRAPHY(Point),
  name VARCHAR(128),
  "createdAt" date,
  "updatedAt" date
);

CREATE INDEX IF NOT EXISTS mytable_gix
  ON grocery_store
  USING GIST (geom);

INSERT INTO grocery_store (geom) VALUES (
  ST_GeomFromText('POINT(0 0)')
);

INSERT INTO grocery_store (name, geom) VALUES ('Casa',
  ST_GeomFromText('POINT(4.621249 -74.0795589)')
);

INSERT INTO grocery_store (name, geom) VALUES ('D1 La Estrella',
  ST_GeomFromText('POINT(4.6217383 -74.0780568)')
);
INSERT INTO grocery_store (name, geom) VALUES ('D1 A 34-93, Ak. 19 #341, Bogotá',
  ST_GeomFromText('POINT(4.6242167 -74.0759716)')
);

INSERT INTO grocery_store (name, geom) VALUES ('Tienda D1 Javeriana',
  ST_GeomFromText('POINT(4.6303978 -74.0708432)')
);
INSERT INTO grocery_store (name, geom) VALUES ('Tienda D1 Galerias',
  ST_GeomFromText('POINT(4.6404285 -74.0781817)')
);
INSERT INTO grocery_store (name, geom) VALUES ('Tiendas D1 Autonorte 167',
  ST_GeomFromText('POINT(4.7387605 -74.0546951)')
);


SELECT id, name
FROM grocery_store
WHERE ST_DWithin(
  geom,
  ST_GeomFromText('POINT(4.621249 -74.0795589)', 26910),
  1
);

SELECT "id", "geom", "name", "createdAt", "updatedAt" FROM "grocery_store" AS "grocery_store" WHERE char_length("name") = 4;

SELECT name,ST_Distance(
  geom, -- Los Angeles (LAX)
  ST_GeographyFromText('POINT(4.621249 -74.0795589)')     -- Paris (CDG)
  ) as distancia
FROM grocery_store
order by distancia;


SELECT name,ST_Distance(
  geom, -- Los Angeles (LAX)
  ST_GeographyFromText('POINT(4.621249 -74.0795589)')     -- Paris (CDG)
  ) as distancia
FROM grocery_store
where ST_Distance(
  geom, -- Los Angeles (LAX)
  ST_GeographyFromText('POINT(4.621249 -74.0795589)')     -- Paris (CDG)
  )<1000;


order by distancia;


SELECT name,ST_Distance(
  geom, -- Los Angeles (LAX)
  geom    -- Paris (CDG)
  ) as distancia
FROM grocery_store
order by distancia;


SELECT "id", "geom", "name", "createdAt", "updatedAt"
FROM "grocery_store" AS "grocery_store"
WHERE
      ST_Distance("geom", 'ST_GeographyFromText(''POINT(4.621249 -74.0795589)'')') = 0

SELECT "id", "geom", "name", "createdAt", "updatedAt"
FROM "grocery_store" AS "grocery_store"
WHERE
      ST_Distance("geom", ST_GeographyFromText('POINT(4.621249 -74.0795589)')) < 1000;

SELECT "id", "geom", "name", "createdAt", "updatedAt" FROM "grocery_store" AS "grocery_store" WHERE ST_Distance("geom", ST_GeographyFromText('POINT(4.621249 -74.0795589)')) > 1000;

SELECT "id", "geom", "name", ST_Distance("geom", ST_GeographyFromText('POINT(4.621249 -74.0795589)')) FROM "grocery_store" AS "grocery_store" WHERE ST_Distance("geom", ST_GeographyFromText('POINT(4.621249 -74.0795589)')) <= 1000 ORDER BY ST_Distance("geom", ST_GeographyFromText('POINT(4.621249 -74.0795589)')) LIMIT 1;

SELECT "id", "name", ST_Distance("geom", ST_GeographyFromText('POINT(4.6422001 -74.0946311)')) AS "distance", "geom" FROM "grocery_store" AS "grocery_store" WHERE ST_Distance("geom", ST_GeographyFromText('POINT(4.6422001 -74.0946311)')) <= 10000 ORDER BY ST_Distance("geom", ST_GeographyFromText('POINT(4.6422001 -74.0946311)')) LIMIT 1;

