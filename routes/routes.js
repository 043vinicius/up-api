const express = require("express")
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const HospitalController = require("../controllers/HospitalController");
const CidsController = require("../controllers/CidsController");
const DoctorController = require("../controllers/DoctorController");
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

/**
 * @openapi
 * /cids:
 *   get:
 *     tags:
 *       - Cids
 *     description: "Lista todos os registros de Cids no sistema."
 *     responses:
 *       200:
 *         description: "Lista de Cids"
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
 *                   cod:
 *                     type: string
 *                   descricao:
 *                     type: string
 */
router.get("/cids", CidsController.index);

/**
 * @openapi
 * /cids:
 *   post:
 *     tags:
 *       - Cids
 *     description: "Cria um novo registro de Cids no sistema."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cod:
 *                 type: string
 *               descricao:
 *                 type: string
 *     responses:
 *       201:
 *         description: "Cid criado com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 cid:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nome:
 *                       type: string
 *                     cod:
 *                       type: string
 *                     descricao:
 *                       type: string
 *                 message:
 *                   type: string
 *                   example: "Cid registrado com sucesso!"
 */
router.post("/cids", CidsController.create);

/**
 * @openapi
 * /cids/{id}:
 *   put:
 *     tags:
 *       - Cids
 *     description: "Atualiza as informações de um Cid específico."
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID do Cid a ser atualizado"
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
 *               cod:
 *                 type: string
 *               descricao:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Cid atualizado com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 cid:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nome:
 *                       type: string
 *                     cod:
 *                       type: string
 *                     descricao:
 *                       type: string
 *                 message:
 *                   type: string
 *                   example: "Cid atualizado com sucesso!"
 */
router.put("/cids/:id", CidsController.update);

/**
 * @openapi
 * /cids/{id}:
 *   delete:
 *     tags:
 *       - Cids
 *     description: "Deleta um Cid específico do sistema."
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID do Cid a ser deletado"
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Cid deletado com sucesso"
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
 *                   example: "Cid deletado com sucesso!"
 */
router.delete("/cids/:id", CidsController.delete);

/**
 * @swagger
 * paths:
 *   /doctor:
 *     get:
 *       tags:
 *         - doctor
 *       description: "Retorna uma lista de todos os médicos registrados."
 *       responses:
 *         200:
 *           description: "Lista de médicos retornada com sucesso"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   doctor:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         nomeCompleto:
 *                           type: string
 *                           example: "Dr. João Silva"
 *                         crm:
 *                           type: string
 *                           example: "123456"
 *                         especialidade:
 *                           type: string
 *                           example: "Cardiologia"
 */
router.get("/doctor", DoctorController.index);

/**
 * @swagger
 * paths:
 *   /doctor:
 *     post:
 *       tags:
 *         - doctor
 *       description: "Cria um novo registro de médico com os dados fornecidos."
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nomeCompleto:
 *                   type: string
 *                   example: "Dr. João Silva"
 *                 crm:
 *                   type: string
 *                   example: "123456"
 *                 especialidade:
 *                   type: string
 *                   example: "Cardiologia"
 *       responses:
 *         200:
 *           description: "Médico criado com sucesso"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   doctor:
 *                     type: object
 *                     properties:
 *                       nomeCompleto:
 *                         type: string
 *                         example: "Dr. João Silva"
 *                       crm:
 *                         type: string
 *                         example: "123456"
 *                       especialidade:
 *                         type: string
 *                         example: "Cardiologia"
 *                   message:
 *                     type: string
 *                     example: "Doctor registrado com sucesso!"
 *         400:
 *           description: "Erro de validação de entrada"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   err:
 *                     type: string
 *                     example: "Todos os campos são obrigatórios!"
 *         500:
 *           description: "Erro interno do servidor"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   err:
 *                     type: string
 *                     example: "Erro interno ao criar o doctor"
 */
router.post("/doctor", DoctorController.create);

/**
 * @swagger
 * paths:
 *   /doctor/{id}:
 *     put:
 *       tags:
 *         - doctor
 *       description: "Atualiza as informações de um médico específico pelo ID."
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: ID do médico a ser atualizado
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nomeCompleto:
 *                   type: string
 *                   example: "Dr. João Silva"
 *                 crm:
 *                   type: string
 *                   example: "123456"
 *                 especialidade:
 *                   type: string
 *                   example: "Cardiologia"
 *       responses:
 *         200:
 *           description: "Médico atualizado com sucesso"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   doctor:
 *                     type: object
 *                     properties:
 *                       nomeCompleto:
 *                         type: string
 *                         example: "Dr. João Silva"
 *                       crm:
 *                         type: string
 *                         example: "123456"
 *                       especialidade:
 *                         type: string
 *                         example: "Cardiologia"
 *                   message:
 *                     type: string
 *                     example: "Doctor atualizado com sucesso!"
 *         400:
 *           description: "Erro de validação de entrada"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   err:
 *                     type: string
 *                     example: "Pelo menos um campo deve ser fornecido para atualização!"
 *         404:
 *           description: "Médico não encontrado"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   err:
 *                     type: string
 *                     example: "Doctor não encontrado!"
 *         500:
 *           description: "Erro interno do servidor"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   err:
 *                     type: string
 *                     example: "Erro interno ao atualizar o doctor"
 */
router.put("/doctor/:id", DoctorController.update);

/**
 * @swagger
 * paths:
 *   /doctor/{id}:
 *     delete:
 *       tags:
 *         - doctor
 *       description: "Deleta um médico específico pelo ID."
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: ID do médico a ser deletado
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: "Médico deletado com sucesso"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: "Doctor deletado com sucesso!"
 *         404:
 *           description: "Médico não encontrado"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   err:
 *                     type: string
 *                     example: "Doctor não encontrado!"
 *         500:
 *           description: "Erro interno do servidor"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   err:
 *                     type: string
 *                     example: "Erro interno ao excluir o doctor"
 */
router.delete("/doctor/:id", DoctorController.delete);

module.exports = router;