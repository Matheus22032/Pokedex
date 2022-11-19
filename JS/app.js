const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

generatePokemonPromise = () => Array(10).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()));

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types, sprites }) => {
    const elemenTypes = types.map(typeInfo => typeInfo.type.name);

    accumulator += `
            <li class="card ${elemenTypes[0]}">
                <img class"pokemon-sprite" alt="${name}" src="${sprites.front_default}"/>
                <h2 class="pokemon-name">${id}. ${name}</h2>
                <p class="pokemon-type">${elemenTypes.join(" | ")}</p>
            </li>
            `;
    return accumulator;
}, '');


const insertHTML = listPokemons => {
    const ul = document.querySelector('[data-js="pokedex"]');
    ul.innerHTML = listPokemons;
}

const pokemonPromise = generatePokemonPromise();
Promise.all(pokemonPromise)
    .then(generateHTML)
    .then(insertHTML)

