import express from 'express'
let router = express.Router();
// import User from "../models/User.js"
// import Course from "../models/Course.js"
// import moment from 'moment'

router.get("/", async (req, res) => {
    // cookies.set('token', {maxAge: 0});
    res.clearCookie("token")
    return res.json({
        success: true,
      })
});

export default router;