import React from "react";
import { useHistory } from 'react-router-dom';
import css from './home.module.css';
import imgPokemon from "../../../../images/pokemon.png"

const Home = () => {
    const history = useHistory();
    return (

        <div className={css.container}>
            <div className={css.containerImg}>
                <img className={css.logo} src={imgPokemon} />
            </div>
            <div className={css.containerButton}>
                <button className={css.btn} onClick={() => history.push('/pokemons')}>Home</button>
            </div>
        </div>

    );
};

export default Home;