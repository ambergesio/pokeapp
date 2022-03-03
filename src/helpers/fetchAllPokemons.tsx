import { pokemonApi } from '../api/pokemonapi';
import { fetchAllPokemonResponse, Pokemon, SmallPokemon } from '../interfaces/fetchAllPokemonResponse';


export const fetchAllPokemons = async (): Promise<Pokemon[]> => {

    const resp = await pokemonApi.get<fetchAllPokemonResponse>('/pokemon?limit=1500');
    const smallPokemonList = resp.data.results;

    return transformSmallPokemonIntoPokemon( smallPokemonList );
    
}

const transformSmallPokemonIntoPokemon = ( smallPokemonList: SmallPokemon[] ): Pokemon[] => {

    const pokemonArray: Pokemon[] = smallPokemonList.map( poke => {

        const singlePokemon = poke.url.split('/');
        const id = singlePokemon[6];
        const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        return {
            id,
            pic,
            name: poke.name
        }
    }) 
    return pokemonArray;
}