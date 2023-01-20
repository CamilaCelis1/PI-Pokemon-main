import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMONSID = "GET_POKEMONSID";
export const GET_POKEMONSNAME = "GET_POKEMONSNAME";
export const GET_POKEMONTYPES = "GET_POKEMONTYPES";
export const POST_POKEMONS = "POST_POKEMONS";
export const FILTER_POKEMONS = "FILTER_POKEMONS";
export const ORDER_POKEMONS = "ORDER_POKEMONS";
export const SET_CARGANDO = "SET_CARGANDO";
export const FILTER_POKEMONSTYPES = "FILTER_POKEMONSTYPES";
export const GET_POKEMONS_BY_PAGINATION = 'GET_POKEMONS_BY_PAGINATION'

export const getPokemons = () => async dispatch => {
    const response = await axios.get('http://localhost:3001/pokemons/');
    console.log('RESPONSE DATA 1', response.data)
    dispatch({
        type: GET_POKEMONS,
        payload: response.data
    })
};

export const getPokemonsId = (id) => async dispatch => {
    const response = await axios.get(`http://localhost:3001/pokemons/${id}`)
    dispatch({
        type: GET_POKEMONSID,
        payload: response.data
    })
};

export const getPokemonsName = (name) => async dispatch => {
    const response = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
    dispatch({
        type: GET_POKEMONSNAME,
        payload: response.data
    })
};

export const getPokemonTypes = () => async dispatch => {
    const response = await axios.get('http://localhost:3001/types');
    dispatch({
        type: GET_POKEMONTYPES,
        payload: response.data
    })
};

export const filterPokemons = (data) => dispach => {
    dispach({
        type: FILTER_POKEMONS,
        payload: data
    })
};

export const orderPokemons = (data) => dispach => {
    dispach({
        type: ORDER_POKEMONS,
        payload: data
    })
};

export const setCargando = (data) => dispach => {
    console.log('ENTRE A CARGANDO')
    dispach({
        type: SET_CARGANDO,
        payload: data
    })
};

export const filterPokemonsTypes = (data) => dispach => {
    dispach({
        type: FILTER_POKEMONSTYPES,
        payload: data
    })
};

export const getPokemonsByPagination = (url) => async dispatch => {
    const response = await axios.get(url);
    console.log('RESPONSE DATA', response.data)
    const pokemonList = [];
        for (const pokemon of response.data.results) {
            const pokemonDetail = await axios.get(pokemon.url, {
                headers: {
                    'Accept-Encoding': 'identity',
                }
            });
            pokemonList.push(pokemonDetail.data);
        }
    const data = {
        nextLink: response.data.next,
        prevLink: response.data.previous,
        pokemons: pokemonList
    }
    dispatch({
        type: GET_POKEMONS_BY_PAGINATION,
        payload: data
    })
};

// export const postPokemons = () => async dispatch => {

// }

// export const getPokemonsName