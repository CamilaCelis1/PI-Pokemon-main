import React from 'react';
import css from './pokemon-card.module.css';
import { useHistory } from 'react-router-dom';

const PokemonCard = (props) => {
    const {
        pokemon,
    } = props;
    const history = useHistory();
    return (
        <div className={css.container}>
            <div className={css.namePokemon}>
                {pokemon.name}
            </div>
            {pokemon.sprites ?
                <div>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                </div>
                :
                <div> No tiene foto  </div>
            }
            <div className={css.typesPokemon}>
                {pokemon.types && pokemon.types.length ?
                    pokemon.types.map((item) => (
                        <div className={css.typeName}>
                            {item.type ? item.type.name : item}
                        </div>
                    ))
                    : <div> Cargando...</div>
                }
            </div>
            <div> <button className={css.btn} onClick={() => history.push(`/pokemon/${pokemon.id}`)}>Ver mas</button></div>
        </div>
    )
}

export default PokemonCard;