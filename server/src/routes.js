const express = require("express");

const ClienteController = require("./controllers/ClienteController")
const EnderecoController = require("./controllers/EnderecoController");


const routes = express.Router();

routes.get("/clientes", ClienteController.index);
routes.post("/clientes", ClienteController.store);

routes.get("/clientes/:cliente_id/enderecos", EnderecoController.index);
routes.post("/clientes/:cliente_id/enderecos", EnderecoController.store);

module.exports = routes;