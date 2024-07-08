const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

function verifyToken(req, res, next) {
 
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const tokenString = token.split(" ")[1];

  jwt.verify(tokenString, process.env.JWT_Secret_Key, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
