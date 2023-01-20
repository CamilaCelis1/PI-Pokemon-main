const axios = require('axios')
const { Pokemon, Tipo } = require('../db')

const getPokemons = async () => {
    try {
        const response = await axios.get(`${process.env.API_URL}?limit=12`, {
            headers: {
                'Accept-Encoding': 'identity',
            }
        });
        const pokemonDatabase = await Pokemon.findAll();
        const pokemonList = [];
        for (const pokemon of response.data.results) {
            const pokemonDetail = await axios.get(pokemon.url, {
                headers: {
                    'Accept-Encoding': 'identity',
                }
            });
            pokemonList.push(pokemonDetail.data);
        }
        const resultadoFinal = pokemonList.concat(pokemonDatabase);
        return {pokemons:resultadoFinal, next: response.data.next};
    } catch (error) {
        return error;
    }
}
const getPokemonsId = async (id) => {
    try {
        const response = await axios.get(`${process.env.API_URL}/${id}`, {
            headers: {
                'Accept-Encoding': 'identity'
            }
        });
    return response.data;
    } catch (error) {
        return error;
    }
}

const getPokemonsName = async (name) => {
    try {
        const response = await axios.get(`${process.env.API_URL}/${name}`, {
            headers: {
                'Accept-Encoding': 'identity'
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
}

const getPokemonTypes = async () => {
    try {
        const tipoDatabase = await Tipo.findAll();
        if (tipoDatabase.length === 0) {
            const response = await axios.get(`https://pokeapi.co/api/v2/type`, {
                headers: {
                    'Accept-Encoding': 'identity'
                }
            });
            for (const type of response.data.results) {
                await Tipo.create(type)
            }
            const tipoDatabase = await Tipo.findAll();
            return tipoDatabase;
        } else {
            return tipoDatabase;
        }
    } catch (error) {
        return error;
    }

}

const postPokemons = async (values) => {
    const info = await axios.get(`${process.env.API_URL}`, {
        headers: {
            'Accept-Encoding': 'identity'
        }
    });
    const pokemons = info.data.results;
    if(!values.ID){
        return "El ID es requerido"
    }
    const idList = []
    for (let index = 0; index < pokemons.length; index++) {
        const element = pokemons[index];
        const urlParteUno = element.url.split("pokemon/")[1];
        const pokemonId = urlParteUno.split('/')[0];
        idList.push(pokemonId);
    }
    const validacionId = idList.some((item) => item === values.ID.toString())
    if (validacionId) {
        return { error: "Id ya existe" };
    }
    if(!values.name){
        return {error: "El nombre es requerido"}
    }
    // https://desarrolloweb.com/articulos/funciones-validacion-alfanumerica-string-javascript.html#:~:text=Saber%20si%20el%20string%20contiene%20caracteres%20num%C3%A9ricos&text=La%20funci%C3%B3n%20hace%20un%20recorrido,funci%C3%B3n%20devolviendo%20el%20valor%201).
    const numeros = "0123456789";
    for (i = 0; i < values.name.length; i++) {
        if (numeros.indexOf(values.name.charAt(i), 0) != -1) {
            return { error: "El nombre no puede contener numeros" };
        }
    }
    const response = Pokemon.create(values);
    return response
}

module.exports = {
    getPokemons,
    getPokemonsId,
    getPokemonsName,
    getPokemonTypes,
    postPokemons
}

