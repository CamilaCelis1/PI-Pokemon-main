import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import css from './pokemons.module.css';
import PokemonCard from '../../../shared/pokemon-card';
import * as actions from "../../../../redux/actions";
import { useDispatch, connect } from "react-redux";

const Pokemons = (props) => {
    const {
        pokemons,
        filterPokemon,
        cargando,
        nextLink,
        prevLink
    } = props
    const history = useHistory();

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.getPokemons())
    }, [dispatch, actions.getPokemons])

    const [search, setSearch] = useState('');
    const onSearch = () => {
        const listFilter = [];
        filterPokemon.forEach((pokemon) => {
            if (pokemon.name.toLowerCase().startsWith(search.toLowerCase())) {
                listFilter.push(pokemon);
            }
        });
        dispatch(actions.filterPokemons(listFilter));
        if (search === '') {
            dispatch(actions.filterPokemons(pokemons));
        }
    }

    const [order, setOrder] = useState('');

    const onOrder = async () => {
        if (order === "valueA-Z") {
            dispatch(actions.setCargando(true))
            const pokemonOrder = filterPokemon.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
            dispatch(actions.orderPokemons(pokemonOrder))
            dispatch(actions.setCargando(false))
        }
        if (order === "valueZ-A") {
            dispatch(actions.setCargando(true))
            const pokemonOrder = filterPokemon.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1);
            dispatch(actions.orderPokemons(pokemonOrder))
            dispatch(actions.setCargando(false))
        }
        if (order === "valueMayor") {
            // const pokemonsHaveAttack = [];
            // const pokemonsDontHaveAttack = [];
            // filterPokemon.forEach((item) => {
            //     let conAttack = false;
            //     item.stats && item.stats.forEach((stat) => {
            //         if (stat.stat.name === 'attack') {
            //             pokemonsHaveAttack.push(item);
            //             conAttack = true;
            //         }
            //     })

            //     if (!conAttack) {
            //         pokemonsDontHaveAttack.push(item);
            //     }
            // })
            // const pokemonOrder = pokemonsHaveAttack.sort((a, b) => {
            //     a.stats && a.stats.forEach((aStat) => {
            //         b.stats && b.stats.forEach((bStat) => {
            //             if (aStat.stat.name === 'attack' && bStat.stat.name === 'attack') {
            //                 return aStat.base_stat > aStat.base_stat ? -1 : 1;
            //             }
            //             return 0;
            //         })
            //     })
            // })
            // console.log('POKEMONS', {
            //     pokemonsHaveAttack,
            //     pokemonsDontHaveAttack,
            //     pokemonOrder
            // })
            // pokemons.forEach(pokemon => {
            //     pokemon.stats.forEach(stat => {
            //         stat.stat.name === attack
            //     })
            // });
            // console.log("OKEMON", pokemonOrder)
        }
        if (order === "valueMenor") {
            // const pokemonOrder = pokemons.sort((a, b) => a.attack.toLowerCase() > b.attack.toLowerCase() ? -1 : 1)
            // console.log("OKEMON", pokemonOrder)
        }
    }

    const nextHandler = (url)=>{
        dispatch(actions.setCargando(true));
        dispatch(actions.getPokemonsByPagination(url));
        dispatch(actions.setCargando(false));
    }

    const prevHandler = (url)=> {
        dispatch(actions.setCargando(true));
        dispatch(actions.getPokemonsByPagination(url));
        dispatch(actions.setCargando(false));
    }

    return (
        <>
            {/* {filterPokemon.length ? */}
            <div className={css.container} >
                <div>
                    <div className={css.form}>
                        <input name="Buscar:" placeholder="Nombre del pokemon..."
                            onKeyDown={(event) => {
                                console.log('EVENT', event.target.value)
                                setSearch(event.target.value)
                            }}
                            onKeyUp={(event) => {
                                console.log('EVENT', event.target.value)
                                setSearch(event.target.value)
                            }} />
                        <button className={css.btnForm} onClick={() => onSearch()}>Buscar</button>
                    </div>
                </div>
                <div className={css.form}>
                    <select name="select" onChange={(event) => {
                        setOrder(event.target.value)
                    }}>
                        <option value="" disabled selected>Ordenar por...</option>
                        <option value="valueA-Z">A-Z</option>
                        <option value="valueZ-A">Z-A</option>
                        <option value="valueMayor">Mayor-Menor ataque </option>
                        <option value="valueMenor">Menor-Mayor ataque</option>
                    </select>
                    <button onClick={() => onOrder()} className={css.btn}>Ordenar</button>
                </div>
                <div className={css.form}>
                    <select name="select">
                        <option value="" disabled selected>Filtar por...</option>
                        <option value="valuePokemon">Pokemon</option>
                        <option value="valueTipo">Tipo de pokemon</option>
                    </select>
                    <button className={css.btn}>Filtar</button>
                </div>
                <div className={css.form}>
                    <button className={css.btn} onClick={() => history.push('/pokemon/add')}>Agregar Pokemon</button>
                </div>
                <div className={css.pokemonContainer}>
                    {console.log('FILTER POKEMON', filterPokemon)}
                    {!cargando ?
                        filterPokemon.length !== 0 && filterPokemon.map((pokemon) => (
                            <PokemonCard key={pokemon.name} pokemon={pokemon} />
                        ))
                        : <div>Cargando...</div>
                    }
                </div>
                <div className={css.containerButtonsPrevNext}>
                    <button className={css.btnForm} onClick={() => prevHandler(prevLink)}>Prev</button>
                    <button className={css.btnForm} onClick={() => nextHandler(nextLink)}>Next</button>
                </div>
            </div>
        </>
    )
};

export const mapStateToProps = (state) => {
    return {
        pokemons: state.pokemons,
        filterPokemon: state.filterPokemon,
        cargando: state.cargando,
        nextLink: state.nextLink,
        prevLink: state.prevLink
    }
}

export const mapDispatchToProps = {
    getPokemons: actions.getPokemons,
    filterPokemons: actions.filterPokemons,
    orderPokemons: actions.orderPokemons,
    setCargando: actions.setCargando,
    getPokemonsByPagination: actions.getPokemonsByPagination
};

export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);