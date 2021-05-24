const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Cliente = require("../models/Cliente");
const Endereco= require("../models/Endereco");

const connection = new Sequelize(dbConfig);

Cliente.init(connection);
Endereco.init(connection);

Cliente.associate(connection.models);
Endereco.associate(connection.models);

module.exports = connection;