import express, { response } from "express";
import cluster from "cluster";
import { cpus } from "os";
import compression from "express-compression";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import {serve, setup} from "swagger-ui-express";
import dbConnect from "./src/utils/dbConnect.util.js";
import argsUtils from "./src/utils/args.utils.js";
import router from "./src/routers/index.router.js";
import env from "./src/utils/env.util.js";
import sessionsRouter from "./src/routers/sessions.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import loggerUtil from "./src/utils/logger.util.js";
import httpLogger from "./src/middlewares/httpLogger.mid.js";
import docSpec from "./src/utils/docSpec.util.js";

const server = express();
const port = env.PORT || 8080;
const ready = async () => {
  const mode = argsUtils.mode;
  loggerUtil.INFO(
    `Server corriendo en puerto ${port} en modo ${mode} (app.js)`
  );
  await dbConnect();
};

server.listen(port, ready);

// const isPrimary = cluster.isPrimary;
// const numberOfProcess = cpus().length;
// if (isPrimary) {
//   loggerUtil.INFO(`isPrimary: ${process.pid}`);
//   for (let i = 1; i <= numberOfProcess; i++) {
//     cluster.fork();
//   }
// } else {
//   loggerUtil.INFO(`isWorker: ${process.pid}`);
//   server.listen(port, ready);
// }

server.use(compression({ brotli: { enabled: true, zlib: {} } }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(httpLogger);

server.use(cookieParser());
server.use("/api/sessions", sessionsRouter);
server.use("/api", router);
server.use("/api/docs", serve, setup(docSpec));

server.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    error: message,
  });
});
server.use(errorHandler);
