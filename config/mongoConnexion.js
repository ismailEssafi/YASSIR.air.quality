"use strict";

const mongoose = require("mongoose");

class MongoConnexion {

  /**
   * connect to database
   */
  static connect() {
    mongoose.connect(process.env.DB_Connexion, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    });
    mongoose.connection.on("connected", async () => {
      console.log("connected to database ");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("disconnected to database ");
      return mongoose.disconnect();
    });
    mongoose.connection.on("error", function (err) {
      console.log("Database error: " + err);
    });
  }

}

module.exports = MongoConnexion 
