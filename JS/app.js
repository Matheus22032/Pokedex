const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;
const pokemonTemplate = document.querySelector('[data-pokemon-template]');
const ul = document.querySelector('[data-js="pokedex"]');

let pokemonsCards = [];


generatePokemonPromise = () => Array(898).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()));

const generateCard = pokemonsPromiseArray => {
   pokemonsCards = pokemonsPromiseArray.map(({ name, id, types, sprites }) => {
        const elemenTypes = types.map(typeInfo => typeInfo.type.name);

        const namePokemon = name[0].toUpperCase() + name.slice(1);
        const idPokemon = id.toString().padStart(3,'0');

        const cardTemplate = pokemonTemplate.content.cloneNode(true).children[0];
        const pokemonSpriteTemplate = cardTemplate.querySelector("#spritePokemon");
        const pokemonNameTemplate = cardTemplate.querySelector('[data-name-pokemon]');
        const pokemonTypeTemplate = cardTemplate.querySelector('[data-type-pokemon]');
        const pokemonIdTemplate = cardTemplate.querySelector('[data-id-pokemon]');

        pokemonSpriteTemplate.src = sprites.front_default;
        pokemonNameTemplate.textContent = `${namePokemon}`;
        pokemonTypeTemplate.textContent = `${elemenTypes.join(" | ")}`;
        cardTemplate.classList.add(elemenTypes[0]);
        pokemonIdTemplate.textContent = `#${idPokemon}`;

        ul.append(cardTemplate);
        return {name, id, elemenTypes, sprites, cardTemplate};
    });
};

const pokemonPromise = generatePokemonPromise();
Promise.all(pokemonPromise)
    .then(generateCard);