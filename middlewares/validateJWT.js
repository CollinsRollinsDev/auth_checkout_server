import jwt from "jsonwebtoken";

const validateJWT = (req, res, next) => {
  // const token = req.headers["x-access-token"];
  console.log(req, "as request");
  const { token } = req.cookies;
  console.log(token, "As token");
  if (!token)
    return res.json({
      success: false,
      message: "We need a token man.",
    });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.json({
        success: false,
        message: "Auth Failed.",
      });
    req.userId = decoded.id;
    req.dataFromMiddlewareValidateJWT = decoded.id;
    next();
  });
};

export default validateJWT;
