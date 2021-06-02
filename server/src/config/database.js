require("dotenv/config");

module.exports = {
    dialect: "mysql",
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SCHEMA,
    define: {
        //da horario de criacao/atualizacao de forma automatica
        timestamps: true,
        //escreve os nomes das bases/tabelas divididas por _
        underscored: true,
    }
};