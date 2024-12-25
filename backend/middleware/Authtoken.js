const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader)
    return res.status(401).json({
      error: true,
      success: false,
      message: "Authorization header missing",
    });

  const token = authHeader.replace("Bearer ", "");

  try {

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: true, success: false, message: error });
  }
};
