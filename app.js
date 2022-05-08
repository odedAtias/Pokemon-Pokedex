// Global state variables block
const [container, button, colors] = [
	document.getElementById('main-container'),
	document.getElementById('btn'),
	{
		normal: '#A8A77A',
		fire: '#EE8130',
		water: '#6390F0',
		electric: '#F7D02C',
		grass: '#7AC74C',
		ice: '#96D9D6',
		fighting: '#C22E28',
		poison: '#A33EA1',
		ground: '#E2BF65',
		flying: '#A98FF3',
		psychic: '#F95587',
		bug: '#A6B91A',
		rock: '#B6A136',
		ghost: '#735797',
		dragon: '#6F35FC',
		dark: '#705746',
		steel: '#B7B7CE',
		fairy: '#D685AD',
	},
];

let [pokeIndex, numOfPokemons] = [1, 0];

// Functions block
const fetchPokemones = async requiredNumOfPokemons => {
	for (let i = 1; i <= requiredNumOfPokemons; i++)
		await getPokemon(numOfPokemons + i);
	numOfPokemons += requiredNumOfPokemons;
};

//Get Pokemon
const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const response = await fetch(url);
	const data = await response.json();
	createPokemonCard(data);
};

const createPokemonCard = pokemon => {
	const [pokemonName, pokeElement, pokemonId, pokemonType] = [
		pokemon.name.toUpperCase(),
		document.createElement('div'),
		getPokemonId(pokemon),
		pokemon.types[0].type.name,
	];

	pokeElement.innerHTML += ` <div class="pokemon" style="background-color:${
		colors[`${pokemonType}`]
	}">
        <div class="img-container">
         <img src='https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId}.png'/>
    </div>
    <div class="info">
        <span class="number">#${pokemonId}</span>
        <h3 class="name">${pokemonName}</h3>
        <small class="type">Type: <span>${pokemonType}</span></small>
    </div>
</div>`;
	container.appendChild(pokeElement);
};

const getPokemonId = pokemon => {
	if (String(pokemon.id).length == '1') return '00' + pokemon.id;
	else if (String(pokemon.id).length == '2') return '0' + pokemon.id;
	else return pokemon.id;
};

button.addEventListener('click', () => {
	fetchPokemones(30);
});

fetchPokemones(30);
