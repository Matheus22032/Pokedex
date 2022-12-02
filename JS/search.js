const searchInputName = document.querySelector('#namePokemon');

searchInputName.addEventListener("input", e => {
    const namePokemon = e.target.value.toLowerCase();
    pokemonsCards.forEach(pokemonCard => {
        const isVisible = pokemonCard.name.includes(namePokemon);
        pokemonCard.cardTemplate.classList.toggle("hide", !isVisible);
    });
});

const form = document.querySelector('#formSearch');
const searchInputType1 = document.querySelector('#typeOne');
const searchInputType2 = document.querySelector('#typeTwo');
const errorSearch = document.querySelector('#errorSearch');

const searchTypesInCard = type => {
    pokemonsCards.forEach(pokemonCard => {
        const isVisible = pokemonCard.elemenTypes.includes(type);
        pokemonCard.cardTemplate.classList.toggle("hide", !isVisible);
    });
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const typeOne = searchInputType1.value;
    const typeTwo = searchInputType2.value;
    const searchTypesInCard = type => {
        pokemonsCards.forEach(pokemonCard => {
            const isVisible = pokemonCard.elemenTypes.includes(type);
            pokemonCard.cardTemplate.classList.toggle("hide", !isVisible);
        });
    }

    errorSearch.textContent = "";
    pokemonsCards.forEach(pokemonCard => {
        pokemonCard.cardTemplate.classList.remove("hide");
    });

    if (typeTwo == "" & typeOne == "" || typeOne == typeTwo) {
        errorSearch.textContent = "Nenhum tipo foi selecionado ou tipagem invalida";
    } else {
        if (typeTwo != "" & typeOne == "") {
            searchTypesInCard(typeTwo);
        } else {
            if (typeOne != "" & typeTwo != "") {
                pokemonsCards.forEach(pokemonCard => {
                    const isVisible = pokemonCard.elemenTypes.every(typeInfo => {
                        return typeInfo == typeOne || typeInfo == typeTwo
                    })
                        & pokemonCard.elemenTypes.length > 1;
                    pokemonCard.cardTemplate.classList.toggle("hide", !isVisible);
                });
            } else {
                searchTypesInCard(typeOne);
            }
        }
    }
});