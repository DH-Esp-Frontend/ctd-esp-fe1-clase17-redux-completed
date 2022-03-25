import React, {FC, useState} from "react";
import {connect, ConnectedProps} from "react-redux";
import {buscarPokemon} from "../actions/pokemonActions";

const mapState = () => ({})

const mapDispatch = {
    buscarPokemon,
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

const BuscarPokemon:FC<PropsFromRedux> = ({buscarPokemon}:PropsFromRedux) => {
    const [text, setText] = useState<string>("");
    const onBuscarClick = () => {
        buscarPokemon(text);
    }

    return (
        <div id="buscarPokemon">
            <label>Buscar pokemon</label>
            <input type="text" placeholder={"Pikachu, Charmander, Ditto, etc"} onChange={(e) => setText(e.target.value)}/>
            <button onClick={() => onBuscarClick()}>Buscar</button>
        </div>
    );
}

export default connector(BuscarPokemon);
