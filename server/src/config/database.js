module.exports = {
    dialect: "mysql",
    host: "localhost",
    username:"root",
    password: null,
    database: "Desafio_gama",
    define: {
        //da horario de criacao/atualizacao de forma automatica
        timestamps: true,
        //escreve os nomes das bases/tabelas divididas por _
        underscored: true,
    }
};