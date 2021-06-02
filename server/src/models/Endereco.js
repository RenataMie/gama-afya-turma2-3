const {Model, DataTypes} = require("sequelize");

class Endereco extends Model {
    //metodo padrao para conectar com a base
    static init(connection){
        super.init({
            cep: DataTypes.INTEGER,
            logradouro:DataTypes.STRING,
            numero:DataTypes.INTEGER,
            bairro:DataTypes.STRING,
            cidade:DataTypes.STRING,
            uf:DataTypes.STRING,
            

        }, { sequelize: connection})
    }
    static associate(models) {
        this.belongsTo(models.Cliente, {foreignKey: 'cliente_id', as: "last_insert_id()"})
    }

}

module.exports = Endereco;