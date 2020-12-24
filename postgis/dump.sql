-- Create table with spatial column
SET timezone='America/Bogota';

CREATE TABLE store (
  storeId SERIAL PRIMARY KEY,
  storeName VARCHAR(255),
  coordinates GEOGRAPHY(Point)
);
CREATE TABLE business_schedule (
  businessId SERIAL PRIMARY KEY,
  storeId SERIAL,
  DayOfTheWeek INTEGER,
  OpenTime TIME,
  CloseTime TIME,
  FOREIGN KEY (storeId) REFERENCES store(storeId)
);
-- 1 Monday, 2 Tuesday, 3 Wednesday, 4 Thursday, 5 Friday, 6 Saturday, 7 Sunday
CREATE DOMAIN recurrence AS TEXT
CHECK ( VALUE IN ( 'none', 'daily', 'weekly', 'monthly' ) );

CREATE TABLE delivery_time (
    deliveryId	SERIAL PRIMARY KEY,
    storeId SERIAL,
    startsAt TIMESTAMP NOT NULL,              
    recurrence RECURRENCE NOT NULL DEFAULT 'none',
	FOREIGN KEY (storeId) REFERENCES store(storeId)
);

 
-- Add a spatial index
CREATE INDEX store_gix
  ON store
  USING GIST (coordinates);
 
-- Add a point
INSERT INTO store VALUES (DEFAULT, 'Centro Comercial Santafé', 'POINT(4.761944 -74.046389)');
INSERT INTO store VALUES (DEFAULT, 'Centro Comercial Andino', 'POINT(4.6668 -74.0531)');
INSERT INTO store VALUES (DEFAULT, 'Centro Comercial Bulevar Niza', 'POINT(4.7125 -74.0715)');
INSERT INTO store VALUES (DEFAULT, 'Centro Comercial Portal de la 80', 'POINT(4.710731 -74.111832)');
INSERT INTO store VALUES (DEFAULT, 'Centro Comercial Centro Mayor', 'POINT(4.591667 -74.123889)');
INSERT INTO store VALUES (DEFAULT, 'Centro Comercial Plaza de las Ámericas', 'POINT(4.61856 -74.135318)');
INSERT INTO store VALUES (DEFAULT, 'Centro Comercial Plaza Central', 'POINT(4.63274294 -74.11442159)');
INSERT INTO store VALUES (DEFAULT, 'Centro Comercial Hayuelos', 'POINT(4.6637962 -74.130542)');

INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Santafé'), 1, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Santafé'), 2, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Santafé'), 3, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Santafé'), 4, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Santafé'), 5, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Santafé'), 6, '07:00:00', '19:00:00');

INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Andino'), 1, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Andino'), 2, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Andino'), 3, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Andino'), 4, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Andino'), 5, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Andino'), 6, '07:00:00', '19:00:00');

INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Bulevar Niza'), 1, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Bulevar Niza'), 2, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Bulevar Niza'), 3, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Bulevar Niza'), 4, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Bulevar Niza'), 5, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Bulevar Niza'), 6, '07:00:00', '19:00:00');

INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Portal de la 80'), 1, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Portal de la 80'), 2, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Portal de la 80'), 3, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Portal de la 80'), 4, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Portal de la 80'), 5, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Portal de la 80'), 6, '07:00:00', '19:00:00');

INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Plaza de las Ámericas'), 1, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Plaza de las Ámericas'), 2, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Plaza de las Ámericas'), 3, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Plaza de las Ámericas'), 4, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Plaza de las Ámericas'), 5, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Plaza de las Ámericas'), 6, '07:00:00', '19:00:00');

INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Plaza Central'), 1, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Plaza Central'), 2, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Plaza Central'), 3, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Plaza Central'), 4, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Plaza Central'), 5, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Plaza Central'), 6, '07:00:00', '19:00:00');

INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Hayuelos'), 1, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Hayuelos'), 2, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Hayuelos'), 3, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Hayuelos'), 4, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Hayuelos'), 5, '07:00:00', '19:00:00');
INSERT INTO business_schedule VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Hayuelos'), 6, '07:00:00', '19:00:00');

INSERT INTO delivery_time VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Santafé'), '2020-12-24 09:00:00', 'daily');
INSERT INTO delivery_time VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Santafé'), '2020-12-24 12:00:00', 'daily');
INSERT INTO delivery_time VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Santafé'), '2020-12-24 16:00:00', 'daily');

INSERT INTO delivery_time VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Andino'), '2020-12-24 09:00:00', 'daily');
INSERT INTO delivery_time VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Andino'), '2020-12-24 12:00:00', 'daily');
INSERT INTO delivery_time VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Andino'), '2020-12-24 16:00:00', 'daily');

INSERT INTO delivery_time VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Bulevar Niza'), '2020-12-24 09:00:00', 'daily');
INSERT INTO delivery_time VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Bulevar Niza'), '2020-12-24 12:00:00', 'daily');
INSERT INTO delivery_time VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Bulevar Niza'), '2020-12-24 16:00:00', 'daily');

INSERT INTO delivery_time VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Portal de la 80'), '2020-12-24 09:00:00', 'daily');
INSERT INTO delivery_time VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Portal de la 80'), '2020-12-24 12:00:00', 'daily');
INSERT INTO delivery_time VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Portal de la 80'), '2020-12-24 16:00:00', 'daily');

INSERT INTO delivery_time VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Plaza de las Ámericas'), '2020-12-24 09:00:00', 'daily');
INSERT INTO delivery_time VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Plaza de las Ámericas'), '2020-12-24 12:00:00', 'daily');
INSERT INTO delivery_time VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Plaza de las Ámericas'), '2020-12-24 16:00:00', 'daily');

INSERT INTO delivery_time VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Plaza Central'), '2020-12-24 09:00:00', 'daily');
INSERT INTO delivery_time VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Plaza Central'), '2020-12-24 12:00:00', 'daily');
INSERT INTO delivery_time VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Plaza Central'), '2020-12-24 16:00:00', 'daily');

INSERT INTO delivery_time VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Hayuelos'), '2020-12-24 09:00:00', 'daily');
INSERT INTO delivery_time VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Hayuelos'), '2020-12-24 12:00:00', 'daily');
INSERT INTO delivery_time VALUES (DEFAULT, (SELECT storeId FROM store WHERE storeName = 'Centro Comercial Hayuelos'), '2020-12-24 16:00:00', 'daily');


