# MedConnect

*MedConnect* é uma aplicação para gerenciar informações hospitalares, como hospitais, médicos, pacientes, consultas, cids (Classificação Internacional de Doenças) e atestados.

## Sumário

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Rotas da API](#rotas-da-api)
- [Sobre o Sistema](#sobre-o-sistema)


## Instalação

Para configurar o projeto localmente, siga as etapas abaixo.

### Pré-requisitos

- *Node.js* (versão 14 ou superior)
- *MySQL* (para o banco de dados)

## Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/043vinicius/up-api
   cd up-api

2. Instale as dependências:

npm install
├── bcrypt@5.0.0


├── body-parser@1.20.3


├── express@4.17.1


├── jest@29.7.0


├── jsonwebtoken@8.5.1


├── knex@0.21.2


├── mysql2@2.1.0


├── nodemon@3.1.7


├── supertest@7.0.0


├── swagger-jsdoc@6.2.8


└── swagger-ui-express@5.0.1

 3. Inicie o servidor:

node index.js

O servidor estará em execução no endereço <http://localhost:3000>.

Dependências do Projeto

 • express: Framework para configurar rotas e gerenciar requisições HTTP.
 • mysql2: Biblioteca para conectar o Node.js ao MySQL.
 • dotenv: Carregar variáveis de ambiente de um arquivo .env.
 
Documentação da API

A documentação da API está disponível em <http://localhost:3000/npo>.

Estrutura do Banco de Dados

Tabelas

1. Hospital

Armazena informações dos hospitais.
• Campos: id, nome, endereco, telefone, email, cnpj, senha

2. Medico

Armazena informações dos médicos vinculados a um hospital.
• Campos: id, nome, crm, especialidade, senha, Hospital_id (chave estrangeira)

3. Paciente

Armazena informações dos pacientes.
 • Campos: id, nome, cpf, endereco, telefone, email, senha

4. Consulta

Armazena informações sobre as consultas realizadas.
 • Campos: id, data, Medico_id, Paciente_id, descricao

5. Cids

Armazena a lista de CIDs (Classificação Internacional de Doenças).
 • Campos: id, cod, descricao

6. Atestado

Armazena atestados médicos emitidos.
 • Campos: id, data, Medico_id, Paciente_id, Cids_id, descricao

## Rotas da API

A API oferece operações CRUD para cada uma das entidades no sistema. Aqui estão o exemplo das principais rotas para a entidade Hospital:
 • GET /hospital: Retorna todos os hospitais.
 • POST /hospital: Cria um novo hospital.
 • PUT /hospital/:id: Atualiza um hospital pelo ID.
 • DELETE /hospital/:id: Deleta um hospital pelo ID.

## Sobre o Sistema:

O sistema foi planejado e desenvolvido para facilitar a informatização no processo de comunicação entre pacientes e hospitais, especialmente no agendamento de consultas com médicos especializados, conforme as necessidades do paciente. Ele será utilizado exclusivamente pelo hospital, que será responsável pelo cadastro de pacientes e médicos de diferentes especialidades. Além disso, o sistema contará com uma funcionalidade para registrar e armazenar atestados médicos, permitindo que os pacientes tenham acesso a esse documento sempre que necessário.
