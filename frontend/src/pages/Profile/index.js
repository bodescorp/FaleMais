import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css'

export default function Profile() {
    let n = 0
    const [ddd, setDdd] = useState([]);
    const [time, setTime] = useState([]);
    const [id_origem, setId_origem] = useState('');
    const [id_destino, setId_destino] = useState('');
    const [myplano, setMyPlano] = useState('');

    const cpf = localStorage.getItem('cpf');
    const user_name = localStorage.getItem('user_name');

    const history = useHistory();

    useEffect(() => {
        api.post('sessions', { cpf }).then(response => {
            setMyPlano(response.data.title);
        });

    }, [cpf]);
    useEffect(() => {
        api.get('ddd').then(response => {
            setDdd(response.data);
        })
    }, [n]);
    async function handleCalcular(e) {
        e.preventDefault();

        const data = {
            id_origem,
            id_destino,
            time,
        };
        console.log(data)
        try {
            const response = await api.post('liga', data, {
                headers: {
                    authorization: cpf,
                }
            });
            if (response.data.ValorSemPlano ) {
                alert(`Valor com seu plano atual:${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(response.data.valorComPlano)} 
                 e o Valor Sem o plano:
                    ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(response.data.ValorSemPlano)}`);
            }else{
                alert(response.data)
            }

        } catch (error) {
            alert('Erro ao calcular, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <span>Bem Vindo(a), {user_name} </span>
                <span>Seu Plano atual: {myplano} </span>
                <Link className="button" to="/update/user">Alterar Plano</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <div className="profile-body">
                <form onSubmit={handleCalcular}>
                    <label >Origem</label>
                    <select id="aparencia-select" value={id_origem} onChange={e => setId_origem(Number(e.target.value))}>
                        <option value="" disabled selected hidden>Selecionse o DDD de Origem</option>
                        {ddd.map(ddd => (
                            <option key={ddd.cod} value={ddd.cod}>{ddd.cod}</option>
                        ))}
                    </select>

                    <input
                        placeholder="Time em minutos "
                        value={time}
                        onChange={e => setTime(Number(e.target.value))}
                    />
                    <label >Destino</label>
                    <select id="aparencia-select" value={id_destino} onChange={e => setId_destino(Number(e.target.value))}>
                        <option value="" disabled selected hidden>Selecionse o DDD de Destino</option>
                        {ddd.map(ddd => (
                            <option key={ddd.cod} value={ddd.cod}>{ddd.cod}</option>
                        ))}
                    </select>



                    <button className="button" type="submit">calcular</button>
                </form>
            </div>

        </div>
    );
}
