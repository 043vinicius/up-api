const knex = require("../database/connection");
const bcrypt = require("bcrypt");

class Hospital {

    async findAll() {
        try {
            const result = await knex.select(["id", "nome", "endereco", "telefone", "email", "cnpj"]).table("Hospital");
            return result;
        } catch (err) {
            console.log(err);
            return [];
        }
    }


    async findById(id) {
        try {
            return await knex("Hospital").where({ id }).first();
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    async new(nome, endereco, telefone, email, cnpj, senha) {
        try {
            const hash = await bcrypt.hash(senha, 10);
            return await knex('Hospital').insert({ nome, endereco, telefone, email, cnpj, senha: hash });
        } catch (err) {
            console.log("Erro ao inserir no banco:", err);
        }
    }

    async update(id, { nome, endereco, telefone, email, cnpj, senha }) {
        try {
            const dataToUpdate = { nome, endereco, telefone, email, cnpj };

            if (senha) {
                dataToUpdate.senha = await bcrypt.hash(senha, 10);
            }

            await knex("Hospital").where({ id }).update(dataToUpdate);
            return true;
        } catch (err) {
            console.error("Erro ao atualizar hospital:", err);
            return false;
        }
    }

    async delete(id) {
        try {
            const result = await knex("Hospital").where({ id }).del();
            return result;
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    async findEmail(email) {
        try {
            const result = await knex.select("*").from("Hospital").where({ email: email });

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

module.exports = new Hospital();