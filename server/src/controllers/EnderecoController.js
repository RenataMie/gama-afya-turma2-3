const Endereco= require("../models/Endereco");
const Cliente = require("../models/Cliente");

module.exports = {

    async index(req, res) {
        const {cliente_id} = req.params;

        const cliente = await Cliente.findByPk(cliente_id, {
            include: {association: "endereco"}
        });

        return res.json(cliente);
    },

    async store(req, res) {
        const {cliente_id} = req.params;
        const { cep, logradouro, numero, bairro, cidade, uf} = req.body;

        const cliente = await Cliente.findByPk(cliente_id);
    

        if(!cliente) {
            return res.status(400).json({error: "cliente nao encontrado"});
        }

        const endereco = await Endereco.create({cep, logradouro, numero, bairro, cidade, uf, cliente_id});

        return res.json(endereco);

    }
};