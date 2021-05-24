const {Model, DataTypes} = require("sequelize");

class Cliente extends Model {
    //metodo padrao para conectar com a base
    static init(connection){
        super.init({
            nome: DataTypes.STRING,
            cpf:DataTypes.STRING,
            tel:DataTypes.STRING,
            celular:DataTypes.STRING,
            email:DataTypes.STRING,
            
        }, { sequelize: connection})
    }
    static associate(models) {
        this.hasOne(models.Endereco, {foreignKey: 'cliente_id', as: "endereco"})
    }

}

module.exports = Cliente;