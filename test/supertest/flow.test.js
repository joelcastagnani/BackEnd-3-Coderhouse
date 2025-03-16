import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";
import { destroyById } from "../../src/services/users.service.js";
import { connect } from "mongoose";

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

describe("Testing login, CRUD, Signout - FLOW", () => {
  let cookies;
  let productId;
  it("POST api/auth/login should respond with 200 status code", async () => {
    const { status, headers } = await requester.post("/auth/login").send({
      email: "admin@admin.com",
      password: "1234",
    });
    cookies = headers["set-cookie"];
    expect(status).to.equal(200);
  });
  it("POST api/products should respond with a new product", async () => {
    const { _body } = await requester
      .post("/products")
      .set("Cookie", cookies)
      .send({ name: "producto de prueva" });
    productId = _body.response._id;
    expect(_body.response).to.be.an("object");
    expect(_body.response).to.have.property("stock");
    expect(_body.response.stock).to.be.a("number");
    expect(_body.response).to.have.property("price");
    expect(_body.response.price).to.be.a("number");
    expect(_body.response).to.have.property("category");
    expect(_body.response.category).to.be.a("string");
    expect(_body.response).to.have.property("image");
    expect(_body.response.image).to.be.a("string");
  });
  it("GET api/products/:pid should respond with 'Read!'", async () => {
    const { _body } = await requester.get("/products/" + productId);
    expect(_body.message).to.equal("Read!");
  });
  it("PUT api/products/:pid should respond with a diferent product", async () => {
    const { _body } = await requester.get(`/products/${productId}`);
    const oldStock = _body.response.stock;
    const { _body: _body2 } = await requester
      .put("/products/" + productId)
      .send({ stock: 200 })
      .set("Cookie", cookies);
    const newStock = _body2.response.stock;
    expect(oldStock).not.to.equal(newStock);
  });
  it("DELETE api/products/:pid should destroy a product", async () => {
    await requester.delete(`/products/${productId}`).set("Cookie", cookies);
    const { status } = await requester.get(`/products/${productId}`);
    expect(status).to.equal(404);
  });
  it("POST api/auth/signout should respond with 200 status code", async () => {
    const { status } = await requester
      .post("/auth/signout")
      .set("Cookie", cookies);
    expect(status).to.equal(200);
  });
});
