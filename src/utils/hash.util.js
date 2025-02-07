import { genSaltSync, hashSync, compareSync } from "bcrypt";

function createHashUtils(password) {
  const salt = genSaltSync(10);
  const hashPassword = hashSync(password, salt);
  return hashPassword;
}

function verifyHashUtils(password, dbPass) {
  const verify = compareSync(password, dbPass);
  return verify;
}

export { createHashUtils, verifyHashUtils };
