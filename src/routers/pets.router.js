import { Router } from "express";
import { createMockPet, createMockPets, createPet, readPets, readOnePet } from "../controllers/pets.controller.js";
// import isAdmin from "../middlewares/isAdmin.mid.js";

const petsRouter = Router();

petsRouter.post("/", createPet);
petsRouter.get("/mocks", createMockPet);
petsRouter.get("/mocks/:quantity", createMockPets);
petsRouter.get("/", readPets);
petsRouter.get("/:pid", readOnePet);

export default petsRouter;
