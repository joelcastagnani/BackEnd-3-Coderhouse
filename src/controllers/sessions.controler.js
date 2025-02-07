import User from "../dao/models/user.model.js";
import { loginService, registerService } from "../services/sessions.service.js";
import CustomError from "../utils/errors/custom.error.js";
import { badAuth, forbidden } from "../utils/errors/dictionary.error.js";
import { createHashUtils, verifyHashUtils } from "../utils/hash.util.js";
import { createTokenUtil, verifyTokenUtil } from "../utils/token.utils.js";

const register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      CustomError.new(badAuth);
    }
    const one = await User.findOne({ email });
    if (one) {
      CustomError.new(badAuth);
    }
    const user = await registerService({ email, password, role });
    const message = "User Registered!";
    return res.status(201).json({ response: user._id, message });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    /* armar middleware para esta condicion areEmailAndPassword.mid.js */
    if (!email || !password) {
      CustomError.new(badAuth);
    }
    /* isUser */
    const one = await User.findOne({ email });
    if (!one) {
      CustomError.new(badAuth);
    }
    const token = await loginService({ password, one });
    const opts = { 
      maxAge: 60 * 60 * 24 * 7 * 1000, // 1 semana
      httpOnly: true, // Para evitar que el token sea accesible desde JavaScript
      secure: process.env.NODE_ENV === "production", // Solo habilitar en producción (si usas HTTPS)
      sameSite: "Strict" // Mejorar la seguridad de las cookies
    };
    
    const message = "User logged in!";
    return res
      .cookie("token", token, opts)
      .json({ response: one._id, message });
  } catch (error) {
    next(error);
  }
};
const signout = (req, res, next) => {
  try {
    const token = req?.cookies?.token;
    
    if (!token) {
      CustomError.new(badAuth); 
    }
    const verifyToken = verifyTokenUtil(token);
    if (!verifyToken) {
      CustomError.new(forbidden);
    }
    const message = "User signed out!";
    return res.clearCookie("token").json({ response: verifyToken.user_id, message });
  } catch (error) {
    next(error);
  }
};




export { register, login, signout };
