const Pool = require('pg').Pool;

const db_config = require('../conf/postgis.json');
const {user, host, database, password, port} = db_config;


const getClosestStore = function (latitude, longitude) {
    return new Promise(function (resolve, reject) {
        let pool = new Pool({
            user: user,
            host: host,
            database: database,
            password: password,
            port: port,
        });

        let date = new Date();
        let dayToday = date.getDay();
        let hourToday = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        let query = 'SELECT s.storeid, s.storeName, (bs.businessId IS NOT NULL) as isOpen, ST_AsText(coordinates) FROM \
                            (SELECT * FROM store ORDER BY coordinates <-> ST_MakePoint($1,$2) LIMIT 1) s \
                        LEFT JOIN (SELECT * FROM business_schedule WHERE ($3 BETWEEN opentime AND closetime) AND (dayoftheweek = $4)) bs \
                            ON bs.storeId = s.storeId;';

        pool.query(query, [latitude, longitude, hourToday, dayToday], (err, res) => {
            if (err || !res) {
                console.log("error in getClosestStore");
                reject(new Error("Error rows is undefined"));
            } else {
                console.log("bien in getClosestStore");
                pool.end();
                resolve(res.rows);
            }
        });
    });
};

const getNextDeliveryTime = function (storeId) {
        return new Promise(function (resolve, reject) {
                let pool = new Pool({
                    user: user,
                    host: host,
                    database: database,
                    password: password,
                    port: port,
                });
                let query = "SELECT * FROM (SELECT generate_series(startsAt::TIMESTAMP at time zone 'UTC', now() + INTERVAL '1 year', '1 day'::INTERVAL) as nextDeliveryTime \
                        FROM delivery_time WHERE recurrence = 'daily' AND storeId = $1 \
                        UNION ALL \
                        SELECT generate_series(startsAt::TIMESTAMP at time zone 'UTC', now() + INTERVAL '1 year', '1 week'::INTERVAL) as nextDeliveryTime \
                        FROM delivery_time WHERE recurrence = 'weekly' AND storeId = $1 \
                        UNION ALL \
                        SELECT generate_series(startsAt::TIMESTAMP at time zone 'UTC', now() + INTERVAL '1 year', '1 month'::INTERVAL) as nextDeliveryTime \
                        FROM delivery_time WHERE recurrence = 'monthly' AND storeId = $1 \
                        UNION ALL \
                        SELECT startsAt as nextDeliveryTime FROM delivery_time WHERE recurrence = 'none' AND storeId = $1 \
                        ) al WHERE al.nextDeliveryTime >= (LOCALTIMESTAMP at time zone 'UTC') ORDER BY al.nextDeliveryTime LIMIT 1";
                pool.query(query, [storeId], (err, res) => {
                    if (err || !res) {
                        console.log("error in getNextDeliveryTime");
                        reject(new Error("Error rows is undefined"));
                    } else {
                        console.log("bien in getNextDeliveryTime");
                        pool.end();
                        resolve(res.rows);
                    }
                });
            }
        )
            ;
    }
;


module.exports = {getClosestStore, getNextDeliveryTime};