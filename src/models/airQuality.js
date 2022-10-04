"use strict";

const mongoose = require('mongoose');

class AirQuality {

    /**
     * airQuality schema
     */
    static get schema() {
        return new mongoose.Schema({
            city : { type: String},
            pollution : { 
                ts: { type : Date},
                aqius: { type: Number},
                mainus: { type: String},
                aqicn: { type: Number},
                maincn: { type: String}
             }
        }, {
            timestamps: true
        });
    }

}

module.exports =  mongoose.model("AirQuality", AirQuality.schema);