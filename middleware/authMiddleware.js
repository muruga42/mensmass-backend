const admin = require("firebase-admin");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split("Bearer ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = decodedToken;
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      error: error.message
    });
  }
};

module.exports = verifyToken;
