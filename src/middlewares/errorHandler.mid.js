import loggerUtil from "../utils/logger.util.js";

function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  const message = error.message || "FATAL ERROR";
  if (statusCode.toSting().starsWith("4")) {
    loggerUtil.WARN(message);
  } else {
    loggerUtil.FATAL(message);
  }
  return res.status(statusCode).json({ message });
}

export default errorHandler;
