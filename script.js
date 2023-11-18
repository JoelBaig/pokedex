let currentPokemon;

async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/charizard`;
    let response = await fetch(url);
    currentPokemon = await response.json(); //response wird hierdurch in ein json umgewandelt
    renderPokemonCard();
    generatePokedex();
    console.log(currentPokemon);
}

function generatePokedex() {
    document.getElementById('pokedex').innerHTML += `
        <div class="pokedex pd-left">
            <div class="pokedex-top">
                <div class="pd-top">
                    <h2>${currentPokemon['name']}</h2>
                </div>
            </div>

            <div class="pokedex-bottom">
                <div class="pokedex-type">
                    <div class="">${currentPokemon['types']['0']['type']['name']}</div>
                    <div class="">${currentPokemon['types']['1']['type']['name']}</div>
                </div>
                <div class="pokedex-img"><img src="${currentPokemon['sprites']['front_default']}"></div>
            </div>
        </div>`;
}

function renderPokemonCard() {
    let card = document.getElementById('pkmnCard');
    card.innerHTML = pkmnCardTemplate();
}

function pkmnCardTemplate() {
    return `
    <div class="content d-none">
        <div class="card">
            <div class="card-top">
                <div>
                    <div class="name pd-left"><h1>${currentPokemon['name']}</h1></div>
                    <div class="type pd-left">${currentPokemon['types']['0']['type']['name']}</div>
                    <div class="type pd-left">${currentPokemon['types']['1']['type']['name']}</div>
                </div>

                <div>
                    <div class="number pd-right"><h2>${currentPokemon['id']}</h2></div>
                </div>
            </div>

            <div class="pkmn-img">
                <img src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
            </div>

            <div class="card-bottom">
                <div class="info-top">
                    <div onclick="showInfo()" class="info">About</div>
                    <div id="info2" onclick="showInfo()" class="info">Base Stats</div>
                    <div id="info3" onclick="showInfo()" class="info">Evolution</div>
                    <div id="info4" onclick="showInfo()" class="info">Moves</div>
                </div>

                <div id="info1" class="info-bottom d-none">
                    <div>Ability: ${currentPokemon['abilities']['0']['ability']['name']}</div>
                    <div>Height: ${currentPokemon['height']}"</div>
                    <div>Weight: ${currentPokemon['weight']}kg</div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function showInfo() {
    document.getElementById('info1').classList.remove('d-none');
}