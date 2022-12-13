import React, {useEffect, useState} from 'react';
import './App.css';
import Pokemon from './components/Pokemon';
import axios from "axios";
import logo from './assets/img.png';

// let op; de api van pokemons laadt 20 pokemons in per pagina, automatisch dus.
//let op: op de pagina van pokemon worden endpoints results, count, next en previous beschreven voor de resultaten, de url en ga naar vorige 20 pokemons en volgende.

function App() {
    const [pokemons, setPokemons] = useState([]);
    const [endpoint, setEndpoint] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [loading, toggleLoading] = useState(true);
    const [error, toggleError] = useState(false);

    function forward() {
        setEndpoint(pokemons.next);
    }

    function backward() {
            setEndpoint(pokemons.previous);
    }

    useEffect(() => {
        toggleLoading(true);
        toggleError(false);
        async function fetchData() {
            try {
                const {data} = await axios.get(endpoint);
                setPokemons(data);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false);
        }

        fetchData();
    }, [endpoint]);


    return (
        <div className="total">
            {loading && <span>Loading...</span>}
            {error && <span>Er is iets misgegaan met het ophalen van de data.</span>}
            <img src={logo} alt="Logo pokemon"/>
            <h1>Pokemon overview ({pokemons.count} pokemons)</h1>
            <section className="button-section">
                <button
                type="button"
                onClick={backward}
                disabled={!pokemons.previous}
                >vorige</button>
                <button
                    type="button"
                    onClick={forward}
                    disabled={!pokemons.next}
                >volgende</button>
            </section>
            <section className="poke-deck">
            {
                // results, zie api documentatie is een endpoint met api resources 
                pokemons.results && pokemons.results.map((pokemon) => {
                    return <Pokemon key={pokemon.name} endpoint={pokemon.url}/>
                })
            }
            </section>
            <section className="button2-section">
                <button
                    type="button"
                    onClick={backward}
                    disabled={!pokemons.previous}
                >vorige</button>
                <button
                    type="button"
                    onClick={forward}
                    disabled={!pokemons.next}
                >volgende</button>
            </section>
        </div>
    )
}

    export default App;