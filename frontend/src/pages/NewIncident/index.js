import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import swal from 'sweetalert';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e) {
        e.preventDefault(); 

        const data = { 
            title, description, value
        }
    
        try {   
            await api.post(`/incidents`, data, {
                headers: {
                    Authorization: ongId
                }
            });

            swal('Novo caso cadastrado com sucesso', {
                icon: "success",
                buttons: false,
                timer: 2000
            });

            setTimeout(() => history.push('/profile'), 2000);
        } catch(err) {
            swal('Erro no cadastro, tente novamente', {
                icon: "error",
                buttons: false
            });
        }
    }

    return (
        <div className="new-incident-container"> 
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"/> 
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        type="text" 
                        placeholder="Título do caso" 
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <textarea 
                        type="text" 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)} />
                    <input 
                        type="text" 
                        placeholder="Valor em Reais"
                        value={value}
                        onChange={e => setValue(e.target.value)} />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}