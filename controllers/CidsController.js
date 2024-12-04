const Cids = require("../models/Cids");

class CidsController {

    /**
     * @param {*} req 
     * @param {*} res 
     */
    async index(req, res) {
        const cids = await Cids.findAll();
        res.status(200).json({
            status: true,
            cids,
        });
    }

    /**
     * @param {*} req
     * @param {*} res
     * @return {Object} 
     */
    async create(req, res) {
        const { nome, cod, descricao } = req.body;

        if (!nome || !cod || !descricao) {
            return res.status(400).json({ err: "Todos os campos são obrigatórios!" });
        }

        try {
            await Cids.new(nome, cod, descricao);

            res.status(200).json({
                status: true,
                Cids: {
                    nome,
                    cod,
                    descricao
                },
                message: "Cid registrado com sucesso!"
            });

        } catch (error) {
            console.log("Erro ao criar o Cid:", error);
            res.status(500).json({ err: "Erro interno ao criar o Cid" });
        }
    }

    /**
     * @param {*} req 
     * @param {*} res 
     */
    async update(req, res) {
        const { id } = req.params;
        const { nome, cod, descricao } = req.body;

        if (!nome && !cod && !descricao) {
            return res.status(400).json({ err: "Pelo menos um campo deve ser fornecido para atualização!" });
        }

        try {
            const cids = await Cids.findById(id);
            if (!cids) {
                return res.status(404).json({ err: "Cid não encontrado!" });
            }

            const updatedData = {};
            if (nome) updatedData.nome = nome;
            if (cod) updatedData.cod = cod;
            if (descricao) updatedData.descricao = descricao;

            await Cids.update(id, updatedData);

            res.status(200).json({
                status: true,
                cids: updatedData,
                message: "Cid atualizado com sucesso!"
            });

        } catch (error) {
            console.log("Erro ao atualizar o Cid:", error);
            res.status(500).json({ err: "Erro interno ao atualizar o Cid" });
        }
    }

    /**
     * @param {*} req 
     * @param {*} res 
     */
    async delete(req, res) {
        const { id } = req.params;

        try {
            const cids = await Cids.findById(id);
            if (!cids) {
                return res.status(404).json({ err: "Cids não encontrado!" });
            }

            await Cids.delete(id);

            res.status(200).json({
                status: true,
                message: "Cid deletado com sucesso!"
            });
        } catch (error) {
            console.log("Erro ao excluir o Cid:", error);
            res.status(500).json({ err: "Erro interno ao excluir o Cid" });
        }
    }
}

module.exports = new CidsController();
