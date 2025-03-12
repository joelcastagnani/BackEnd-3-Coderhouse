import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";
import { destroyById } from "../../src/services/users.service.js";
import { connect } from "mongoose";

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

describe("Testing Auth Module", () => {
  before(async () => connect(process.env.MONGO_LINK));
  const user = {
    email: "coder@coder.com",
    password: "1234",
    username: "joeleelcapo"
  };

  let userId;

  it("POST api/auth/register should respond with success and 201 code", async () => {
    const response = await requester.post("/auth/register").send(user);
    const { status, _body, headers } = response;
    console.log({status, _body, headers});
    expect(status).to.equal(201);
    userId = _body.response;
    await destroyById(userId);
  });
  
});
