const express = require("express")
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const HospitalController = require("../controllers/HospitalController");
const PacienteController = require("../controllers/PacienteController");
const AtestadoController = require("../controllers/AtestadoController");
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
 * /atestado:
 *   get:
 *     tags:
 *       - Atestado
 *     description: "Lista todos os atestados registrados no sistema."
 *     responses:
 *       200:
 *         description: "Lista de atestados"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   data:
 *                     type: string
 *                   Medico_id:
 *                     type: integer
 *                   Paciente_id:
 *                     type: integer
 *                   Cids_id:
 *                     type: integer
 *                   descricao:
 *                     type: string
 */
router.get("/atestado", AtestadoController.index);

/**
 * @openapi
 * /atestado:
 *   post:
 *     tags:
 *       - Atestado
 *     description: "Cria um novo registro de atestado no sistema."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *               Medico_id:
 *                 type: integer
 *               Paciente_id:
 *                 type: integer
 *               Cids_id:
 *                 type: integer
 *               descricao:
 *                 type: string
 *     responses:
 *       201:
 *         description: "Atestado criado com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 atestado:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     data:
 *                       type: string
 *                     Medico_id:
 *                       type: integer
 *                     Paciente_id:
 *                       type: integer
 *                     Cids_id:
 *                       type: integer
 *                     descricao:
 *                       type: string
 *                 message:
 *                   type: string
 *                   example: "Atestado registrado com sucesso!"
 */
router.post("/atestado", AtestadoController.create);

/**
 * @openapi
 * /atestado/{id}:
 *   put:
 *     tags:
 *       - Atestado
 *     description: "Atualiza as informações de um atestado específico."
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID do atestado a ser atualizado"
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
 *               data:
 *                 type: string
 *               Medico_id:
 *                 type: integer
 *               Paciente_id:
 *                 type: integer
 *               Cids_id:
 *                 type: integer
 *               descricao:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Atestado atualizado com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 atestado:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     data:
 *                       type: string
 *                     Medico_id:
 *                       type: integer
 *                     Paciente_id:
 *                       type: integer
 *                     Cids_id:
 *                       type: integer
 *                     descricao:
 *                       type: string
 *                 message:
 *                   type: string
 *                   example: "Atestado atualizado com sucesso!"
 */
router.put("/atestado/:id", AtestadoController.update);

/**
 * @openapi
 * /atestado/{id}:
 *   delete:
 *     tags:
 *       - Atestado
 *     description: "Deleta um atestado específico do sistema."
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID do atestado a ser deletado"
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Atestado deletado com sucesso"
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
 *                   example: "Atestado deletado com sucesso!"
 */
router.delete("/atestado/:id", AtestadoController.delete);

/**
 * @openapi
 * /paciente:
 *   get:
 *     tags:
 *       - Paciente
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
router.get("/paciente", PacienteController.index);

/**
 * @openapi
 * /paciente:
 *   post:
 *     tags:
 *       - Paciente
 *     description: "Cria um novo registro de Paciente no sistema."
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
 *         description: "Paciente criado com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 Paciente:
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
 *                   example: "Paciente registrado com sucesso!"
 */
router.post("/paciente", PacienteController.create);

/**
 * @openapi
 * /paciente/{id}:
 *   put:
 *     tags:
 *       - Paciente
 *     description: "Atualiza as informações de um Paciente específico."
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID do Paciente a ser atualizado"
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
 *         description: "Paciente atualizado com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 Paciente:
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
 *                   example: "Paciente atualizado com sucesso!"
 */
router.put("/paciente/:id", PacienteController.update);

/**
 * @openapi
 * /paciente/{id}:
 *   delete:
 *     tags:
 *       - Paciente
 *     description: "Deleta um Paciente específico do sistema."
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID do Paciente a ser deletado"
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Paciente deletado com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Paciente deletado com sucesso!"
 */
router.delete("/paciente/:id", PacienteController.delete);

module.exports = router;