import React, {FC, useEffect} from "react";
import ListadoPokemonsItem from "../components/ListadoPokemonsItem";
import {buscarPokemons} from "../queries/pokemon.queries";
import {Pokemon} from "../types/pokemon.types";
import {extractPokemonId} from "../services/pokemon.services";
import {useQuery} from "react-query";
import {connect, ConnectedProps, useSelector} from "react-redux";
import {seleccionarPokemon} from "../actions/pokemonActions";
import {IRootState} from "../store/store";

const mapState = (state: IRootState) => ({
    busqueda: state.pokemon.busqueda
})

const mapDispatch = {
    seleccionarPokemon,
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

/**
 * Visualiza una lista de pokemons
 *
 * Ej:
 * <pre>
 *     <ListadoPokemons />
 *
 * </pre>
 *
 * @author Digital House
 */
const ListadoPokemons:FC<PropsFromRedux> = ({busqueda, seleccionarPokemon}:PropsFromRedux) => {
    // // Utilizamos useQuery para buscar los pokemons con el input que viene de redux
    const {data: pokemons, isLoading, refetch} = useQuery("obtenerPokemons", () => buscarPokemons(busqueda));
    useEffect(() => {
        if (busqueda) {
            refetch();
        }
    },[busqueda, refetch])

    const onSeleccionarPokemon = (pokemon: Pokemon) => {
        seleccionarPokemon(pokemon);
    }

    if (isLoading) return <div>Cargando pokemons...</div>
    return (
        <div id="listadoCategorias">
            {pokemons && pokemons.map((pokemon: Pokemon) => (
                <ListadoPokemonsItem pokemon={pokemon}
                                     seleccionarPokemon={onSeleccionarPokemon}
                                     key={extractPokemonId(pokemon.url)}/>
            ))}
        </div>
    );
}

export default connector(ListadoPokemons);
