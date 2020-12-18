import React, { useEffect, useState } from 'react';

import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

export default function Register() {
    let n = 0;
    const [planos, setPlanos] = useState([]);

    const [falemais_id, setfalemais_id] = useState();

    const history = useHistory();

    const cpf = localStorage.getItem('cpf');
    const user_name = localStorage.getItem('user_name');

    useEffect(() => {
        api.get('plano').then(response => {
            setPlanos(response.data);
        })
    }, [n]);

    async function handleUpdate(e) {
        e.preventDefault();

        const data = {
            falemais_id
        };

        try {
            const response = await api.put('users', data, {
                headers: {
                    authorization: cpf,
                }
            });

            alert(response.data);
            history.push('/profile');

        } catch (error) {
            alert('erro tente novamente')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>

                    <h1>Atualização do plano</h1>
                    <p>Altere seu plano .</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Cancelar
                    </Link>

                </section>

                <form onSubmit={handleUpdate}>

                    <select id="aparencia-select" value={falemais_id} onChange={e => setfalemais_id(Number(e.target.value))}>
                        <option value="" disabled selected hidden>Selecionse o DDD de Origem</option>
                        {planos.map(planos => (
                            <option key={planos.id} value={planos.id}>{planos.title}</option>
                        ))}
                    </select>



                    <button className="button" type="submit">Update</button>
                </form>
            </div>
        </div>
    );
}