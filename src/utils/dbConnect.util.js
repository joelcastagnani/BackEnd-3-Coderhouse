import { connect } from "mongoose";

async function dbConnect() {
  try {
    await connect(
      "mongodb+srv://jcastagnani:backend123@backend-coderhouse.5lryv.mongodb.net/backend3"
    );
    console.log(`Base de datos conectada.(dbConnect.util.js)`);
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;