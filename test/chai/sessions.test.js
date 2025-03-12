import { expect } from "chai";
import {
  registerService,
  loginService,
} from "../../src/services/sessions.service.js";
import { connect } from "mongoose";
import User from "../../src/dao/models/user.model.js";


describe("Sessions Testing", () => {
  before(async () => {
    await connect(
      "mongodb+srv://jcastagnani:backend123@backend-coderhouse.5lryv.mongodb.net/backend3-dev"
    );
  });
  it("Should return a user object with an _id property", async () => {
    const data = {
      email: "jc@hot.com",
      password: "hola1234",
    };
    const user = await registerService(data);
    expect(user).to.have.property("_id");
    await User.findByIdAndDelete(user._id);
  });
});
