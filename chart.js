function renderChart(chartData) {
  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar', // or other chart type
    data: {
      labels: chartData.labels,
      datasets: [{
        label: 'Base Stats',
        data: chartData.data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // customize as needed
        borderColor: 'rgba(75, 192, 192, 1)', // customize as needed
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y', // customize chart options as needed
      scales: {
        x: {
          ticks: {
            color: 'white', // Schriftfarbe für die X-Achsenticks
            font: {
              size: 20
            }
          }
        },
        y: {
          ticks: {
            color: 'white', // Schriftfarbe für die Y-Achsenticks
            font: {
              size: 20
            }
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'white', // Schriftfarbe für das Label "Stats"
            font: {
              size: 20
            }
          }
        }
      }
    }
  });
}

function getChartData() {
  // Replace this with the actual data you want to display in the chart
  return {
    labels: ['Label 1', 'Label 2', 'Label 3'],
    data: [10, 20, 30]
  };
}