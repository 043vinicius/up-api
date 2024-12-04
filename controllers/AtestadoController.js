const Atestado = require("../models/Atestado");

class AtestadoController {

    /**
     * @param {*} req 
     * @param {*} res 
     */
    async index(req, res) {
        const atestado = await Atestado.findAll();
        res.status(200).json({
            status: true,
            atestado,
        });
    }

    /**
     * @param {*} req
     * @param {*} res
     * @return {Object} 
     */
    async create(req, res) {
        const { data, Medico_id, Paciente_id, Cids_id, descricao } = req.body;

        if (!data || !Medico_id || !Paciente_id || !Cids_id || !descricao) {
            return res.status(400).json({ err: "Todos os campos são obrigatórios!" });
        }

        try {

            await Atestado.new(data, Medico_id, Paciente_id, Cids_id, descricao);

            res.status(200).json({
                status: true,
                Atestado: {
                    data,
                    Medico_id,
                    Paciente_id,
                    Cids_id,
                    descricao
                },
                message: "Atestado registrado com sucesso!"
            });

        } catch (error) {
            console.log("Erro ao criar o Atestado:", error);
            res.status(500).json({ err: "Erro interno ao criar o Atestado" });
        }
    }

    /**
     * @param {*} req 
     * @param {*} res 
     */
    async update(req, res) {
        const { id } = req.params;
        const { data, Medico_id, Paciente_id, Cids_id, descricao } = req.body;

        if (!data && !Medico_id && !Paciente_id && !Cids_id && !descricao) {
            return res.status(400).json({ err: "Pelo menos um campo deve ser fornecido para atualização!" });
        }

        try {
            const atestado = await Atestado.findById(id);
            if (!atestado) {
                return res.status(404).json({ err: "Atestado não encontrado!" });
            }

            const updatedData = {};
            if (data) updatedData.data = data;
            if (Medico_id) updatedData.Medico_id = Medico_id;
            if (Paciente_id) updatedData.Paciente_id = Paciente_id;
            if (Cids_id) updatedData.Cids_id = Cids_id;
            if (descricao) updatedData.descricao = descricao;

            await Atestado.update(id, updatedData);

            res.status(200).json({
                status: true,
                atestado: updatedData,
                message: "Atestado atualizado com sucesso!"
            });

        } catch (error) {
            console.log("Erro ao atualizar o Atestado:", error);
            res.status(500).json({ err: "Erro interno ao atualizar o Atestado" });
        }
    }

    /**
     * @param {*} req 
     * @param {*} res 
     */
    async delete(req, res) {
        const { id } = req.params;

        try {
            const atestado = await Atestado.findById(id);
            if (!atestado) {
                return res.status(404).json({ err: "Atestado não encontrado!" });
            }

            await Atestado.delete(id);

            res.status(200).json({
                status: true,
                message: "Atestado deletado com sucesso!"
            });
        } catch (error) {
            console.log("Erro ao excluir o atestado:", error);
            res.status(500).json({ err: "Erro interno ao excluir o atestado" });
        }
    }
}

module.exports = new AtestadoController();
