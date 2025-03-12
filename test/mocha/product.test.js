import assert from "assert";
import { create } from "../../src/services/products.service.js";
import { connect } from "mongoose";

describe("Testing Products Service", function () {
  before(async () => {
    await connect(
      "mongodb+srv://jcastagnani:backend123@backend-coderhouse.5lryv.mongodb.net/backend3-dev"
    );
  });
  it("Create product. Should return a product ID", async function () {
    const data = { name: "zapatilla" };
    const product = await create(data);
    assert.ok(product._id);
  });
});
