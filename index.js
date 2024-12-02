const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cors = require('cors');
const app = express();
const router = require("./routes/routes");
const port = 3000
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

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

app.use("/Documentation", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", router);

app.use((req, res, next) => {
    console.log("Nova requisição realizada -> ", req.method, req.url);
    next();
});

app.listen(port, () => {
    console.log("Servidor rodando na porta:", port);
});

module.exports = app;