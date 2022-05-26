import jwt from "jsonwebtoken";

const validateJWT = (req, res, next) => {
  // console.log(req.headers, "as headers");
  const token = req.headers["x-access-token"];
  // const { token } = req.cookies;
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
