const knex = require("../database/connection");

class Doctor {

    async findAll() {
        try {
            const result = await knex.select(["id", "nomeCompleto", "crm", "telefone", "email", "especialidade"]).table("Doctor");
            return result;
        } catch (err) {
            console.log(err);
            return [];
        }
    }


    async findById(id) {
        try {
            return await knex("Doctor").where({ id }).first();
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    async new(nomeCompleto, crm, telefone, email, especialidade) {
        try {
            return await knex('Doctor').insert({ nomeCompleto, crm, telefone, email, especialidade });
        } catch (err) {
            console.log("Erro ao inserir no banco:", err);
        }
    }

    async update(id, { nomeCompleto, crm, telefone, email, especialidade }) {
        try {
            const dataToUpdate = { nomeCompleto, crm, telefone, email, especialidade };
            await knex("Doctor").where({ id }).update(dataToUpdate);
            return true;
        } catch (err) {
            console.error("Erro ao atualizar doctor:", err);
            return false;
        }
    }

    async delete(id) {
        try {
            const result = await knex("Doctor").where({ id }).del();
            return result;
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    async findEmail(email) {
        try {
            const result = await knex.select("*").from("Doctor").where({ email: email });

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

module.exports = new Doctor();