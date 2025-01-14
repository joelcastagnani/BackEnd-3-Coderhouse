import express, { response } from "express";
import dbConnect from "./src/utils/dbConnect.util.js";
import argsUtils from "./src/utils/args.utils.js";
import router from "./src/routers/index.router.js";
import env from "./src/utils/env.util.js";

const server = express();
const port = env.PORT || 8080;
const ready = async () => {
  const mode = argsUtils.mode;
  console.log(`Server corriendo en puerto ${port} en modo ${mode} (app.js)`);
  await dbConnect();
};

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api", router);
server.listen(port, ready);
