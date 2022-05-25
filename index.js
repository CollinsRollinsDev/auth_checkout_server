// const express = require("express");
import express from 'express';
const index = express();

// const mongoose = require("mongoose");
import mongoose from 'mongoose'
index.use(express.urlencoded({ extended: true }));
import dotenv from 'dotenv'
dotenv.config();
index.use(express.json());
const uri = process.env.MONGODB_CONNECTION_URI;
import cors from 'cors'
import cookieParser from 'cookie-parser';
index.use(cookieParser())
let whitelist = ['http://localhost:3000', /** other domains if any */ ]
let corsOptions = {
    credentials: true,
    origin: function(origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

// initialate cors

// index.use(cors(corsOptions));
index.use(cors());
// routes imports
import login from './routes/login.js'
import create_account from './routes/create_account.js'
import get_users_data from './routes/get_users_data.js'
import logout from './routes/logout.js'

// using imported routes
index.use("/login", login);
index.use("/create_account", create_account);
index.use("/get_users_data", get_users_data);
index.use("/logout", logout);

// Connecting MongoDb Atlas to Application
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

try {
  connection.on('error', console.error.bind(console, 'connection error:'));
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully.");
  });
} catch (error) {
  console.log("Something went wrong");
}

//  Assigning Port
const PORT = process.env.PORT || 3333;

// Routes
index.get("/", async(req, res) => {
  console.log("hitted", req.cookies)
  return res.send("Hello from Collins Test Server!");
});

//   index Listening to Port Requests
index.listen(PORT, () => {
  console.log(`index is running on Port: ${PORT}`);
});