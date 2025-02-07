import Pet from "../dao/models/pet.model.js";
import {
  create,
  createMock,
  createMocks,
  read,
} from "../services/pets.service.js";
import CustomError from "../utils/errors/custom.error.js";
import { notFound } from "../utils/errors/dictionary.error.js";

const createPet = async (req, res, next) => {
  try {
    const data = req.body;
    const one = await create(data);
    return res.status(201).json({ message: "Created!", response: one });
  } catch (error) {
    next(error);
  }
};
const readOnePet = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await Pet.findById(pid);
    if (one) {
      return res.status(200).json({ message: "Read!", response: one });
    } else {
      CustomError.new(notFound);
    }
  } catch (error) {
    next(error);
  }
};
const readPets = async (req, res, next) => {
  try {
    const { page } = req.query;
    const all = await read(page);
    if (all.docs.length > 0) {
      return res.status(200).json({ message: "Read!", response: all });
    } else {
      CustomError.new(notFound);
    }
  } catch (error) {
    next(error);
  }
};
const createMockPet = async (req, res, next) => {
  try {
    const one = await createMock();
    return res.status(201).json({ message: "Created!", response: one });
  } catch (error) {
    next(error);
  }
};
const createMockPets = async (req, res, next) => {
  try {
    const { quantity } = req.params;
    const pets = await createMocks(quantity);
    return res.status(201).json({ message: "Created!", response: pets });
  } catch (error) {
    next(error);
  }
};

export { createPet, readPets, createMockPet, createMockPets, readOnePet };
