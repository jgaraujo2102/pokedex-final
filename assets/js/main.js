const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modalBody = document.getElementById('modal');
const modal = document.getElementById('open-modal');
const fade = document.getElementById('fade');


const maxRecords = 151
const limit = 10
let offset = 0;


function loadModal(id) {
    pokeApi.getPokemon(id).then((pokemon) => {
        const newHtml = `
            <div class="modal-card ${pokemon.type}">
                <!-- <div id="fade"></div> -->
                <button id="close-modal" onClick=modal.style.display="none"><img src="./assets/img/close-img.svg" alt=""></button>
            
                <div class="modal-header">
                    <h1 class="pokemon-name">${pokemon.name}</h1>
                    <!-- <p class="pokemon-number">#001</p> -->

                    <div class="modal-types">
                        ${pokemon.types
                            .map((type) => `<p class="modal-type ${type}">${type}</p>`)
                            .join('')}
                    </div>
                </div>

                <img class="pokemon-image" src="${pokemon.photo}" alt="${pokemon.name}">

                <div class="modal-body">
                    <div class="modal-detail">
                        <P>Base Experience <span class="modal-detail-text">${pokemon.baseExperience}</span></p>
                        <p>Height <span class="modal-detail-text">${pokemon.height} m</span></p>
                        <p>Weight <span class="modal-detail-text">${pokemon.weight.toFixed(1)} kg</span></p>
                        <p>Abilities <span class="modal-detail-text">${pokemon.abilities}</span></p>
                    </div>
                </div>
            </div>
        `;

        modalBody.innerHTML = newHtml;

        return modal.style.display = "block";
    })
}


function convertPokemonToLi(pokemon) {
    return `
    <li id="${pokemon.number}" class="pokemon ${pokemon.type}" onClick="loadModal(this.id)">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
    
    <div class="detail">
        <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
    
        <img src="${pokemon.photo}"
            alt="${pokemon.name}">
    </div>
</li>
`
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})