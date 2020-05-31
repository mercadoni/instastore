const dotenv = require('dotenv');
const geohash = require("ngeohash");
dotenv.config();
const { Client, Status } = require("@googlemaps/google-maps-services-js");
const axios = require('axios').default;

const axiosInstance = axios.create();
const client = new Client({ axiosInstance });

module.exports = {
    async getDistance(origins, destinations) {
        const params = {
            origins: [origins],
            destinations: [destinations],
            key: process.env.GOOGLE_MAPS_API_KEY
        };
        try {
            const result = await client.distancematrix({ params: params })

            return {
                duration: result.data.rows[0].elements[0].duration.value,
                distance: result.data.rows[0].elements[0].distance.value
            }

        } catch (error) {

        }

    },

    async getLocation(address) {
        const addressEncode = encodeURIComponent(address.address)
        const geoCodeBaseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?'
        const geoCodeURL = `${geoCodeBaseUrl}address=${addressEncode}&key=${process.env.GOOGLE_MAPS_API_KEY}`
        try {
            const location = await axios.get(geoCodeURL)

            if (location.data.status === Status.OK) {
                const { lat, lng } = location.data.results[0].geometry.location
                return { lat, lng, status: Status.OK }
            } else {
                return location.data
            }

        } catch (error) {
            throw error
        }

    },

    getGeoHash(latitude, longitude) {
        return geohash.encode(latitude, longitude);
    },
    getGeoHashLimits(latitude, longitude, distance) {

        const latitudeMile = 0.0144927536231884;
        const longitudeMile = 0.0181818181818182;

        const lowerLat = latitude - latitudeMile * distance;
        const lowerLon = longitude - longitudeMile * distance;

        const upperLat = latitude + latitudeMile * distance;
        const upperLon = longitude + longitudeMile * distance;

        const lower = this.getGeoHash(lowerLat, lowerLon);
        const upper = this.getGeoHash(upperLat, upperLon);

        return {
            lower,
            upper
        };
    }
}

