"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const { ApiRoute } = require("./src/routes/apiRoutes");
const { MongoConnexion } = require("./config");
const cors = require("cors");
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
