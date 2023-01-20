import React, { useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import css from './pokemon-detail.module.css';
import axios from "axios";
import * as actions from "../../../../redux/actions";
import { useDispatch, connect } from "react-redux";


const PokemonsDetail = (props) => {
    console.log("PROPS", props)
    const { pokemonsDetail } = props;
    const history = useHistory();
    const dispatch = useDispatch()
    const location = useLocation();
    const pokemonId = location.pathname.split('pokemon/')[1];
    console.log('POKEMON ID', pokemonId)
    useEffect(() => {
        dispatch(actions.getPokemonsId(pokemonId))
    }, [dispatch, actions.getPokemonsId])
    return (
        <div className={css.container} >
            <div className={css.containerIzq}>
                <div className={css.namePokemon}>
                    {pokemonsDetail.name}
                </div>
                <div className={css.imagenPokemon}>
                    {pokemonsDetail.sprites &&
                        <div>
                            <img className={css.img} src={pokemonsDetail.sprites.front_default} alt={pokemonsDetail.name} />

                        </div>

                    }
                </div>
            </div >
            <div className={css.containerDer}>
                <div className={css.idPokemon}>
                    {pokemonsDetail.id}
                </div>
                <div className={css.typesPokemon}>
                    {pokemonsDetail.types && pokemonsDetail.types.length ?
                        pokemonsDetail.types.map((item) => (
                            <div className={css.typeName}>
                                {item.type ? item.type.name : item}
                            </div>
                        ))
                        : <div> Cargando...</div>
                    }
                </div>
                <div className={css.descripcion}>
                    <div>Height: {pokemonsDetail.height}</div>
                    <div>Weight: {pokemonsDetail.weight}</div>
                    {pokemonsDetail.stats && pokemonsDetail.stats.map((stat) => (
                        <div>
                            {stat.stat.name} : {stat.base_stat}
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
};

export const mapStateToProps = (state) => {
    return {
        pokemonsDetail: state.pokemonsDetail
    }
}

export const mapDispatchToProps = { getPokemonsId: actions.getPokemonsId };

export default connect(mapStateToProps, mapDispatchToProps)(PokemonsDetail);