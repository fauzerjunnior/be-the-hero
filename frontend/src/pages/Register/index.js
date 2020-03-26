import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import swal from 'sweetalert';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name, email, whatsapp, city, uf
        };

        try {   

            if (name !== '', email !== '', whatsapp !== '', city !== '', uf !== '') {
                const response = await api.post('/ongs', data);
            
                swal({
                    title: "Bom trabalho!",
                    text: `Seu ID de acesso: ${response.data.id}`,
                    icon: "success",
                });

                history.push('/');
            } else {
                swal({
                    title: "Ops!",
                    text: 'Preencha os campos corretamente',
                    icon: "error",
                });
            }
        } catch(err) {
            swal({
                title: "Ops!",
                text: 'Houve um erro no cadastro, tente novamente.',
                icon: "error",
            });
        }
    }

    return (
        <div className="register-container"> 
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadstro, entre na plataforma e ajude pessoas a encontrarem os casos em sua ONG.</p>
                
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041"/> 
                        Voltar para o logon
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        placeholder="Nome da ONG" 
                        value={name} 
                        onChange={e => setName(e.target.value)} />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}   
                        onChange={e => setEmail(e.target.value)} />
                    <input 
                        type="tel" 
                        placeholder="Whatsapp" 
                        value={whatsapp} 
                        onChange={e => setWhatsapp(e.target.value)} />

                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder="Cidade" 
                            value={city} 
                            onChange={e => setCity(e.target.value)} />
                        <input 
                            type="text" 
                            placeholder="UF" 
                            value={uf} 
                            onChange={e => setUF(e.target.value)} 
                            style={{ width: 80 }} />    
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}