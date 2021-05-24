const Cliente= require("../models/Cliente");

module.exports = {

    async index(req, res) {
        const cliente = await Cliente.findAll();

        return res.json(cliente);
    },

    async store(req, res) {
        const { nome, cpf, tel, celular, email} = req.body;

        const cliente = await Cliente.create({nome, cpf, tel, celular, email});

        return res.json(cliente);

    }
};