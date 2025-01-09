import express, { response } from "express";
import dbConnect from "./src/utils/dbConnect.util.js";
import argsUtils from "./src/utils/args.utils.js";
import router from "./src/routers/index.router.js";

const server = express();
const port = argsUtils.port || 8080;
const ready = async () => {
  const mode = argsUtils.mode;
  console.log("Server corriendo en  modo " + mode);
  console.log("Server corriendo en puerto " + port);
  await dbConnect();
};

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api", router);
server.listen(port, ready);
