function renderChart(i) {
    let ctx = document.getElementById(`myChart${i}`);

    new Chart(ctx, {
        type: 'bar',
        label: 'Base Stats',
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'],
            datasets: [{
                data: [allPkmn[`${i - 1}`]['stats'][0]['base_stat'],
                allPkmn[`${i - 1}`]['stats'][1]['base_stat'],
                allPkmn[`${i - 1}`]['stats'][2]['base_stat'],
                allPkmn[`${i - 1}`]['stats'][3]['base_stat'],
                allPkmn[`${i - 1}`]['stats'][4]['base_stat'],
                allPkmn[`${i - 1}`]['stats'][5]['base_stat']],

                fill: false,
                backgroundColor: [
                    'rgba(95, 192, 192, 0.9)'
                ],
                borderColor: [
                    'rgb(153, 102, 255)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            base: 0,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false,
                    }
                },
                x: {
                    max: 140,
                    grid: {
                        display: false,
                    }
                }
            }
        }
    });
}