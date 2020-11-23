import React, { useEffect, useState } from 'react';

import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

export default function Register() {
    let n = 0;
    const [planos, setPlanos] = useState([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [falemais_id, setfalemais_id] = useState();

    const history = useHistory();

    useEffect(() => {
        api.get('plano').then(response => {
            setPlanos(response.data);
        })
    }, [n]);
    
    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            cpf,
            name,
            email,
            falemais_id
        };
        
        try {
            const response = await api.post('users', data);

            alert(response.data);
            history.push('/');

        } catch (error) {
            alert('erro no cadastro tentee novamente')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma .</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Cancelar
                    </Link>

                </section>

                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Seu Nome "
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input
                        type="email" placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        placeholder="cpf"
                        value={cpf}
                        onChange={e => setCpf(e.target.value)}
                    />

                    <select id="aparencia-select" value={falemais_id} onChange={e => setfalemais_id(Number(e.target.value))}>
                        {planos.map(planos => (
                            <option key={planos.id} value={planos.id}>{planos.title}</option>
                        ))}
                    </select>



                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}