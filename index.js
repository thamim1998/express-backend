const express = require("express");
const app = express();
const dotenv = require("dotenv").config({path:"./routes/.env"});
const mongoose = require("mongoose");

// dotenv.config();

//import Routes
const authRoute = require("./routes/auth");
const cors = require("cors");


//connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("connected to DB")
);

//middleware
app.use(cors())
app.use(express.json());

//route middleware routes
app.use("/api/user", authRoute);

app.listen(5000, () => console.log("listening on port"));
