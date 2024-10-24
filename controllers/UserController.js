const User = require("../models/User");
const jwt = require("jsonwebtoken");

const secret = "medconnect2024!";
const bcrypt = require("bcrypt");


class UserController {
    async index(req, res) {
        const users = await User.findAll();
        res.json({
            status: true,
            users
        });
    }

    async create(req, res) {
        const { email, name, password } = req.body;

        if (email == undefined) {
            res.status(400);
            res.json({ err: "O e-mail é inválido!" })
            return;
        }

        const emailExists = await User.findEmail(email);

        if (emailExists) {
            res.status(406);
            res.json({ err: "O e-mail já está cadastrado!" })
            return;
        }


        await User.new(email, password, name);

        res.status(200);
        res.json({
            status: true,
            user: {
                name, email
            }
        });
    }

    async login(req, res) {
        const { email, password } = req.body;

        const user = await User.findByEmail(email);

        if (user != undefined) {

            const resultado = await bcrypt.compare(password, user.password);

            if (resultado) {
                const token = jwt.sign({ email: user.email }, secret);

                res.status(200);
                res.json({ token: token });

            } else {
                res.status(400);
                res.send("Senha incorreta");
            }

        } else {
            res.status(404);
            res.json({ status: false, message: "Usuário não encontrado" });

        }
    }

}

module.exports = new UserController();