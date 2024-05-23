const jwt = require("jsonwebtoken");

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
  } catch (err) {
    return null;
  }
}

function authenticate(req, res, next) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
}

exports.verifyToken = verifyToken;
exports.authenticateRequest = authenticate;
