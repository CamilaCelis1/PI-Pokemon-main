import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../routes/public/home';
import Pokemons from '../routes/public/pokemons';
import PokemonLayout from '../routes/layout';
import PokemonDetail from '../routes/public/pokemon-detail';
import PokemonForm from '../routes/public/form';

const GeneralRoutes = () => {
    return (
        <PokemonLayout>
            <Router>
                <Switch>
                    <Route path="/pokemons" component={Pokemons} />
                    <Route path="/pokemon/add" component={PokemonForm} />
                    <Route path="/pokemon/:id" component={PokemonDetail} />
                    <Route path="/" component={Home} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        </PokemonLayout>
    )
}


export default GeneralRoutes;