const connection = require('../database/connection');

module.exports = {
    async liga(request, response) {
        const { id_origem, id_destino, time } = request.body
        const cpf = request.headers.authorization;

        const plano = await connection('users')
            .join('falemais', 'users.falemais_id', 'falemais.id')
            .select('time')
            .where('users.cpf', cpf);

        const origem = await connection('ddd').where('cod', id_origem);
        const destino = await connection('ddd').where('cod', id_destino);

        let valor = 0


        switch (origem[0].cod == 11) {
            case destino[0].cod[0] == 16:
                if (plano[0].time != 0) {
                    valor = (time - plano[0].time < 0) ? 0 : (time - plano[0].time) * (1.90 + 0.19)
                    return response.json(valor);

                } else {
                    valor = (time - plano[0].time < 0) ? 0 : (time - plano[0].time) * 1.90
                    return response.json(valor);
                }
                break;
            case destino[0].cod == 17:
                if (plano[0].time != 0) {
                    valor = (time - plano[0].time < 0) ? 0 : (time - plano[0].time) * (1.70 + 0.17)
                    return response.json(valor);
                    
                } else {
                    valor = (time - plano[0].time < 0) ? 0 : (time - plano[0].time) * 1.70
                    return response.json(valor);
                    
                }
                break;
            case destino[0].cod == 18:
                if (plano[0].time != 0) {
                    valor = (time - plano[0].time < 0) ? 0 : (time - plano[0].time) * (0.90 + 0.09)
                    return response.json(valor);
                    
                } else {
                    valor = (time - plano[0].time < 0) ? 0 : (time - plano[0].time) * 0.90
                    return response.json(valor);
                    
                }
                break;
            default:
            // code block
        }
        switch (origem[0].cod == 16) {
            case destino[0].cod == 11:
                if (plano[0].time != 0) {
                    valor = (time - plano[0].time < 0) ? 0 : (time - plano[0].time) * (2.90 + 0.29)
                    return response.json(valor);
                    
                } else {
                    valor = (time - plano[0].time < 0) ? 0 : (time - plano[0].time) * 2.90
                    return response.json(valor);
                    
                }
                break;
            default:
            // code block
        }

        switch (origem[0].cod == 17) {
            case destino[0].cod == 11:
                if (plano[0].time != 0) {
                    valor = (time - plano[0].time < 0) ? 0 : (time - plano[0].time) * (2.70 + 0.27)
                    return response.json(valor);
                    
                } else {
                    valor = (time - plano[0].time < 0) ? 0 : (time - plano[0].time) * 2.70
                    return response.json(valor);
                }
                break;
            default:
            // code block
        }

        switch (origem[0].cod == 18) {
            case destino[0].cod == 11:
                if (plano[0].time != 0) {
                    valor = (time - plano[0].time < 0) ? 0 : (time - plano[0].time) * (1.90 + 0.19)
                    return response.json(valor);
                } else {
                    valor = (time - plano[0].time < 0) ? 0 : (time - plano[0].time) * 1.90
                    return response.json(valor);
                }
                break;
            default:
            // code block
        }
    }
}