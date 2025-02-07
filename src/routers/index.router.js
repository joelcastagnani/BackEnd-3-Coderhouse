import { Router } from "express";
import productsRouter from "./products.router.js";
import sessionsRouter from "./sessions.router.js";
import petsRouter from "./pets.router.js";

const router = Router();

router.use("/products", productsRouter);
router.use("/sessions", sessionsRouter);
router.use("/pets", petsRouter);

router.get("/simplex", (req, res) => {
  console.log("entro");
  let result = 0;
  for (let i = 1; i < 100; i++) {
    result += i;
  }
  return res.status(200).json({ result });
});
router.get("/complex", (req, res) => {
  let result = 0;
  for (let i = 1; i < 10000000; i++) {
    result += i;
  }
  return res.status(200).json({ result });
});
router.get("/test", (req, res) => {
  console.log("Ruta de prueba");
  res.send("Todo está bien");
});

export default router;
