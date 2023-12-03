async function renderChart(pkmnStats) {
const ctx = document.getElementById('myChart').getContext('2d');
  let pkmn = ['HP', 'Attack', 'Defense', 'Sp.Atk', 'Sp.Def', 'Speed', 'Total'];
  
  await new Chart(ctx, {
    type: 'bar',
    data: {
      labels: pkmn,
      datasets: [{
        label: 'Base Stats',
        data: pkmnStats,
        backgroundColor: 'blue',
        borderColor: 'blue',
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        x: {
          display: false,
        },
        y: {
          ticks: {
            color: 'white',
            font: {
              size: 11
            }
          },
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'white',
            font: {
              size: 11
            }
          }
        }
      }
    }
  });
}

