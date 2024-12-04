const express = require("express")
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const HospitalController = require("../controllers/HospitalController");
const CidsController = require("../controllers/CidsController");
const DoctorController = require("../controllers/DoctorController");
const PacienteController = require("../controllers/PacienteController");
const AtestadoController = require("../controllers/AtestadoController");
const ConsultaController = require("../controllers/ConsultarController");
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

/**
 * @swagger
 * paths:
 *   /consulta:
 *     get:
 *       tags:
 *         - consulta
 *       description: "Retorna uma lista de todas as consultas registradas."
 *       responses:
 *         200:
 *           description: "Lista de consultas retornada com sucesso"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   consultas:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         data:
 *                           type: string
 *                           example: "2024-12-04T10:30:00.000Z"
 *                         medico_nome:
 *                           type: string
 *                           example: "Dr. João Silva"
 *                         paciente_nome:
 *                           type: string
 *                           example: "Maria Oliveira"
 *                         descricao:
 *                           type: string
 *                           example: "Consulta de retorno para avaliação."
 */
router.get("/consulta", ConsultaController.index);

/**
 * @swagger
 * paths:
 *   /consulta:
 *     post:
 *       tags:
 *         - consulta
 *       description: "Cria um novo registro de consulta com os dados fornecidos."
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: "2024-12-04T10:30:00.000Z"
 *                 Medico_id:
 *                   type: integer
 *                   example: 1
 *                 Paciente_id:
 *                   type: integer
 *                   example: 2
 *                 descricao:
 *                   type: string
 *                   example: "Consulta inicial para diagnóstico."
 *       responses:
 *         201:
 *           description: "Consulta criada com sucesso"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   consulta:
 *                     type: object
 *                     properties:
 *                       data:
 *                         type: string
 *                         example: "2024-12-04T10:30:00.000Z"
 *                       Medico_id:
 *                         type: integer
 *                         example: 1
 *                       Paciente_id:
 *                         type: integer
 *                         example: 2
 *                       descricao:
 *                         type: string
 *                         example: "Consulta inicial para diagnóstico."
 *                   message:
 *                     type: string
 *                     example: "Consulta registrada com sucesso!"
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
 *                     example: "Erro interno ao criar a consulta"
 */
router.post("/consulta", ConsultaController.create);

/**
 * @swagger
 * paths:
 *   /consulta/{id}:
 *     put:
 *       tags:
 *         - consulta
 *       description: "Atualiza as informações de uma consulta específica pelo ID."
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: ID da consulta a ser atualizada
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: "2024-12-05T15:00:00.000Z"
 *                 Medico_id:
 *                   type: integer
 *                   example: 3
 *                 Paciente_id:
 *                   type: integer
 *                   example: 4
 *                 descricao:
 *                   type: string
 *                   example: "Consulta de acompanhamento."
 *       responses:
 *         200:
 *           description: "Consulta atualizada com sucesso"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   consulta:
 *                     type: object
 *                     properties:
 *                       data:
 *                         type: string
 *                         example: "2024-12-05T15:00:00.000Z"
 *                       Medico_id:
 *                         type: integer
 *                         example: 3
 *                       Paciente_id:
 *                         type: integer
 *                         example: 4
 *                       descricao:
 *                         type: string
 *                         example: "Consulta de acompanhamento."
 *                   message:
 *                     type: string
 *                     example: "Consulta atualizada com sucesso!"
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
 *           description: "Consulta não encontrada"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   err:
 *                     type: string
 *                     example: "Consulta não encontrada!"
 *         500:
 *           description: "Erro interno do servidor"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   err:
 *                     type: string
 *                     example: "Erro interno ao atualizar a consulta"
 */
router.put("/consulta/:id", ConsultaController.update);

/**
 * @swagger
 * paths:
 *   /consulta/{id}:
 *     delete:
 *       tags:
 *         - consulta
 *       description: "Deleta uma consulta específica pelo ID."
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: ID da consulta a ser deletada
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: "Consulta deletada com sucesso"
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
 *                     example: "Consulta deletada com sucesso!"
 *         404:
 *           description: "Consulta não encontrada"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   err:
 *                     type: string
 *                     example: "Consulta não encontrada!"
 *         500:
 *           description: "Erro interno do servidor"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   err:
 *                     type: string
 *                     example: "Erro interno ao excluir a consulta"
 */
router.delete("/consulta/:id", ConsultaController.delete);


module.exports = router;