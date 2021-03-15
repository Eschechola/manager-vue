const express = require('express');

const cors = require('cors');

const router = require('./src/routes/Routes');

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(4000, ()=> {
    console.log("API Rodando em http://localhost:4000");
});

app.get('/', (request, response) => {
    response.send("Hello World!");
});