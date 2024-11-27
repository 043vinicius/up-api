const Paciente = require("../models/paciente");

class PacienteController {

    /**
     * @param {*} req 
     * @param {*} res 
     */
    async index(req, res) {
        const paciente = await Paciente.findAll();
        res.status(200).json({
            status: true,
            paciente,
        });
    }

    /**
     * @param {*} req
     * @param {*} res
     * @return {Object} 
     */
    async create(req, res) {
        const { nome, endereco, telefone, email, cpf} = req.body;

        if (!email || !nome || !endereco || !telefone || !cpf ) {
            return res.status(400).json({ err: "Todos os campos são obrigatórios!" });
        }

        try {
            const emailExists = await Paciente.findEmail(email);
            if (emailExists) {
                return res.status(409).json({ err: "O e-mail já está cadastrado!" });
            }

            await Paciente.new(nome, endereco, telefone, email, cpf);

            res.status(200).json({
                status: true,
                paciente: {
                    nome,
                    endereco,
                    telefone,
                    email,
                    cpf
                },
                message: "`paciente registrado com sucesso!"
            });

        } catch (error) {
            console.log("Erro ao criar o paciente:", error);
            res.status(500).json({ err: "Erro interno ao criar o paciente" });
        }
    }

    /**
     * @param {*} req 
     * @param {*} res 
     */
    async update(req, res) {
        const { id } = req.params;
        const { nome, endereco, telefone, email, cpf } = req.body;

        if (!nome && !endereco && !telefone && !email && !cpf ) {
            return res.status(400).json({ err: "Pelo menos um campo deve ser fornecido para atualização!" });
        }

        try {
            const paciente = await Paciente.findById(id);
            if (!paciente) {
                return res.status(404).json({ err: "paciente não encontrado!" });
            }

            const updatedData = {};
            if (nome) updatedData.nome = nome;
            if (endereco) updatedData.endereco = endereco;
            if (telefone) updatedData.telefone = telefone;
            if (email) updatedData.email = email;
            if (cnpj) updatedData.cpf = cpf;
            if (senha) {
                updatedData.senha = await bcrypt.hash(senha, 10);
            }

            await Paciente.update(id, updatedData);

            res.status(200).json({
                status: true,
                paciente: updatedData,
                message: "paciente atualizado com sucesso!"
            });

        } catch (error) {
            console.log("Erro ao atualizar o paciente:", error);
            res.status(500).json({ err: "Erro interno ao atualizar o paciente" });
        }
    }

    /**
     * @param {*} req 
     * @param {*} res 
     */
    async delete(req, res) {
        const { id } = req.params;

        try {
            const paciente = await Paciente.findById(id);
            if (!paciente) {
                return res.status(404).json({ err: "paciente não encontrado!" });
            }

            await Paciente.delete(id);

            res.status(200).json({
                status: true,
                message: "paciente deletado com sucesso!"
            });
        } catch (error) {
            console.log("Erro ao excluir o paciente:", error);
            res.status(500).json({ err: "Erro interno ao excluir o paciente" });
        }
    }
}

module.exports = new PacienteController();
