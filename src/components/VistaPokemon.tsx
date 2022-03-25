import React, {FC, useEffect} from "react";
import {useQuery} from "react-query";
import {getPokemon} from "../queries/pokemon.queries";
import {connect, ConnectedProps} from "react-redux";
import {IRootState} from "../store/store";
import {Pokemon} from "../types/pokemon.types";

type VistaPokemonDetalleProps = {
    pokemonSeleccionado: Pokemon;
}

const VistaPokemonDetalle:FC<VistaPokemonDetalleProps> = ({pokemonSeleccionado}: VistaPokemonDetalleProps) => {
    const {data: pokemon, isLoading, refetch} = useQuery("obtenerPokemon",
        () => getPokemon(pokemonSeleccionado.name),
        );

    useEffect(() => {
        if (pokemonSeleccionado) {
            refetch();
        }
    }, [refetch, pokemonSeleccionado, pokemonSeleccionado?.name])
    if (isLoading) return <div>Cargando pokemon...</div>

    return pokemon ? (
        <div className="vistaPokemon">
            <h4>Pokemon: {pokemon.name}</h4>
            <h5>#{pokemon.id}</h5>
            <img src={pokemon.sprites.other.home.front_default} alt={pokemon.name}/>
        </div>
    ): null;
}

const mapState = (state: IRootState) => ({
    pokemonSeleccionado: state.pokemon.pokemonSeleccionado
})

const mapDispatch = {}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

const VistaPokemon:FC<PropsFromRedux> = ({pokemonSeleccionado}: PropsFromRedux) => {
    if (!pokemonSeleccionado) return <></>;
    return <VistaPokemonDetalle pokemonSeleccionado={pokemonSeleccionado} />

}


export default connector(VistaPokemon);
