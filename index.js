const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const app = express();
const router = require("./routes/Routes");

// Configuração do Swagger
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API do MedConnect",
            version: "1.0.0",
            description: "",
        },
    },
    apis: ["./routes/routes.js"],
};

const swaggerSpec = swaggerJsdoc(options);

app.use("/documention", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", router);

app.listen(3000, () => {
    console.log("Servidor rodando");
});

module.exports = app;