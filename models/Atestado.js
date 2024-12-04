const knex = require("../database/connection");
const bcrypt = require("bcrypt");

class Atestado {

    async findAll() {
        try {
            const result = await knex
                .select([
                    "atestado.id",
                    "atestado.data",
                    "atestado.descricao",
                    "medico.nome as medico_nome",
                    "paciente.nome as paciente_nome",
                    "cids.nome as cid_nome"
                ])
                .from("atestado")
                .innerJoin("medico", "atestado.Medico_id", "medico.id")
                .innerJoin("paciente", "atestado.Paciente_id", "paciente.id")
                .innerJoin("cids", "atestado.Cids_id", "cids.id");

            return result;
        } catch (err) {
            console.log(err);
            return [];
        }
    }


    async findById(id) {
        try {
            return await knex("atestado").where({ id }).first();
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    async new(data, Medico_id, Paciente_id, Cids_id, descricao) {
        try {
            return await knex('atestado').insert({ data, Medico_id, Paciente_id, Cids_id, descricao });
        } catch (err) {
            console.log("Erro ao inserir no banco:", err);
        }
    }

    async update(id, { data, Medico_id, Paciente_id, Cids_id, descricao }) {
        try {
            const dataToUpdate = { data, Medico_id, Paciente_id, Cids_id, descricao };
            await knex("atestado").where({ id }).update(dataToUpdate);
            return true;
        } catch (err) {
            console.error("Erro ao atualizar atestado:", err);
            return false;
        }
    }

    async delete(id) {
        try {
            const result = await knex("atestado").where({ id }).del();
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

module.exports = new Atestado();