import './styles.css'
import { Chart } from 'chart.js/auto' // A complete build of chart.js - not advised for production, but okay for our purposes
import { csvParse } from 'd3' // A single exported module from d3 for reading csv files

async function loadAndChartData() {
  const response = await fetch('data/police_shootings_wide.csv')
	const csvText = await response.text()
	const data = csvParse(csvText)
	
  const ctx = document.getElementById('chart')
	console.log(ctx)
    
    Chart.defaults.color = 'white' // sets default font color

  new Chart(
    ctx, 
    {
      type: 'line',
      data: {
        labels: data.map(d => d.Year),
				datasets: [{
					label: 'Fatal police shootings in the U.S.',
					data: data.map(d => d['Fatal police shootings (US)']),
					borderColor: 'red',
					fill: true
				},
				{
					label: 'Fatal police shootings in Canada',
					data: data.map(d => d['Fatal police shootings (Canada)']),
					borderColor: 'blue',
					fill: true
				}],
      },
			options: {
				plugins: { // how we access our legend
                    title: {
                        text: 'Fatal Police Shootings in the U.S. vs. Canada (2015-2021)',
                        display: true,
                        position: 'top',
                        align: 'start',
                        font: {
                            size: 35,
							family: 'PT Sans',
                            weight: 'bold'
                        }
                    },
                    subtitle: {
                        text: 'Despite increased awareness and calls for reform, the annual number of fatal police shootings in the U.S. has risen since 2016, nearly reaching 1,100 in 2022',
                        display: true,
						align: 'start',
                        font: {
                            size: 20,
							family: 'PT Sans',
                            weight: 'bold'
                        },
                        padding: {
                            top: 2,
                            bottom: 30
                        }
                    },
					legend: {
                        position: 'bottom',
						labels: {
							font: {
								size: 20,
								family: 'PT Sans',
								weight: 'normal'
							}
						}
					}
				},
				responsive: true,
				scales: { // where our axis options live
					y: {
						beginAtZero: true,
						title: {
							display: true,
							text: 'Number of Shootings',
							font: {
								size: 16,
								weight: 'bold'
							}
						}
					},
					x: {
						title: {
							display: true,
							text: 'Year',
							font: {
								size: 16,
								weight: 'bold'
							}
						}
					}
				}
			}
    } 
  )
}

loadAndChartData()