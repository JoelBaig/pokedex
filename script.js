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

    window.addEventListener('scroll', handleScrollTop);
    window.addEventListener('scroll', handleScrollBottom);

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

    displayPokemonCard(name, type, img, id, ability, height, weight, i);
}

function displayPokemonCard(name, type, img, id, ability, height, weight, i) {
    hideArrows();
    generateCard(i, name, type, img, id, ability, height, weight);
    generateBgrColorCard(i);
    showPkmnInfo(i);
    renderChart(i);
}

function closeCard() {
    document.getElementById('pkmnCard').classList.add('d-none');
}

function hideArrows() {
    document.getElementById('body').classList.add('overflow');
    document.getElementById('arrowUp').classList.add('d-none');
    document.getElementById('arrowDown').classList.add('d-none');
}

function generateCard(i, name, type, img, id, ability, height, weight) {
    document.getElementById('pkmnCard').classList.remove('d-none');
    document.getElementById('pkmnCard').innerHTML = pkmnCardTemplate(i, name, type, img, id, ability, weight, height);
}

// dont closes the card if clicking on it
function dontCloseCard(event) {
    event.stopPropagation();
}

// closes card when clicking on body
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

// shows pokemon stats in chart
function showPkmnStats(index) {
    document.getElementById('about').classList.remove('about-underline');
    let content = document.getElementById('infoBox');
    content.innerHTML = '';
    content.innerHTML = statsTemplate(index);
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
    let input = document.getElementById('myInput');
    let filter = input.value.toLowerCase();
    let pokedex = document.getElementById('pokedex');
    let cards = pokedex.getElementsByClassName('pokedex');

    for (let i = 0; i < cards.length; i++) {
        let name = cards[i].getElementsByTagName('h2')[0].innerText.toLowerCase();
        if (name.startsWith(filter)) {
            cards[i].style.display = '';
        } else {
            cards[i].style.display = 'none';
        }
    }
}

function handleScrollTop() {
    let arrow = document.getElementById('arrowUp');
    let scroll = window.scrollY;

    if (scroll >= 100) {
        arrow.classList.remove('d-none');
    } else {
        arrow.classList.add('d-none');
    }
}

function handleScrollBottom() {
    let arrow = document.getElementById('arrowDown');
    let scroll = window.scrollY;

    if (scroll > 120) {
        arrow.classList.remove('d-none');
    } else {
        arrow.classList.add('d-none');
    }
}

function scrollToTop() {
    window.scrollTo(0, 0);
}

function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
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

//loads more pokemon
async function loadMorePokemon() {
    showLoadingScreen();
    await loadPokemon();
    hideLoadingScreen();
}

//shows loading screen
function showLoadingScreen() {
    hideArrows();
    document.getElementById('loadingBall').classList.remove('d-none');
    document.getElementById('loadingBallCon').classList.remove('d-none');
    document.getElementById('loadingTxt').classList.remove('d-none');
    document.getElementById('loadingBallCon').classList.add('blur');
    document.getElementById('body').classList.add('overflow');
}

//hides loading screen
function hideLoadingScreen() {
    document.getElementById('loadingBall').classList.add('d-none');
    document.getElementById('loadingBallCon').classList.add('d-none');
    document.getElementById('loadingTxt').classList.add('d-none');
    document.getElementById('loadingBallCon').classList.remove('blur');
    document.getElementById('body').classList.remove('overflow');
}

