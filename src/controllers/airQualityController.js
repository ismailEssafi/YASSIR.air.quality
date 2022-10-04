"use strict";

const { AirQuality } = require('../models');
const { IqairUtils } = require("../utils")
const { MongoService } = require('../services')
const moment = require("moment");

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


    /**
     * get air quality of nearest city base on (lat,lon)
     */
    getParisMostPollutedDatetime() {
        return async (req, res) => {
          try {
            const mongoService = new MongoService(AirQuality);
            const query = [{ $sort: { "pollution.aqius": -1 } }, { $limit: 1 }];
            const data = await mongoService.aggregate(query);
            const datetime = data[0].pollution.ts.toString();
            return res.status(200).json({datetime : moment(datetime).utc().format('YYYY-MM-DD HH:mm:ss')});
          } catch (error) {
            return res.status(500).json({ message: "server_error" });
          }
        };
      }
}

module.exports =  AirQualityController ;