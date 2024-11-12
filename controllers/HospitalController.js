const jwt = require("jsonwebtoken");
const secret = "medconnect2024!";
const bcrypt = require("bcrypt");
const Hospital = require("../models/Hospital");

class HospitalController {

    /**
     * @param {*} req 
     * @param {*} res 
     */
    async index(req, res) {
        const hospital = await Hospital.findAll();
        res.json({
            status: true,
            hospital
        });
    }

    /**
     * @param {*} req
     * @param {*} res
     * @return {Object} 
     */
    async create(req, res) {
        const { nome, endereco, telefone, email, cnpj, senha } = req.body;

        if (!email || !nome || !endereco || !telefone || !cnpj || !senha) {
            return res.status(400).json({ err: "Todos os campos são obrigatórios!" });
        }

        try {
            const emailExists = await Hospital.findEmail(email);
            if (emailExists) {
                return res.status(406).json({ err: "O e-mail já está cadastrado!" });
            }

            await Hospital.new(nome, endereco, telefone, email, cnpj, senha);

            res.status(200).json({
                status: true,
                hospital: {
                    nome,
                    endereco,
                    telefone,
                    email,
                    cnpj
                },
                message: "Hospital registrado com sucesso!"
            });

        } catch (error) {
            console.log("Erro ao criar o hospital:", error);
            res.status(500).json({ err: "Erro interno ao criar o hospital" });
        }
    }

    /**
     * @param {*} req 
     * @param {*} res 
     */
    async update(req, res) {
        const { id } = req.params;
        const { nome, endereco, telefone, email, cnpj, senha } = req.body;

        if (!nome && !endereco && !telefone && !email && !cnpj && !senha) {
            return res.status(400).json({ err: "Pelo menos um campo deve ser fornecido para atualização!" });
        }

        try {
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                return res.status(404).json({ err: "Hospital não encontrado!" });
            }

            const updatedData = {};
            if (nome) updatedData.nome = nome;
            if (endereco) updatedData.endereco = endereco;
            if (telefone) updatedData.telefone = telefone;
            if (email) updatedData.email = email;
            if (cnpj) updatedData.cnpj = cnpj;
            if (senha) {
                updatedData.senha = await bcrypt.hash(senha, 10);
            }

            await Hospital.update(id, updatedData);

            res.status(200).json({
                status: true,
                hospital: updatedData,
                message: "Hospital atualizado com sucesso!"
            });

        } catch (error) {
            console.log("Erro ao atualizar o hospital:", error);
            res.status(500).json({ err: "Erro interno ao atualizar o hospital" });
        }
    }

    /**
     * @param {*} req 
     * @param {*} res 
     */
    async delete(req, res) {
        const { id } = req.params;

        try {
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                return res.status(404).json({ err: "Hospital não encontrado!" });
            }

            await Hospital.delete(id);

            res.status(200).json({
                status: true,
                message: "Hospital excluído com sucesso!"
            });
        } catch (error) {
            console.log("Erro ao excluir o hospital:", error);
            res.status(500).json({ err: "Erro interno ao excluir o hospital" });
        }
    }
}

module.exports = new HospitalController();
