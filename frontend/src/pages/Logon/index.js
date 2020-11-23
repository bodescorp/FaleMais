import React, { useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import './styles.css';

import heroesImg from '../../assets/heroes.png';

import {FiLogIn} from 'react-icons/fi';

import api from '../../services/api';

export default function Logon(){
    const[cpf,setcpf] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();
        try {
            const response = await api.post('sessions', { cpf } );
            
            localStorage.setItem('cpf', cpf);
            localStorage.setItem('user_name', response.data.name);

            history.push('/profile');
        } catch (error) {
            alert('Falha no Login, tente Novamente.');
        }
    }

    return(
        <div className="logon-container">
            <section className="form">

                <form onSubmit= {handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input
                        placeholder = "Seu cpf"
                        value= {cpf}
                        onChange= {e => setcpf(e.target.value)}
                    />
                    <button className = "button" type= "submit">Entrar</button>

                    <Link className = "back-link" to ="/register">
                        <FiLogIn size = {16} color = "#E02041"/>
                        Não tenho cadrasto
                    </Link>
                </form>


            </section>
            <img src = {heroesImg}  alt = "Heroes" />
        </div>
    );
}