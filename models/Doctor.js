const knex = require("../database/connection");

class Doctor {

    async findAll() {
        try {
            const result = await knex.select(["id", "nomeCompleto", "crm", "especialidade"]).table("medico");
            return result;
        } catch (err) {
            console.log(err);
            return [];
        }
    }


    async findById(id) {
        try {
            return await knex("medico").where({ id }).first();
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    async new(nomeCompleto, crm, especialidade) {
        try {
            return await knex('medico').insert({ nomeCompleto, crm, especialidade });
        } catch (err) {
            console.log("Erro ao inserir no banco:", err);
        }
    }

    async update(id, { nomeCompleto, crm, especialidade }) {
        try {
            const dataToUpdate = { nomeCompleto, crm, especialidade };
            await knex("medico").where({ id }).update(dataToUpdate);
            return true;
        } catch (err) {
            console.error("Erro ao atualizar doctor:", err);
            return false;
        }
    }

    async delete(id) {
        try {
            const result = await knex("medico").where({ id }).del();
            return result;
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

}

module.exports = new Doctor();