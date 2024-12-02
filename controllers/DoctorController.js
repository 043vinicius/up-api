const Doctor = require("../models/Doctor");

class DoctorController {

    /**
     * @param {*} req 
     * @param {*} res 
     */
    async index(req, res) {
        const doctor = await Doctor.findAll();
        res.status(200).json({
            status: true,
            doctor,
        });
    }

    /**
     * @param {*} req
     * @param {*} res
     * @return {Object} 
     */
    async create(req, res) {
        const { nome, crm, telefone, email, especialidade } = req.body;

        if (!email || !nome || !crm || !telefone || !especialidade) {
            return res.status(400).json({ err: "Todos os campos são obrigatórios!" });
        }

        try {
            const emailExists = await Doctor.findEmail(email);  
            if (emailExists) {
                return res.status(409).json({ err: "O e-mail já está cadastrado!" });
            }

            await Doctor.new(nome, crm, telefone, email, especialidade);

            res.status(200).json({
                status: true,
                doctor: {
                    nomeCompleto,
                    crm,
                    telefone,
                    email,
                    especialidade,
                },
                message: "Doctor registrado com sucesso!"
            });

        } catch (error) {
            console.log("Erro ao criar o doctor:", error);
            res.status(500).json({ err: "Erro interno ao criar o doctor" });
        }
    }

    /**
     * @param {*} req 
     * @param {*} res 
     */
    async update(req, res) {
        const { id } = req.params;
        const { nome, crm, telefone, email, especialidade } = req.body;

        if (!nome && !crm && !telefone && !email && !especialidade) {
            return res.status(400).json({ err: "Pelo menos um campo deve ser fornecido para atualização!" });
        }

        try {
            const doctor = await Doctor.findById(id);
            if (!doctor) {
                return res.status(404).json({ err: "Doctor não encontrado!" });
            }

            const updatedData = {};
            if (nome) updatedData.nome = nome;
            if (crm) updatedData.crm = crm;
            if (telefone) updatedData.telefone = telefone;
            if (email) updatedData.email = email;
            if (especialidade) updatedData.especialidade = especialidade;

            await Doctor.update(id, updatedData);

            res.status(200).json({
                status: true,
                doctor: updatedData,
                message: "Doctor atualizado com sucesso!"
            });

        } catch (error) {
            console.log("Erro ao atualizar o doctor:", error);
            res.status(500).json({ err: "Erro interno ao atualizar o doctor" });
        }
    }

    /**
     * @param {*} req 
     * @param {*} res 
     */
    async delete(req, res) {
        const { id } = req.params;

        try {
            const doctor = await Doctor.findById(id);
            if (!doctor) {
                return res.status(404).json({ err: "Doctor não encontrado!" });
            }

            await Doctor.delete(id);

            res.status(200).json({
                status: true,
                message: "Doctor deletado com sucesso!"
            });
        } catch (error) {
            console.log("Erro ao excluir o doctor:", error);
            res.status(500).json({ err: "Erro interno ao excluir o doctor" });
        }
    }
}

module.exports = new DoctorController();
