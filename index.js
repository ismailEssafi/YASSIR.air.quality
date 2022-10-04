"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const { ApiRoute } = require("./src/routes/apiRoutes");
const { MongoConnexion } = require("./config");
const cors = require("cors");
const { ToadScheduler, SimpleIntervalJob, Task } = require('toad-scheduler')
const axios = require('axios').default;
const { AirQuality } = require('./src/models');
const { MongoService } = require('./src/services')
const dotenv = require("dotenv");

class Server {
  constructor() {
    this.app = express();
    this.initMiddlewares();
    this.initRoutes();
    this.config();
  }

  /**
   * init middlewares
   */
  initMiddlewares() {
    this.app.use(bodyParser.json({ limit: "50mb" })); // for parsing application/json
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // for parsing application/x-www-form-urlencoded
    this.app.use(cors());
    dotenv.config({ path: __dirname + "/.env" }); // config en path
  }

  /**
   * init routing
   */
  initRoutes() {
    this.app.use('/', ApiRoute.initRoutes());
  }

  /**
   * server run with config
   */
  config() {
    const port = process.env.PORT || "3000"; // port for node server
    this.app.listen(port, async () => {
      // launch server
      MongoConnexion.connect(); // connect to database
      console.log("server is running on port " + port);
      
      const scheduler = new ToadScheduler()
      const task = new Task('simple task', () => { 
        axios.get('http://192.168.1.213:3000/air-quality/48.856613/2.352222')
        .then(async function (response) {
          const mongoService = new MongoService(AirQuality);
          await mongoService.create({city : 'Paris', pollution : response.data.result.pollution});
        })
        .catch(function (error) {
          console.log(error);
        });
       })
      const job = new SimpleIntervalJob({ seconds: 60, }, task)

      scheduler.addSimpleIntervalJob(job)
    });
  }

  /**
   * run application
   */
  static bootstrap() {
    return new Server();
  }
}

//run server
Server.bootstrap();
