const knex = require("../database/connection");

class Doctor {
    /**
     * Busca todos os médicos, incluindo o nome do hospital associado.
     * @returns {Promise<Array>} Lista de médicos com os nomes dos hospitais.
     */
    async findAll() {
        try {
            const doctors = await knex("medico")
                .select([
                    "medico.id",
                    "medico.nome",
                    "medico.crm",
                    "medico.especialidade",
                    "hospital.nome as nomeHospital",
                ])
                .join("hospital", "medico.hospital_id", "=", "hospital.id");
            return doctors;
        } catch (error) {
            console.error("Erro ao buscar médicos com hospitais:", error);
            return [];
        }
    }

    // Outras funções permanecem iguais...

    /**
     * Busca um médico pelo ID.
     * @param {number} id - ID do médico.
     * @returns {Promise<Object|undefined>} Médico encontrado ou undefined.
     */
    async findById(id) {
        try {
            const doctor = await knex("medico").where({ id }).first();
            return doctor;
        } catch (error) {
            console.error("Erro ao buscar médico pelo ID:", error);
            return undefined;
        }
    }

    /**
     * Cria um novo médico.
     * @param {string} nome - Nome completo do médico.
     * @param {string} crm - CRM do médico.
     * @param {string} especialidade - Especialidade do médico.
     * @param {number} hospital_id - ID do hospital associado.
     * @returns {Promise<number|undefined>} ID do médico criado.
     */
    async new(nome, crm, especialidade, hospital_id) {
        try {
            const [id] = await knex("medico").insert({
                nome,
                crm,
                especialidade,
                hospital_id,
            });
            return id;
        } catch (error) {
            console.error("Erro ao inserir no banco:", error);
            return undefined;
        }
    }

    /**
     * Atualiza os dados de um médico.
     * @param {number} id - ID do médico.
     * @param {Object} data - Dados para atualizar.
     * @param {string} [data.nome] - Novo nome completo.
     * @param {string} [data.crm] - Novo CRM.
     * @param {string} [data.especialidade] - Nova especialidade.
     * @param {number} [data.hospital_id] - Novo ID do hospital associado.
     * @returns {Promise<boolean>} Verdadeiro se a atualização foi bem-sucedida.
     */
    async update(id, { nome, crm, especialidade, hospital_id }) {
        try {
            const dataToUpdate = { nome, crm, especialidade, hospital_id };
            Object.keys(dataToUpdate).forEach(key => {
                if (!dataToUpdate[key]) delete dataToUpdate[key];
            });

            const updatedRows = await knex("medico").where({ id }).update(dataToUpdate);
            return updatedRows > 0;
        } catch (error) {
            console.error("Erro ao atualizar o médico:", error);
            return false;
        }
    }

    /**
     * Exclui um médico pelo ID.
     * @param {number} id - ID do médico.
     * @returns {Promise<boolean>} Verdadeiro se a exclusão foi bem-sucedida.
     */
    async delete(id) {
        try {
            await knex("consulta").where({ medico_id: id }).del();
            await knex("atestado").where({ medico_id: id }).del();
            const deletedRows = await knex("medico").where({ id }).del();
            return deletedRows > 0;
        } catch (error) {
            console.error("Erro ao deletar o médico:", error);
            return false;
        }
    }
}

module.exports = new Doctor();
