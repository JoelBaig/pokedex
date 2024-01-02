function pokedexTemplate(i, name, type, imgSprite, id, secondType) {
    return `
            <div onclick="openCard(${i})" data-index="${i}" id="pokedexCard${i}" class="pokedex pd-left">
                <div class="pokedex-top">
                    <div class="pd-top name-con">
                        <h2>${firstLetterUpperCase(name)}</h2>
                        <div class="pd-right">${pkmnIdFormatter(id)}</div>
                    </div>
                </div>
                <div class="pokedex-bottom">
                    <div class="pokedex-type">
                        <div class="types">${firstLetterUpperCase(type)}</div>
                        <div>${generateSecondTypeContainer(secondType)}</div>
                    </div>
                    <div class="pokedex-img">
                        <img class="pokemon-sprite" src="${imgSprite}">
                        <img class="bgr-pokeball" src="img/pokeball.png">
                    </div>
                </div>
            </div>`;
}

function pkmnCardTemplate(i, name, type, img, id, ability, weight, height) {
    return `
    <div id="card" class="content d-none">
        <div id="cardContent" class="card" onclick="dontCloseCard(event)">
            <div id="card-top${i}" class="card-top">
                <div>
                    <div class="name pd-left"><h1>${firstLetterUpperCase(name)}</h1></div>
                    <div class="type pd-left">${firstLetterUpperCase(type)}</div>
                </div>
                <div>
                    <div class="number pd-right pd-top"><h2>${pkmnIdFormatter(id)}</h2></div>
                </div>
            </div>
            <div id="card-mid${i}" class="pkmn-img">
                <img src="${img}">
            </div>
            <div class="arrow-icons">
                <button onclick="previousPkmn(${i})"><img src="icons/arrow-left-solid.svg" alt=""></button>
                <button onclick="nextPkmn(${i})"><img src="icons/arrow-right-solid.svg" alt=""></button>
            </div>
            <div class="card-bottom">
                <div class="info-top">
                    <div onclick="showPkmnInfo(${i})" class="info about-underline" id="about" tabindex="0"><b>About</b></div>
                    <div onclick="showPkmnStats(${i})" class="info" tabindex="0"><b>Base Stats</b></div>
                    <div onclick="showPkmnMoves(${i})" class="info" tabindex="0"><b>Moves</b></div>
                </div>

                <div id="infoBox">
                    <div id="info" class="info-bottom info-box">
                        <div class="about-con">Ability: <b>${firstLetterUpperCase(ability)}</b></div>
                        <div class="about-con">Height:  <b>${heightFormatter(height)}</b></div>
                        <div class="about-con">Weight:  <b>${weightFormatter(weight)}</b></div>
                    </div>
                </div>
                <div class="close-icon-con d-none">
                    <img onclick="closeCard()" id="closeIcon" class="close-icon" src="icons/x-mark.png" alt="X">
                </div>
            </div>
        </div>
    </div>`;
}

function pkmnAboutCard(ability, weight, height) {
    return `
    <div id="info" class="info-bottom info-box">
        <div class="about-con">Ability: <b>${firstLetterUpperCase(ability)}</b></div>
        <div class="about-con">Height:  <b>${heightFormatter(height)}</b></div>
        <div class="about-con">Weight:  <b>${weightFormatter(weight)}</b></div>
    </div>`
}

function statsTemplate(i) {
    return `
    <div id="stats" class="info-bottom info-box" style="overflow-y:scroll;">
        <canvas id="myChart${i}"></canvas>
    </div>`;
}

function movesTemplate(movesHTML) {
    return `
    <div id="moves" class="info-bottom info-box" style="overflow-y:scroll;">
        <div class="moves">${movesHTML}</div>
    </div>`;
}