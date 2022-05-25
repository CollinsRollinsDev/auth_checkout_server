import express from "express";
let router = express.Router();
import User from "../models/User.js";
import { hash } from "bcrypt";

router.post("/", async (req, res) => {
  console.log("hitted");
  console.log(req.body, "as body");
  // check if the user already exist.......
  const user = await User.findOne({
    emailAddress: req.body.emailAddress,
  });

  if (user) {
    console.log("user exist");
    return res.status(400).json({
      success: false,
      message: `Sorry, a user with this credentials already exist`,
    });
  }

  try {
    hash(req.body.password, 10, async function (err, hash) {
      // Store hash in your password DB.
      // Convert incoming password to hashed password
      req.body.password = await hash;
      //  save user to database
      const user = await User.create(req.body);
      return res.status(200).json({
        success: true,
        message: `User created successfully.`,
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Sorry, unidentified error occured!`,
    });
  }
});

export default router;
