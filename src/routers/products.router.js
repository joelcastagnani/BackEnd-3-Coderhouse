import { Router } from "express";
import {
  createMockProduct,
  createMockProducts,
  createProduct,
  readProducts,
  readOneProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import isAdmin from "../middlewares/isAdmin.mid.js";

const productsRouter = Router();

productsRouter.post("/", isAdmin, createProduct);
productsRouter.get("/mocks", isAdmin, createMockProduct);
productsRouter.get("/mocks/:quantity", isAdmin, createMockProducts);
productsRouter.get("/", readProducts);
productsRouter.get("/:pid", readOneProduct);
productsRouter.put("/:pid", isAdmin, updateProduct);
productsRouter.delete("/:pid", isAdmin, deleteProduct);

export default productsRouter;
