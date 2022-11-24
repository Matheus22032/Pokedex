const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;
const pokemonTemplate = document.querySelector('[data-pokemon-template]');
const ul = document.querySelector('[data-js="pokedex"]');

let pokemonsCards = [];

generatePokemonPromise = () => Array(898).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()));

const generateCard = pokemonsPromiseArray => {
   pokemonsCards = pokemonsPromiseArray.map(({ name, id, types, sprites }) => {
        const elemenTypes = types.map(typeInfo => typeInfo.type.name);

        const card = pokemonTemplate.content.cloneNode(true).children[0];
        const pokemonSprite = card.querySelector("#spritePokemon");
        const pokemonName = card.querySelector('[data-name-pokemon]');
        const pokemonType = card.querySelector('[data-type-pokemon]');

        pokemonSprite.src = sprites.front_default;
        pokemonName.textContent = `${id}. ${name}`;
        pokemonType.textContent = `${elemenTypes.join(" | ")}`;
        card.classList.add(elemenTypes[0]);

        ul.append(card);
        return {name, id, elemenTypes, sprites, card};
    });
};

const pokemonPromise = generatePokemonPromise();
Promise.all(pokemonPromise)
    .then(generateCard);
