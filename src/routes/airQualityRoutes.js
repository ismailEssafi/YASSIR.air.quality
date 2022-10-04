"use strict";

const { Router } = require("express");
const AirQualityController = require("../controllers/airQualityController");

class AirQualityRoutes {

    /**
     * init notification routes
     */
    static initRoutes() {
        const airQualityController = new AirQualityController();
        const router = Router();
        router.route('/:lat/:lon').get(airQualityController.getAirQualityNearestCity());
        router.route('/paris-most-polluted-datetime').get(airQualityController.getParisMostPollutedDatetime());
        return router;
    }
}

module.exports = { AirQualityRoutes };