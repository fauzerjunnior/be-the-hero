import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import swal from 'sweetalert';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './styles.css';  

export default function Profile() {

    const history = useHistory();
    const [incidents, setIncidents] = useState([]);

    const [ResultLabel, setResultLabel] = useState('');

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data);

            if(response.data.length !== 0 && response.data !== null && response.data !== 'undefined') { 
                setResultLabel('Casos encontrados');
            } else {
                setResultLabel('Nenhum caso encontrado');
            }
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch(err) {
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    async function handleDeleteOng() {
        try{
            let result = await swal({
                title: 'Você tem certeza?',
                text: 'Se você remover a sua ONG, não poderá mais recuperá-la!',
                icon: 'warning',
                buttons: ['Não remover', true],
                dangerMode: true,
            });
            
            // SUCCESS
            if (result) {
                await api.delete(`ongs`, {
                    headers: {
                        Authorization: ongId
                    }
                });

                swal('Pronto! A sua ONG foi removida!', {
                    icon: "success",
                    buttons: false,
                    timer: 2000
                });

                setTimeout(() => history.push('/'), 2000);
            }
          } catch(err) {
            swal('Erro ao deletar, tente novamente', {
                icon: "error"
            });
          }
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vindo, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower  size={18} color="e02041"></FiPower>
                </button>
                <button className="dropdown" type="button" onClick={handleDeleteOng}>
                    <FiTrash2  size={18} color="e02041"></FiTrash2>
                </button>
            </header>   
    
            <h1>{ ResultLabel }</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL'}).format(incident.value)}</p>
                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}