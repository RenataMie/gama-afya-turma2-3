const { update } = require("../models/Cliente");
const Cliente= require("../models/Cliente");

module.exports = {


    async showId(req,res) {
        const cliente = await Cliente.findOne({
            where: {},
            order: [ [ 'id', 'DESC' ]],
        }).then(res => res.id);
        return res.json(cliente);
    },

    async index(req, res) {
        const cliente = await Cliente.findAll();

        return res.json(cliente);
    },

    async store(req, res) {
        const { nome, cpf, tel, celular, email} = req.body;

        const cliente = await Cliente.create({nome, cpf, tel, celular, email});

        return res.json(cliente);

    },

    async update(req, res) {
       const {id} = req.params;
        const { nome, cpf, tel, celular, email} = req.body;
         
        
         const cliente = await Cliente.update({nome, cpf, tel, celular, email}, {where:{id}})
         .then(function(rowsUpdated) {
             res.json(rowsUpdated)
         })
         
    },

    async delete(req, res) {
        const {id} = req.params;
         
          const cliente = await Cliente.destroy({where:{id}})

          return res.json(cliente);
          
     }
};