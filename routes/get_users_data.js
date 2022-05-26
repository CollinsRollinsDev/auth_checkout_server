import express from "express";
let router = express.Router();
import User from "../models/User.js";
import verifyJWT from "../middlewares/validateJWT.js";

router.get("/", verifyJWT, async (req, res) => {
  // check if the user already exist.......
  console.log(req.dataFromMiddlewareValidateJWT, "param passed");
  const user = await User.findOne({
    id: req.dataFromMiddlewareValidateJWT,
  });
  if (!user)
    return res.status(404).json({
      success: false,
      message: "user not found",
    });

  return res.status(404).json({
    success: true,
    data: user,
  });
});

export default router;
