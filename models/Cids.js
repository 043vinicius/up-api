const knex = require("../database/connection");

class Cids {

    async findAll() {
        try {
            const result = await knex.select(["id", "nome", "cod", "descricao"]).table("Cids");
            return result;
        } catch (err) {
            console.log(err);
            return [];
        }
    }


    async findById(id) {
        try {
            return await knex("Cids").where({ id }).first();
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    async new(nome, cod, descricao) {
        try {
            return await knex('Cids').insert({ nome, cod, descricao });
        } catch (err) {
            console.log("Erro ao inserir no banco:", err);
        }
    }

    async update(id, { nome, cod, descricao }) {
        try {
            const dataToUpdate = { nome, cod, descricao };

            await knex("Cids").where({ id }).update(dataToUpdate);
            return true;
        } catch (err) {
            console.error("Erro ao atualizar Cids:", err);
            return false;
        }
    }

    async delete(id) {
        try {
            const result = await knex("Cids").where({ id }).del();
            return result;
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

}

module.exports = new Cids();