let loadedPokemon = 0;
let maxPokemon = 50;
let allPkmn = [];
let currentPokemon;

function init() {
    loadPokemon();
    renderChart();
}

async function loadPokemon() {
    for (let i = loadedPokemon + 1; i <= maxPokemon; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPkmn.push(currentPokemon);
        renderPokedex(i, currentPokemon);
        console.log(currentPokemon);
    }
}

function renderPokedex(i) {
    currentPokemon = allPkmn[i - 1];
    let name = currentPokemon['name'];
    let type = currentPokemon['types']['0']['type']['name'];
    let imgSprite = currentPokemon['sprites']['front_default'];

    document.getElementById('pokedex').innerHTML += pokedexTemplate(i, name, type, imgSprite);
    setBgrColor(i);
}

function setBgrColor(i) {
    for (let j = 0; j < allPkmn.length; j++) {
        let typeBgr = allPkmn[j]['types'][0]['type']['name'];
        let bgrColor = colors[typeBgr];

        document.getElementById(`pokedexCard${i}`).style.backgroundColor = bgrColor;
    }
}

function openCard(element) {
    let index = element.getAttribute('data-index');
    currentPokemon = allPkmn[index - 1];
    let name = currentPokemon['name'];
    let type = currentPokemon['types']['0']['type']['name'];
    let img = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    let number = currentPokemon['id'];

    document.getElementById('pkmnCard').classList.remove('d-none');
    document.getElementById('pkmnCard').innerHTML = pkmnCardTemplate(name, type, img, number);
}

function dontCloseCard(event) {
    event.stopPropagation();
}

function closeCard() {
    document.getElementById('pkmnCard').classList.add('d-none');
}

function showInfo() {
    let ability = currentPokemon['abilities']['0']['ability']['name'];
    let height = currentPokemon['height'];
    let weight = currentPokemon['weight'];

    document.getElementById('infoBox').innerHTML = pkmnInfoTemplate(ability, height, weight);
}

function showStats() {
    document.getElementById('infoBox').innerHTML = chartTemplate();
    const chartData = getChartData();
    renderChart(chartData);
}

function showMoves() {
    document.getElementById('infoBox').classList.remove('d-none');
    document.getElementById('infoBox').innerHTML = `
    <div id="moves" class="info-bottom info-box class="d-none"">Moin</div>`;
}

