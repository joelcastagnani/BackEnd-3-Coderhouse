import Pet from "../dao/models/pet.model.js";
import { createMockPet } from "../utils/mocks.util.js";

const create = async (data) => {
  const one = await Pet.create(data);
  return one;
};
const read = async (page) => {
  const all = await Pet.paginate(
    {},
    { page, sort: { name: 1 }, select: "-createdAt -updatedAt -__v" }
  );
  return all;
};
const createMock = async () => {
  const data = createMockPet();
  const one = await Pet.create(data);
  return one;
};
const createMocks = async (quantity) => {
  const pets = [];
  for (let i = 0; i < quantity; i++) {
    const one = await createMock();
    pets.push(one);
  }
  return pets;
};

export { create, read, createMock, createMocks };
