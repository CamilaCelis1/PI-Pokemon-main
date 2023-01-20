const { Router } = require('express');
const { getPokemonTypes } = require('../controllers/pokemon')
const router = Router();

router
    .route("/")
    .get(async (req, res) => {
        const response = await getPokemonTypes()
        res.status(200).send(response)
    })

module.exports = router