const { Router } = require('express');
const { getPokemons, getPokemonsId, getPokemonsName, postPokemons } = require('../controllers/pokemon')
const router = Router();

router
    .route("/")
    .get(async (req, res) => {
        let response;
        const { name } = req.query;
        if (name) {
            response = await getPokemonsName(name);
        } else {
            response = await getPokemons();
        }
        res.status(200).send(response)
    })
    .post(async (req, res) => {
        const response = await postPokemons(req.body);
        res.status(200).send(response)
    })

router
    .route("/:id")
    .get(async (req, res) => {
        const { id } = req.params;
        const response = await getPokemonsId(id);
        res.status(200).send(response)
    })

module.exports = router