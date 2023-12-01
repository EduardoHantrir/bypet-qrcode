import React, { useState } from 'react';
import '../styles/petPerfil/petPerfil.css'

function InfoItem({ data }) {
    const [isOpen, setIsOpen] = useState(false);
    const idade = data.idade;
    const especie = data.especie;
    const genero = data.genero;

    let textoIdade = idade === 1 ? '1 ano' : `${idade} anos`;

    let generoIcon = genero === 'macho' ? 'male' : 'female';

    const icons = {
        male: require('../assets/icons/genero/male.png'),
        female: require('../assets/icons/genero/female.png'),
    };

    const especieIcons = {
        Cachorro: require('../assets/icons/dog/dog.png'),
        Gato: require('../assets/icons/cat/cat.png'),
        Hamster: require('../assets/icons/hamster/hamster.png'),
        Coelho: require('../assets/icons/rabit/rabit.png'),
    };

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div onClick={handleClick} className={`card ${isOpen ? 'active' : ''}`}>
            <div className='title'>
                <h2>{data.Pet}, {textoIdade}</h2>
            </div>
            {isOpen &&
                <>
                    <div className='especie-row'>
                        <p>{data.especie}</p>
                        <img src={especieIcons[especie]} alt='imagem especie' />
                    </div>
                    <p className='raca'>{data.raca}</p>
                    <div className='genero-row'>
                        <p>{data.genero}</p>
                        <img src={icons[generoIcon]} alt='imagem genero' />
                    </div>
                    <p className='descricao' >{data.descricao}</p>
                </>
            }
        </div>
    );
}

export default InfoItem;
