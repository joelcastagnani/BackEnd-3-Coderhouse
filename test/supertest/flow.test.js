// import "dotenv/config.js";
// import { expect } from "chai";
// import supertest from "supertest";
// import { destroyById } from "../../src/services/users.service.js";
// import { connect } from "mongoose";

// const requester = supertest(`http://localhost:${process.env.PORT}/api`);

// describe("Testing login, CRUD, Signout - FLOW", () => {
//   let cookies;
//   it("POST api/auth/login should respond with 200 status code", async () => {
//     const { status, headers } = (await requester.post("/auth/login")).send({
//       email: "admin@admin.com",
//       password: "1234",
//     });
//     cookies = header["set-cookie"];
//     expect(status).to.equal(200);
//   });
//   it("POST api/products should respond with 201 status code", async () => {});
//   it("GET api/products/:pid should respond with 200 status code", async () => {});
//   it("PUT api/products?:pid should respond with 200 status code", async () => {});
//   it("DELETE api/products/:pid should respond with 200 status code", async () => {});
//   it("POST api/auth/signout should respond with 200 status code", async () => {
//     const { status } = await requester
//       .post("/auth/signout")
//       .set("Cookie", cookies);
//     expect(status).to.equal(200);
//   });
// });
