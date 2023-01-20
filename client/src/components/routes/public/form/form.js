import React, { useEffect, useState } from "react";
import css from './form.module.css';
import { useDispatch, connect } from "react-redux";
import * as actions from "../../../../redux/actions";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Form = (props) => {
    const {
        pokemonsTypesFilter,
        pokemonsTypes
    } = props;

    const dispatch = useDispatch()
    const history = useHistory();
    useEffect(() => {
        dispatch(actions.getPokemonTypes())
    }, [dispatch, actions.getPokemonTypes])

    const [name, setName] = useState('');

    const handleChangeName = (e) => {
        setName(e.target.value);
    }
    const [id, setId] = useState('');

    const handleChangeId = (e) => {
        setId(e.target.value);
    }
    const [attack, setAttack] = useState('');

    const handleChangeAttack = (e) => {
        setAttack(e.target.value);
    }
    const [height, setHeight] = useState('');

    const handleChangeHeight = (e) => {
        setHeight(e.target.value);
    }
    const [weight, setWeight] = useState('');

    const handleChangeWeight = (e) => {
        setWeight(e.target.value);
    }
    const [hp, setHp] = useState('');

    const handleChangeHp = (e) => {
        setHp(e.target.value);
    }
    const [defense, setDefense] = useState('');

    const handleChangeDefense = (e) => {
        setDefense(e.target.value);
    }

    const [speed, setSpeed] = useState('');

    const handleChangeSpeed = (e) => {
        setSpeed(e.target.value);
    }

    const [tipos, setTipos] = useState([]);
    const arrayTipos = [];

    const handleChangeTipos = (e) => {
        arrayTipos.push(...tipos, e.target.value)
        setTipos(arrayTipos);
        const filterTypes = pokemonsTypesFilter.filter((type) => type.name !== e.target.value);
        dispatch(actions.filterPokemonsTypes(filterTypes))
    }

    const [errorLabel, setErrorLabel] = useState('');
    const onSubmit = async () => {
        console.log('NAME', name)
        if(name === '') {
            setErrorLabel('El nombre es requerido')
        }
        if(id === '') {
            setErrorLabel('El id es requerido')
        }
        console.log('ERROR LABEL', errorLabel)
        if(errorLabel !== '') {
            const values = {
                name,
                ID: id,
                life: hp,
                attack,
                height,
                weight,
                defending: defense,
                speed,
                types: tipos,
                createdDB: true
            };
            const response = await axios.post('http://localhost:3001/pokemons/', values);
            if(response.data.error) {
                setErrorLabel(response.data.error)
            } else {
                history.push('/pokemons')
            }
        }
    }

    return (
        <div className={css.container}>
            <label className={css.labelError}>{errorLabel}</label>
            <form className={css.formulario}>
                <input type="text" placeholder="name" className={css.styleInput} value={name}
                    onChange={handleChangeName} required />
                <input className={css.styleInput} type="number" placeholder="id" value={id}
                    onChange={handleChangeId} required/>
                <input className={css.styleInput} type="number" placeholder="attack" value={attack}
                    onChange={handleChangeAttack} />
                <input className={css.styleInput} type="number" placeholder="height" value={height}
                    onChange={handleChangeHeight} />
                <input className={css.styleInput} type="number" placeholder="weight" value={weight}
                    onChange={handleChangeWeight} />
                <input className={css.styleInput} type="number" placeholder="hp" value={hp}
                    onChange={handleChangeHp} />
                <input className={css.styleInput} type="number" placeholder="defense" value={defense}
                    onChange={handleChangeDefense} />
                <input className={css.styleInput} type="number" placeholder="speed" value={speed}
                    onChange={handleChangeSpeed} />
                <label className={css.styleInput}>Tipos:</label>
                <select className={css.styleInput} onChange={(e) => handleChangeTipos(e)}>
                    <option value="" disabled selected>Seleccionar...</option>
                    {pokemonsTypesFilter.map((type) => (
                        <option value={type.name}>{type.name}</option>
                    ))}
                </select>
                <div className={css.containerTypePokemon}>
                    {tipos.length > 0 && tipos.map((tipoPokemon) => (
                        <label className={css.typePokemonLabel}>{tipoPokemon}</label>
                    ))}
                </div>
                <input className={css.buttonCrear} value="Crear" onClick={() => onSubmit()}></input>
            </form>
        </div>
    )
};

export const mapStateToProps = (state) => {
    return {
        pokemonsTypes: state.pokemonsTypes,
        pokemonsTypesFilter: state.pokemonsTypesFilter
    }
}

export const mapDispatchToProps = { getPokemonTypes: actions.getPokemonTypes, filterPokemonsTypes: actions.filterPokemonsTypes };

export default connect(mapStateToProps, mapDispatchToProps)(Form);