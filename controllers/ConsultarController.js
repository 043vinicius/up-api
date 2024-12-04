const Consulta = require("../models/Consultar");

class ConsultaController {

    /**
     * Retorna todas as consultas
     * @param {*} req 
     * @param {*} res 
     */
    async index(req, res) {
        try {
            const consultas = await Consulta.findAll();
            res.status(200).json({
                status: true,
                consultas,
            });
        } catch (error) {
            console.error("Erro ao buscar consultas:", error);
            res.status(500).json({ err: "Erro interno ao buscar consultas" });
        }
    }

    /**
     * Cria uma nova consulta
     * @param {*} req 
     * @param {*} res 
     */
    async create(req, res) {
        const { data, Medico_id, Paciente_id, descricao } = req.body;

        if (!data || !Medico_id || !Paciente_id || !descricao) {
            return res.status(400).json({ err: "Todos os campos são obrigatórios!" });
        }

        try {
            await Consulta.new(data, Medico_id, Paciente_id, descricao);

            res.status(201).json({
                status: true,
                consulta: {
                    data,
                    Medico_id,
                    Paciente_id,
                    descricao
                },
                message: "Consulta registrada com sucesso!"
            });
        } catch (error) {
            console.error("Erro ao criar consulta:", error);
            res.status(500).json({ err: "Erro interno ao criar consulta" });
        }
    }

    /**
     * Atualiza uma consulta existente
     * @param {*} req 
     * @param {*} res 
     */
    async update(req, res) {
        const { id } = req.params;
        const { data, Medico_id, Paciente_id, descricao } = req.body;

        if (!data && !Medico_id && !Paciente_id && !descricao) {
            return res.status(400).json({ err: "Pelo menos um campo deve ser fornecido para atualização!" });
        }

        try {
            const consulta = await Consulta.findById(id);
            if (!consulta) {
                return res.status(404).json({ err: "Consulta não encontrada!" });
            }

            const updatedData = {};
            if (data) updatedData.data = data;
            if (Medico_id) updatedData.Medico_id = Medico_id;
            if (Paciente_id) updatedData.Paciente_id = Paciente_id;
            if (descricao) updatedData.descricao = descricao;

            await Consulta.update(id, updatedData);

            res.status(200).json({
                status: true,
                consulta: updatedData,
                message: "Consulta atualizada com sucesso!"
            });
        } catch (error) {
            console.error("Erro ao atualizar consulta:", error);
            res.status(500).json({ err: "Erro interno ao atualizar consulta" });
        }
    }

    /**
     * Exclui uma consulta existente
     * @param {*} req 
     * @param {*} res 
     */
    async delete(req, res) {
        const { id } = req.params;

        try {
            const consulta = await Consulta.findById(id);
            if (!consulta) {
                return res.status(404).json({ err: "Consulta não encontrada!" });
            }

            await Consulta.delete(id);

            res.status(200).json({
                status: true,
                message: "Consulta deletada com sucesso!"
            });
        } catch (error) {
            console.error("Erro ao excluir consulta:", error);
            res.status(500).json({ err: "Erro interno ao excluir consulta" });
        }
    }
}

module.exports = new ConsultaController();
