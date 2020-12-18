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

        let ValorSemPlano = 0
        let valorComPlano = 0
        
        if (origem[0].cod == 11) {
            if (destino[0].cod == 16) {
                valorComPlano =time * 1.90
                if (plano[0].time != 0) {
                    valorComPlano = (time - plano[0].time < 0) ? 0 : (time - plano[0].time) * (1.90 + 0.19)
                }
                ValorSemPlano = time * 1.90
                
                return response.json({ valorComPlano, ValorSemPlano });
            } if (destino[0].cod == 17) {
                valorComPlano =time * 1.70
                if (plano[0].time != 0) {
                    valorComPlano = (time - plano[0].time < 0) ? 0 : (time - plano[0].time) * (1.70 + 0.17)
                }
                ValorSemPlano = time * 1.70
                console.log({ valorComPlano, ValorSemPlano })
                return response.json({ valorComPlano, ValorSemPlano });
            } if (destino[0].cod == 18) {
                valorComPlano = time * 0.90
                if (plano[0].time != 0) {
                    valorComPlano = (time - plano[0].time < 0) ? 0 : (time - plano[0].time) * (0.90 + 0.09)
                }
                ValorSemPlano = time * 0.90
                return response.json({ valorComPlano, ValorSemPlano });
            } else {
                return response.json("No momento não é possivel fazer essa ligação essas localidades");
            }
        }
        if (origem[0].cod == 16) {
            if (destino[0].cod == 11) {
                valorComPlano = time * 2.90
                if (plano[0].time != 0) {
                    valorComPlano = (time - plano[0].time < 0) ? 0 : (time - plano[0].time) * (2.90 + 0.29)
                }
                ValorSemPlano = time * 2.90

                return response.json({ valorComPlano, ValorSemPlano });
            } else {
                return response.json("No momento não é possivel fazer essa ligação essas localidades");
            }

        } if (origem[0].cod == 17) {
            if (destino[0].cod == 11) {
                valorComPlano = time * 2.70
                if (plano[0].time != 0) {
                    valorComPlano = (time - plano[0].time < 0) ? 0 : (time - plano[0].time) * (2.70 + 0.27)
                }
                ValorSemPlano = time * 2.70
                return response.json({ valorComPlano, ValorSemPlano });
            } else {
                return response.json("No momento não é possivel fazer essa ligação essas localidades");
            }
        } if (origem[0].cod == 18) {
            if (destino[0].cod == 11) {
                ValorComPlano = time * 1.90
                if (plano[0].time != 0) {
                    valorComPlano = (time - plano[0].time < 0) ? 0 : (time - plano[0].time) * (1.90 + 0.19);
                }
                ValorSemPlano = time * 1.90
                return response.json({ valorComPlano, ValorSemPlano });

            } else {
                return response.json("No momento não é possivel fazer essa ligação essas localidades");
            }
        }

    }



}
//fiz com ifs pq o switch bugou n sei o pq. sinto muito