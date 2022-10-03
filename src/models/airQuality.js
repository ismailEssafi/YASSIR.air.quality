"use strict";

const mongoose = require('mongoose');

class AirQuality {

    /**
     * airQuality schema
     */
    static get schema() {
        return new mongoose.Schema({
            
        }, {
            timestamps: true
        });
    }

}

module.exports =  mongoose.model("AirQuality", AirQuality.schema);