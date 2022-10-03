"use strict";

const { Router } = require("express");
const { AirQualityRoutes } = require(".");

class ApiRoute {

    static initRoutes() {
        const router = Router();
            router.use('/air-quality', AirQualityRoutes.initRoutes());
        return router;
    }

}

module.exports =  { ApiRoute };
