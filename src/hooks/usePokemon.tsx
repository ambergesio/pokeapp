import { useEffect, useState } from "react"
import { fetchAllPokemons } from "../helpers/fetchAllPokemons";
import { Pokemon } from "../interfaces/fetchAllPokemonResponse";

export const usePokemon = () => {
    const [ isLoading, setIsLoading] = useState(true);
    const [ allPokemons, setAllPokemons] = useState<Pokemon[]>([]);

    useEffect( () => {
        fetchAllPokemons()
        .then( pokemons =>  {
            setIsLoading(false);
            setAllPokemons( pokemons );
        })
    }, []);

    return { isLoading, allPokemons };
}