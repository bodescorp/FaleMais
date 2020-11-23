const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { cpf, name, email, falemais_id } = request.body;

        await connection('users').insert({
            cpf,
            name,
            email,
            falemais_id
        });

        return response.json(`Cadastrado com Sucesso, Faça login com seu CPF cadastrado:${cpf}`);
    },
    async list(request, response){
        const users = await connection('users').select('*');

        return response.json(users);
    },

    async update(request, response) {
        const { falemais_id } = request.body;
        const cpf = request.headers.authorization;

        await connection('users').update({falemais_id}).where({cpf});

        return response.json('Plano alterado com Sucesso');
    },
}