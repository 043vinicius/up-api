const Doctor = require("../models/Doctor");

class DoctorController {
    /**
     * Lista todos os médicos.
     * @param {Request} req 
     * @param {Response} res 
     */
    async index(req, res) {
        try {
            const doctors = await Doctor.findAll();
            res.status(200).json({
                status: true,
                doctors,
            });
        } catch (error) {
            console.error("Erro ao listar os médicos:", error);
            res.status(500).json({ error: "Erro ao listar os médicos" });
        }
    }

    /**
     * Cria um novo médico.
     * @param {Request} req 
     * @param {Response} res 
     */
    async create(req, res) {
        const { nome, crm, especialidade, hospital_id } = req.body;

        if (!nome || !crm || !especialidade) {
            return res.status(400).json({ error: "Todos os campos obrigatórios devem ser preenchidos!" });
        }

        try {
            const doctor = await Doctor.new(nome, crm, especialidade, hospital_id);
            if (!doctor) {
                return res.status(400).json({ error: "Erro ao criar o médico. Verifique os dados e tente novamente." });
            }
            res.status(201).json({
                status: true,
                doctor,
                message: "Médico registrado com sucesso!",
            });
        } catch (error) {
            console.error("Erro ao criar o médico:", error);
            res.status(500).json({ error: "Erro interno ao criar o médico" });
        }
    }

    /**
     * Atualiza informações de um médico.
     * @param {Request} req 
     * @param {Response} res 
     */
    async update(req, res) {
        const { id } = req.params;
        const { nome, crm, especialidade, hospital_id } = req.body;

        // Verifica se pelo menos um campo para atualização foi fornecido
        if (!nome && !crm && !especialidade && !hospital_id) {
            return res.status(400).json({ error: "Pelo menos um campo deve ser fornecido para atualização!" });
        }

        try {
            const doctor = await Doctor.findById(id);
            if (!doctor) {
                return res.status(404).json({ error: "Médico não encontrado!" });
            }

            const updatedData = { nome, crm, especialidade, hospital_id };
            // Remove campos que são undefined ou null para evitar atualizações desnecessárias
            Object.keys(updatedData).forEach(key => {
                if (updatedData[key] === undefined || updatedData[key] === null) {
                    delete updatedData[key];
                }
            });

            await Doctor.update(id, updatedData);

            res.status(200).json({
                status: true,
                doctor: { id, ...updatedData },
                message: "Médico atualizado com sucesso!",
            });
        } catch (error) {
            console.error("Erro ao atualizar o médico:", error);
            res.status(500).json({ error: "Erro interno ao atualizar o médico" });
        }
    }

    /**
     * Deleta um médico.
     * @param {Request} req 
     * @param {Response} res 
     */
    async delete(req, res) {
        const { id } = req.params;

        try {
            const doctor = await Doctor.findById(id);
            if (!doctor) {
                return res.status(404).json({ error: "Médico não encontrado!" });
            }

            await Doctor.delete(id);

            res.status(200).json({
                status: true,
                message: "Médico deletado com sucesso!",
            });
        } catch (error) {
            console.error("Erro ao excluir o médico:", error);
            res.status(500).json({ error: "Erro interno ao excluir o médico" });
        }
    }
}

module.exports = new DoctorController();
