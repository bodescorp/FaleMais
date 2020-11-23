const connection = require('../database/connection');

module.exports = {
    async create (request, response) {
        const {cpf} = request.body;
        
        const users = await connection('users').where('cpf', cpf).select('name').first();

        if(!users){
            return response.status(400).json({error: 'Cpf n cadastrado'});
        }

        return response.json(users); 
    }
}