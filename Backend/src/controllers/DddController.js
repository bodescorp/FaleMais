const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { cod, region } = request.body;

        await connection('ddd').insert({
            cod,
            region
        });
        return response.json('DDD cadastrado com Sucesso');


    },

    async list(request, response){
        const ddds = await connection('ddd').select('*');

        return response.json(ddds);
    }
}