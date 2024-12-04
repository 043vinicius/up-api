const knex = require("../database/connection");

class Consulta {

    // Retorna todas as consultas com informações do médico e paciente
    async findAll() {
        try {
            const result = await knex
                .select([
                    "consulta.id",
                    "consulta.data",
                    "consulta.descricao",
                    "medico.nome as medico_nome",
                    "paciente.nome as paciente_nome"
                ])
                .from("consulta")
                .innerJoin("medico", "consulta.Medico_id", "medico.id")
                .innerJoin("paciente", "consulta.Paciente_id", "paciente.id");

            return result;
        } catch (err) {
            console.error("Erro ao buscar consultas:", err);
            return [];
        }
    }

    // Busca uma consulta específica por ID
    async findById(id) {
        try {
            const result = await knex
                .select([
                    "consulta.id",
                    "consulta.data",
                    "consulta.descricao",
                    "medico.nome as medico_nome",
                    "paciente.nome as paciente_nome"
                ])
                .from("consulta")
                .where("consulta.id", id)
                .innerJoin("medico", "consulta.Medico_id", "medico.id")
                .innerJoin("paciente", "consulta.Paciente_id", "paciente.id")
                .first();

            return result;
        } catch (err) {
            console.error("Erro ao buscar consulta por ID:", err);
            return undefined;
        }
    }

    // Cria uma nova consulta
    async new(data, Medico_id, Paciente_id, descricao) {
        try {
            const result = await knex("consulta").insert({
                data,
                Medico_id,
                Paciente_id,
                descricao
            });

            return result;
        } catch (err) {
            console.error("Erro ao criar consulta:", err);
            return undefined;
        }
    }

    // Atualiza uma consulta existente
    async update(id, { data, Medico_id, Paciente_id, descricao }) {
        try {
            const dataToUpdate = { data, Medico_id, Paciente_id, descricao };
            await knex("consulta").where({ id }).update(dataToUpdate);
            return true;
        } catch (err) {
            console.error("Erro ao atualizar consulta:", err);
            return false;
        }
    }

    // Exclui uma consulta por ID
    async delete(id) {
        try {
            const result = await knex("consulta").where({ id }).del();
            return result;
        } catch (err) {
            console.error("Erro ao excluir consulta:", err);
            return undefined;
        }
    }

}

module.exports = new Consulta();
