let minPokemon = 1;
let maxPokemon = 30;
let allPkmn = [];
let currentPokemon;

async function init() {
    await loadPokemon();
}

async function loadPokemon() {
    for (let i = minPokemon; i <= maxPokemon; i++) {
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
    setBgrColorPokedex(i);
}

function setBgrColorPokedex(index) {
    for (let j = 0; j < allPkmn.length; j++) {
        generateBgrColor(index, j);
    }
}

function generateBgrColor(index, j) {
    let typeBgr = allPkmn[j]['types'][0]['type']['name'];
    let bgrColor = colors[typeBgr];
    document.getElementById(`pokedexCard${index}`).style.backgroundColor = bgrColor;
}

function openCard(i) {
    let name = allPkmn[i - 1]['name'];
    let type = allPkmn[i - 1]['types'][0]['type']['name'];
    let img = allPkmn[i - 1]['sprites']['other']['official-artwork']['front_default'];
    let number = allPkmn[i - 1]['id'];
    let ability = allPkmn[i - 1]['abilities']['0']['ability']['name'];
    let height = allPkmn[i - 1]['height'];
    let weight = allPkmn[i - 1]['weight'];

    generateCard(i, name, type, img, number, ability, height, weight);
}

function generateCard(i, name, type, img, number, ability, height, weight) {
    document.getElementById('pkmnCard').classList.remove('d-none');
    document.getElementById('pkmnCard').innerHTML = pkmnCardTemplate(i, name, type, img, number, ability, weight, height);
}

function dontCloseCard(event) {
    event.stopPropagation();
}

function closeCard() {
    document.getElementById('pkmnCard').classList.add('d-none');
}

function showPkmnInfo() {
    let ability = currentPokemon['abilities']['0']['ability']['name'];
    let height = currentPokemon['height'];
    let weight = currentPokemon['weight'];

    document.getElementById('infoBox').innerHTML = pkmnAboutCard(ability, weight, height);
}

function showPkmnStats() {
    for (let j = 0; j < allPkmn.length; j++) {
        generatePkmnStats(j);
    }
}

function generatePkmnStats(j) {
    let pkmnStats = allPkmn[j].stats.length;
    document.getElementById('infoBox').innerHTML = chartTemplate(pkmnStats);
    renderChart(pkmnStats);
}

function showPkmnMoves() {
    let container = document.getElementById('infoBox');
    document.getElementById('infoBox').classList.remove('d-none');
    for (let i = 0; i < allPkmn.length; i++) {
        generatePkmnMoves(container, i);
    }
}

function generatePkmnMoves(container, i) {
    const pokemonMove = allPkmn[i].moves;
    container.innerHTML = movesTemplate(pokemonMove);
}

function firstLetterUppercase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
