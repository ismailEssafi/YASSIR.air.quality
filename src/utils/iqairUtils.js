"use strict";
const { UnlayerConfig } = require("../const")
const axios = require('axios').default;

class IqairUtils {

    /**
     * call iqair api to get air quality for the nearest city
     * @param {*} lat 
     * @param {*} lon 
     */
    static async getNearestCityData(lat, lon) {
        const { data } = await axios.get(`${UnlayerConfig.IQAIR_API_URL}/nearest_city?lat=${lat}&lon=${lon}&key=${UnlayerConfig.IQAIR_API_KEY}`);
        return data;
    }

}

module.exports = IqairUtils;