import { faker } from "@faker-js/faker";

function createMockProduct() {
  const name = faker.commerce.productName();
  const description = faker.commerce.productDescription();
  const stock = faker.number.int({ min: 100, max: 2000, multipleOf: 50 });
  const price = faker.commerce.price({
    min: 100,
    max: 2000,
    dec: 2
  });
  const image = faker.image.urlLoremFlickr({ width: 500, height: 500 });
  const category = "";
  return { name, description, stock, price, image, category };
}
function createMockPet() {
  const name = faker.animal.dog();  
  const age = faker.number.int({ min: 1, max: 15 });
  const size = faker.helpers.arrayElement(["Small", "Medium", "Large"]); // Tamaño de la mascota
  const color = faker.color.human();
  const adopted = false; 
  const owner = null;

  return { name, age, size, color, adopted, owner };
}

export { createMockProduct, createMockPet };
