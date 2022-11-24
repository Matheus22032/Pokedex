const searchInput = document.querySelector('#namePokemon');

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    pokemonsCards.forEach(pokemonCard => {
        const isVisible = pokemonCard.name.includes(value);
        pokemonCard.card.classList.toggle("hide",!isVisible);
    });
});