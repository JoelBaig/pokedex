function pokedexTemplate(i, name, type, imgSprite) {
    return `
<div onclick="openCard(this)" data-index="${i}">
    <div id="pokedexCard${i}" class="pokedex pd-left">
        <div class="pokedex-top">
            <div class="pd-top">
                <h2>${name}</h2>
            </div>
        </div>

        <div class="pokedex-bottom">
            <div class="pokedex-type">
                <div class="">${type}</div>
            </div>
            <div class="pokedex-img"><img src="${imgSprite}"></div>
        </div>
    </div>
</div>`;
}

function pkmnCardTemplate(name, type, img, number, ability, weight, height) {
    return `
    <div id="card" class="content d-none">
        <div id="cardContent" class="card" onclick="dontCloseCard(event)">
            <div class="card-top">
                <div>
                    <div class="name pd-left"><h1>${name}</h1></div>
                    <div class="type pd-left">${type}</div>
                </div>

                <div>
                    <div class="number pd-right"><h2>${number}</h2></div>
                </div>
            </div>

            <div class="pkmn-img">
                <img src="${img}">
            </div>

            <div class="card-bottom">
                <div class="info-top">
                    <div onclick="showInfo()" class="info"><b>About</b></div>
                    <div onclick="showStats()" class="info"><b>Base Stats</b></div>
                    <div onclick="showMoves()" class="info"><b>Moves</b></div>
                </div>

                <div id="infoBox"></div>
            </div>
        </div>
    </div>`;
}

function pkmnInfoTemplate(ability, height, weight) {
    return `
    <div id="info" class="info-bottom info-box">
        <div>Ability: <b>${ability}</b></div>
        <div>Height: <b>${height}"</b></div>
        <div>Weight: <b>${weight}kg</b></div>
    </div>`;
}


function chartTemplate() {
    return `
    <div class="info-bottom info-box">
        <div>
            <canvas id="myChart" class="chart"></canvas>
        </div>
    </div>`;
}