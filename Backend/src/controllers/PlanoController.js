const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id, title, time } = request.body;

        await connection('falemais').insert({
            id,
            title,
            time
        });
        return response.json('Cadastrado com Sucesso');

    },
    async list(request, response) {
        const planos = await connection('falemais').select('*');

        return response.json(planos);
    }
}