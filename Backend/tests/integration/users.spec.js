const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
describe('Users', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });
    afterAll( async () => {
        await connection.destroy();
    })

    it('consegue criar um novo user', async () => {
        const response = await request(app)
            .post('/Users')
            .send({
                cpf: "999",
                name: "francimar",
                email: "jose2010@gmail.com",
                falemais_id: 1
            });
        expect(response.body);

    });
});