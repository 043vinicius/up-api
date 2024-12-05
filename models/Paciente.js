const knex = require("../database/connection");

class Paciente {

    async findAll() {
        try {
            const result = await knex.select(["id", "nome", "endereco", "telefone", "email", "cpf"]).table("paciente");
            return result;
        } catch (err) {
            console.log(err);
            return [];
        }
    }


    async findById(id) {
        try {
            return await knex("Paciente").where({ id }).first();
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    async new(nome, endereco, telefone, email, cpf ) {
        try {
            return await knex('Paciente').insert({ nome, endereco, telefone, email, cpf});
        } catch (err) {
            console.log("Erro ao inserir no banco:", err);
        }
    }

    async update(id, { nome, endereco, telefone, email, cpf }) {
        try {
            const dataToUpdate = { nome, endereco, telefone, email, cpf };

            await knex("paciente").where({ id }).update(dataToUpdate);
            return true;
        } catch (err) {
            console.error("Erro ao atualizar paciente:", err);
            return false;
        }
    }

    async delete(id) {
        try {
            await knex("consulta").where({ paciente_id: id }).del();
            await knex("atestado").where({ paciente_id: id }).del();  
            const result = await knex("paciente").where({ id }).del();
            return result;
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    async findEmail(email) {
        try {
            const result = await knex.select("*").from("paciente").where({ email: email });

            if (result.length > 0) {
                return true;
            } else {
                return false;
            }

        } catch (err) {
            console.log(err);
            return false;
        }
    }

}

module.exports = new Paciente();