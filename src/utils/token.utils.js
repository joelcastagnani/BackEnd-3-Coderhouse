import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined in environment variables.");
}

function createTokenUtil(data) {
  return jwt.sign(data, SECRET_KEY, { expiresIn: 60 * 60 * 24 * 7 }); // Expira en 7 días
}

function verifyTokenUtil(token) {
  try {
    const verifyData = jwt.verify(token, SECRET_KEY);
    return verifyData;
  } catch (error) {
    throw new Error("Invalid or expired token.");
  }
}

export { createTokenUtil, verifyTokenUtil };
