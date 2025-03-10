import swaggerJSDoc from "swagger-jsdoc";
import __dirname from "../../utils.js";

const opts = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "coder commerce",
            description: " documento descriptivo"
        },
    },
    apis: [__dirname + "/src/docs/*.yaml"],
};

const docSpec = swaggerJSDoc(opts);
export default docSpec