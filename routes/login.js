import express from 'express';
let router = express.Router();
import User from '../models/User.js';
import { compare } from "bcrypt";
import jwt from 'jsonwebtoken';

let proceed;

router.post("/", async (req, res) => {
  const {emailAddress, password} = req.body
  if(!emailAddress || !password) return res.status(401).json({
      success:false,
      message:"missing properties. Could be username or password."
  })
  let myTrimmedEmailAddress = emailAddress.trim();
  console.log("working....")
  const method = req.method;
  if (method === "POST") {
    const user = await User.findOne({
      emailAddress: myTrimmedEmailAddress,
    });

    try {
    if (user) {
      //   Check if emailAddress matches emailAddress on the database
      (await user.emailAddress) === myTrimmedEmailAddress
        ? (proceed = true)
        : (proceed = false);
      if (proceed) {
        // Check if password matches password on the database using bcrypt and log user in.
        compare(req.body.password, user.password, async function (err, result) {
          if (!err && result) {
            const id = user.id;
            const token = jwt.sign({id}, process.env.JWT_SECRET, {
                expiresIn:300,
            })
            
            return res.cookie('token',token, { httpOnly: true, secure: false, maxAge: 3600000 }).json({
                  success: true,
                  data:user
                })
          } 
            return res.status(200).json({
              success: false,
              message: `Sorry, something went wrong. Consider checking your password.`,
            });
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: `Sorry, but we can't find your details.`,
      });
    }
  } catch (error) {
      console.log(error, "an error occured!")
      return res.status(500).json({
        success: false,
        message: `Sorry, Unidentified error.`,
      });
  }
    
  }
});

export default router;