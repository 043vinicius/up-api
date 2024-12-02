const express = require("express")
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const HospitalController = require("../controllers/HospitalController");
const DoctorController = require("../controllers/DoctorController");
const AdminAuth = require("../middleware/AdminAuth");

router.get('/', HomeController.index);
router.get('/users', AdminAuth, UserController.index);
router.post('/user', UserController.create);
router.post("/login", UserController.login);

/**
 * @openapi
 * /hospital:
 *   get:
 *     tags:
 *       - Hospital
 *     description: "Lista todos os hospitais registrados no sistema."
 *     responses:
 *       200:
 *         description: "Lista de hospitais"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   endereco:
 *                     type: string
 *                   telefone:
 *                     type: string
 *                   email:
 *                     type: string
 *                   cnpj:
 *                     type: string
 */
router.get("/hospital", HospitalController.index);

/**
 * @openapi
 * /hospital:
 *   post:
 *     tags:
 *       - Hospital
 *     description: "Cria um novo registro de hospital no sistema."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               endereco:
 *                 type: string
 *               telefone:
 *                 type: string
 *               email:
 *                 type: string
 *               cnpj:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Hospital criado com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 hospital:
 *                   type: object
 *                   properties:
 *                     nome:
 *                       type: string
 *                     endereco:
 *                       type: string
 *                     telefone:
 *                       type: string
 *                     email:
 *                       type: string
 *                     cnpj:
 *                       type: string
 *                 message:
 *                   type: string
 *                   example: "Hospital registrado com sucesso!"
 */
router.post("/hospital", HospitalController.create);

/**
 * @openapi
 * /hospital/{id}:
 *   put:
 *     tags:
 *       - Hospital
 *     description: "Atualiza as informações de um hospital específico."
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID do hospital a ser atualizado"
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               endereco:
 *                 type: string
 *               telefone:
 *                 type: string
 *               email:
 *                 type: string
 *               cnpj:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Hospital atualizado com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 hospital:
 *                   type: object
 *                   properties:
 *                     nome:
 *                       type: string
 *                     endereco:
 *                       type: string
 *                     telefone:
 *                       type: string
 *                     email:
 *                       type: string
 *                     cnpj:
 *                       type: string
 *                 message:
 *                   type: string
 *                   example: "Hospital atualizado com sucesso!"
 */
router.put("/hospital/:id", HospitalController.update);

/**
 * @openapi
 * /hospital/{id}:
 *   delete:
 *     tags:
 *       - Hospital
 *     description: "Deleta um hospital específico do sistema."
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID do hospital a ser deletado"
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Hospital deletado com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Hospital deletado com sucesso!"
 */
router.delete("/hospital/:id", HospitalController.delete);

/**
 * @openapi
 * /doctor:
 *   get:
 *     tags:
 *       - Doctor
 *     description: "Lista todos os médicos registrados no sistema."
 *     responses:
 *       200:
 *         description: "Lista de médicos"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nomeCompleto:
 *                     type: string
 *                   crm:
 *                     type: string
 *                   telefone:
 *                     type: string
 *                   email:
 *                     type: string
 *                   especialidade:
 *                     type: string
 */
router.get("/doctor", DoctorController.index);

/**
 * @openapi
 * /doctor:
 *   post:
 *     tags:
 *       - Doctor
 *     description: "Cria um novo registro de médico no sistema."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeCompleto:
 *                 type: string
 *               crm:
 *                 type: string
 *               telefone:
 *                 type: string
 *               email:
 *                 type: string
 *               especialidade:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Médico criado com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 doctor:
 *                   type: object
 *                   properties:
 *                     nomeCompleto:
 *                       type: string
 *                     crm:
 *                       type: string
 *                     telefone:
 *                       type: string
 *                     email:
 *                       type: string
 *                     especialidade:
 *                       type: string
 *                 message:
 *                   type: string
 *                   example: "Médico registrado com sucesso!"
 */
router.post("/doctor", DoctorController.create);

/**
 * @openapi
 * /doctor/{id}:
 *   put:
 *     tags:
 *       - Doctor
 *     description: "Atualiza as informações de um médico específico no sistema."
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID do médico a ser atualizado"
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeCompleto:
 *                 type: string
 *               crm:
 *                 type: string
 *               telefone:
 *                 type: string
 *               email:
 *                 type: string
 *               especialidade:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Médico atualizado com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 doctor:
 *                   type: object
 *                   properties:
 *                     nomeCompleto:
 *                       type: string
 *                     crm:
 *                       type: string
 *                     telefone:
 *                       type: string
 *                     email:
 *                       type: string
 *                     especialidade:
 *                       type: string
 *                 message:
 *                   type: string
 *                   example: "Médico atualizado com sucesso!"
 */
router.put("/doctor/:id", DoctorController.update);

/**
 * @openapi
 * /doctor/{id}:
 *   delete:
 *     tags:
 *       - Doctor
 *     description: "Deleta um médico específico do sistema."
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID do médico a ser deletado"
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Médico deletado com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Médico deletado com sucesso!"
 */
router.delete("/doctor/:id", DoctorController.delete);
module.exports = router;