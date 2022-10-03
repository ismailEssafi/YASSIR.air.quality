"use strict";

const { AirQuality } = require('../models');
const { IqairUtils } = require("../utils")
class AirQualityController {
    
    constructor() {}

    /**
     * get air quality of nearest city base on (lat,lon)
     */
    getAirQualityNearestCity() {
        return async (req, res) => {
          try {
            const { lat, lon } = req.params;
            const result = await IqairUtils.getNearestCityData(lat, lon);
            return res.status(200).json({result : {pollution : result.data.current.pollution}});
          } catch (error) {
            return res.status(500).json({ message: "server_error" });
          }
        };
      }
}

module.exports =  AirQualityController ;