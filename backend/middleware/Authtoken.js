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
<<<<<<< HEAD

=======
    // console.log("try")
>>>>>>> 8497c196b8fbe807dd80de1a62debd0c6724cd8c
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: true, success: false, message: error });
  }
};
