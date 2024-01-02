let minPokemon = 1;
let maxPokemon = 50;
let allPkmn = [];
let allPkmnMoves = [];
let allPkmnStats = [];
let currentPokemonIndex = 1;

async function init() {
    await loadPokemon();

    const input = document.getElementById('myInput');
    input.addEventListener('input', searchPokemon);

    window.addEventListener('scroll', handleScroll);

    document.getElementById('loadMorePkmn').addEventListener('click', loadMorePokemon);
}

async function loadPokemon() {
    for (let i = currentPokemonIndex; i <= currentPokemonIndex + maxPokemon - 1; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        allPkmn.push(currentPokemon);
        allPkmnMoves.push(currentPokemon.moves);
        allPkmnStats.push(currentPokemon.stats.base_stat);

        renderPokedex(i, currentPokemon);
        console.log(currentPokemon);
    }
    currentPokemonIndex += maxPokemon;
}

async function loadMorePokemon() {
    document.getElementById('loadingBall').classList.remove('d-none');
    await loadPokemon();
}

function loadingScreen() {
    document.getElementById('')
}

async function renderPokedex(i) {
    let currentPokemon = allPkmn[i - 1];
    let name = currentPokemon['name'];
    let type = currentPokemon['types'][0]['type']['name'];
    let imgSprite = currentPokemon['sprites']['front_default'];
    let id = currentPokemon['id'];
    let secondType = null;

    if (currentPokemon['types'].length > 1) {
        secondType = currentPokemon['types'][1]['type']['name'];
    }

    document.getElementById('pokedex').innerHTML += pokedexTemplate(i, name, type, imgSprite, id, secondType);
    generateBgrColorPokedex(i);
}

function generateSecondTypeContainer(secondType) {
    if (secondType) {
        return `<div class="types">${firstLetterUpperCase(secondType)}</div>`;
    } else {
        return '';
    }
}

function generateBgrColorPokedex(index) {
    let typeBgrPokedex = allPkmn[index - 1]['types'][0]['type']['name'];
    let bgrColor = colors[typeBgrPokedex];

    document.getElementById(`pokedexCard${index}`).style.backgroundColor = bgrColor;
}

function generateBgrColorCard(index) {
    let typeBgrPokedex = allPkmn[index - 1]['types'][0]['type']['name'];
    let bgrColor = colors[typeBgrPokedex];

    document.getElementById(`card-top${index}`).style.backgroundColor = bgrColor;
    document.getElementById(`card-mid${index}`).style.backgroundColor = bgrColor;
}

function openCard(i) {
    let name = allPkmn[i - 1]['name'];
    let type = allPkmn[i - 1]['types'][0]['type']['name'];
    let img = allPkmn[i - 1]['sprites']['other']['official-artwork']['front_default'];
    let id = allPkmn[i - 1]['id'];
    let ability = allPkmn[i - 1]['abilities']['0']['ability']['name'];
    let height = allPkmn[i - 1]['height'];
    let weight = allPkmn[i - 1]['weight'];
    let moves = allPkmn[i - 1]['moves'];
    let stats = allPkmn[i - 1]['stats'];
    allPkmnMoves.push(moves);
    allPkmnStats.push(stats);

    document.getElementById('body').classList.add('overflow');
    generateCard(i, name, type, img, id, ability, height, weight);
    generateBgrColorCard(i);
    showPkmnInfo(i);
    renderChart(i);
}

function generateCard(i, name, type, img, id, ability, height, weight) {
    document.getElementById('pkmnCard').classList.remove('d-none');
    document.getElementById('pkmnCard').innerHTML = pkmnCardTemplate(i, name, type, img, id, ability, weight, height);
}

function dontCloseCard(event) {
    event.stopPropagation();
}

function closeCard() {
    document.getElementById('pkmnCard').classList.add('d-none');
    document.getElementById('body').classList.remove('overflow');
}

function showPkmnInfo(index) {
    let ability = allPkmn[index - 1]['abilities']['0']['ability']['name'];
    let height = allPkmn[index - 1]['height'];
    let weight = allPkmn[index - 1]['weight'];

    document.getElementById('infoBox').innerHTML = pkmnAboutCard(ability, weight, height);
}

function showPkmnStats(index) {
    document.getElementById('about').classList.remove('about-underline');
    let content = document.getElementById('infoBox');
    content.innerHTML = '';
    content.innerHTML += statsTemplate(index);
    renderChart(index);
}

function showPkmnMoves(index) {
    document.getElementById('about').classList.remove('about-underline');
    let content = document.getElementById('infoBox');
    let movesHTML = '';
    let pkmnMoves = allPkmnMoves[index - 1];

    for (let i = 0; i < pkmnMoves.length; i++) {
        let moveName = pkmnMoves[i].move.name;
        movesHTML += `${firstLetterUpperCase(moveName)}, `;
    }

    content.innerHTML = movesTemplate(movesHTML.slice(0, -2));
}

function nextPkmn(index) {
    if (index < allPkmn.length - 1) {
        index++;
    } else {
        index = 1;
    }
    openCard(index);
}

function previousPkmn(index) {
    if (index > 1) {
        index--;
    } else {
        index = allPkmn.length;
    }
    openCard(index);
}

function searchPokemon() {
    const input = document.getElementById('myInput');
    const filter = input.value.toLowerCase();
    const pokedex = document.getElementById('pokedex');
    const cards = pokedex.getElementsByClassName('pokedex');

    for (let i = 0; i < cards.length; i++) {
        const name = cards[i].getElementsByTagName('h2')[0].innerText.toLowerCase();
        if (name.startsWith(filter)) {
            cards[i].style.display = '';
        } else {
            cards[i].style.display = 'none';
        }
    }
}

function handleScroll() {
    let arrow = document.getElementById('arrowUp');
    let scroll = window.scrollY;

    if (scroll >= 100) {
        arrow.classList.remove('d-none');
    } else {
        arrow.classList.add('d-none');
    }
}

function scrollToTop() {
    window.scrollTo(0, 0);
}

function pkmnIdFormatter(num) {
    if (num < 0) {
        return '#' + '-' + num.toString().padStart(3, '0');
    } else {
        return '#' + num.toString().padStart(3, '0');
    }
}

function firstLetterUpperCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function heightFormatter(num) {
    return Math.abs(num) < 2000 ? Math.sign(num) * ((Math.abs(num) / 10).toFixed(2)) + ' m' : Math.sign(num) * Math.abs(num);
}

function weightFormatter(num) {
    return Math.abs(num) < 2000 ? Math.sign(num) * ((Math.abs(num) / 10).toFixed(2)) + ' kg' : Math.sign(num) * Math.abs(num);
}
