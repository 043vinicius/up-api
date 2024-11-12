const request = require("supertest");
const app = require("../index");
const knex = require("../database/connection");

describe("Hospital Routes", () => {
    // Teste para a rota GET /hospital
    it("should return a list of hospitals", async () => {
        const response = await request(app).get("/hospital");

        expect(response.status).toBe(200);  // Espera-se um código de status 200
        expect(Array.isArray(response.body.hospital)).toBe(true); // Espera-se que a resposta seja uma lista
    });

    // Teste para a rota POST /hospital
    it("should create a new hospital", async () => {
        const newHospital = {
            nome: "Hospital Teste",
            endereco: "Rua Teste, 123",
            telefone: "(11) 9999-8888",
            email: "teste@hospital.com",
            cnpj: "12.345.678/0001-90",
            senha: "senha123"
        };

        const response = await request(app)
            .post("/hospital")
            .send(newHospital);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.hospital.nome).toBe(newHospital.nome);
    });

    // Teste para a rota PUT /hospital/:id
    it("should update an existing hospital", async () => {
        // Primeiro, crie um hospital para garantir que o hospital exista
        const newHospital = await knex("Hospital").insert({
            nome: "Hospital Atualizável",
            endereco: "Rua Atualizável, 123",
            telefone: "(11) 8888-7777",
            email: "atualizavel@hospital.com",
            cnpj: "98.765.432/0001-00",
            senha: "senha123"
        }).returning("id");

        const updatedHospital = {
            nome: "Hospital Atualizado",
            endereco: "Rua Atualizada, 321",
            telefone: "(11) 1111-2222",
            email: "atualizado@hospital.com",
            cnpj: "98.765.432/0001-99",
            senha: "senha321"
        };

        const response = await request(app)
            .put(`/hospital/${newHospital[0].id}`)
            .send(updatedHospital);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.hospital.nome).toBe(updatedHospital.nome);
    });

    // Teste para a rota DELETE /hospital/:id
    it("should delete a hospital", async () => {
        // Primeiro, crie um hospital para garantir que o hospital exista
        const newHospital = await knex("Hospital").insert({
            nome: "Hospital Deletável",
            endereco: "Rua Deletável, 123",
            telefone: "(11) 5555-4444",
            email: "deletavel@hospital.com",
            cnpj: "12.345.678/0001-22",
            senha: "senha123"
        }).returning("id");

        const response = await request(app)
            .delete(`/hospital/${newHospital[0].id}`);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe("Hospital deletado com sucesso");
    });
});
