const connection = require('../database/connection');

module.exports = {
    async create (request, response) {
        const {cpf} = request.body;
        
        const users = await connection('users').join('falemais', 'users.falemais_id', 'falemais.id')
        .where('cpf', cpf)
        .select('*').first();

        if(!users){
            return response.status(400).json({error: 'Cpf n cadastrado'});
        }

        return response.json(users); 
    }
}