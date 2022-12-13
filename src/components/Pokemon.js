import React, {useEffect, useState} from 'react';
import './Pokemon.css';
import axios from "axios";

function Pokemon({endpoint}) {
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const {data} = await axios.get(endpoint);
                console.log({data});
                setPokemon(data);
            } catch (e) {
                console.error(e);
            }
        }

        if (pokemon) {
            fetchData();
        }
    }, [endpoint]);


    // The Object.keys() method returns an array of a given object's own enumerable string-keyed property names.
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

    return (
        <div className="poke-card">
            {Object.keys(pokemon).length > 0 &&
                <>
                    <h2>{pokemon.name}</h2>
                    <img
                        alt="Image pokemon"
                        src={pokemon.sprites.front_default}
                    />
                    <p><strong>Moves: </strong>{pokemon.moves.length}</p>
                    <p><strong>Weight: </strong>{pokemon.weight}</p>
                    <p><strong>Abilities: </strong></p>
                    <ul>
                        {pokemon.abilities.map((ability) => {
                            return (
                                <li key={`${ability.ability.name}-${pokemon.name}`}>
                                    {ability.ability.name}
                                </li>
                            )
                        })}
                    </ul>
                </>
            }
        </div>
    );
}

export default Pokemon;