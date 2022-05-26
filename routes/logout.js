import express from "express";
let router = express.Router();

router.get("/", async (req, res) => {
  res.clearCookie("token");
  return res.json({
    success: true,
  });
});

export default router;
