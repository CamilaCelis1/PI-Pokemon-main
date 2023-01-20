import {
    FILTER_POKEMONS,
    GET_POKEMONS,
    GET_POKEMONSID,
    GET_POKEMONSNAME,
    GET_POKEMONTYPES,
    ORDER_POKEMONS,
    SET_CARGANDO,
    FILTER_POKEMONSTYPES,
    GET_POKEMONS_BY_PAGINATION
} from '../actions'

const initialState = {
    pokemons: [],
    pokemonsDetail: {},
    pokemonsTypes: [],
    filterPokemon: [],
    pokemonsTypesFilter: [],
    cargando: false,
    nextLink: '',
    prevLink:''
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload.pokemons,
                filterPokemon: action.payload.pokemons,
                nextLink: action.payload.next
            }
        case GET_POKEMONSID:
            return {
                ...state,
                pokemonsDetail: action.payload
            }
        case GET_POKEMONSNAME:
            return {
                ...state,
                pokemonsDetail: action.payload
            }
        case GET_POKEMONTYPES:
            return {
                ...state,
                pokemonsTypes: action.payload,
                pokemonsTypesFilter: action.payload
            }
        case FILTER_POKEMONS:
            return {
                ...state,
                filterPokemon: action.payload
            }
        case ORDER_POKEMONS:
            return {
                ...state,
                filterPokemon: action.payload
            }
        case SET_CARGANDO:
            return {
                ...state,
                cargando: action.payload
            }
        case FILTER_POKEMONSTYPES:
            return {
                ...state,
                pokemonsTypesFilter: action.payload
            }
        case GET_POKEMONS_BY_PAGINATION:
            return {
                ...state,
                filterPokemon: action.payload.pokemons,
                nextLink: action.payload.nextLink,
                prevLink: action.payload.prevLink,
                pokemons: action.payload.pokemons
            }
        default:
            return initialState
    }
}

export default rootReducer;