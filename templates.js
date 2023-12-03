function pokedexTemplate(i, name, type, imgSprite) {
    return `
<div onclick="openCard(${i})">
    <div id="pokedexCard${i}" class="pokedex pd-left">
        <div class="pokedex-top">
            <div class="pd-top">
                <h2>${firstLetterUppercase(name)}</h2>
            </div>
        </div>

        <div class="pokedex-bottom">
            <div class="pokedex-type">
                <div class="">${firstLetterUppercase(type)}</div>
            </div>
            <div class="pokedex-img"><img src="${imgSprite}"></div>
        </div>
    </div>
</div>`;
}

function pkmnCardTemplate(i, name, type, img, number, ability, weight, height) {
    return `
    <div id="card" class="content d-none">
        <div id="cardContent" class="card" onclick="dontCloseCard(event)">
            <div id="card-top" class="card-top">
                <div>
                    <div class="name pd-left"><h1>${firstLetterUppercase(name)}</h1></div>
                    <div class="type pd-left">${firstLetterUppercase(type)}</div>
                </div>
                <div>
                    <div class="number pd-right"><h2>${number}</h2></div>
                </div>
            </div>
            <div id="card-mid" class="pkmn-img">
                <img src="${img}">
            </div>
            <div class="arrow-icons">
                <button onclick="previousPkmn()"><img src="icons/arrow-left-solid.svg" alt=""></button>
                <button onclick="nextPkmn()"><img src="icons/arrow-right-solid.svg" alt=""></button>
            </div>
            <div class="card-bottom">
                <div class="info-top">
                    <div onclick="showPkmnInfo()" class="info"><b>About</b></div>
                    <div onclick="showPkmnStats()" class="info"><b>Base Stats</b></div>
                    <div onclick="showPkmnMoves()" class="info"><b>Moves</b></div>
                </div>

                <div id="infoBox">
                    <div id="info" class="info-bottom info-box">
                        <div>Ability: <b>${ability}</b></div>
                        <div>Height: <b>${height}"</b></div>
                        <div>Weight: <b>${weight}kg</b></div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

function pkmnAboutCard(ability, weight, height) {
    return `
    <div id="info" class="info-bottom info-box">
        <div>Ability: <b>${ability}</b></div>
        <div>Height: <b>${height}"</b></div>
        <div>Weight: <b>${weight}kg</b></div>
    </div>;`
}

function chartTemplate(pkmnStats) {
    return `
    <div class="info-bottom info-box">
        <div>
            <canvas id="myChart" class="chart">${pkmnStats}</canvas>
        </div>
    </div>`;
}

function movesTemplate(pokemonMove) {
    return `
    <div id="moves" class="info-bottom info-box" style="overflow-y:scroll;">
        <div class="moves">
            ${pokemonMove['0']['move']['name']}
        </div>
    </div>`;
}