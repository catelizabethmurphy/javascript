import './styles.css'
import { Chart } from 'chart.js/auto' // A complete build of chart.js - not advised for production, but okay for our purposes
import { csvParse } from 'd3' // A single exported module from d3 for reading csv files

async function loadAndChartData() {
  const response = await fetch('data/police_shootings_wide.csv')
	const csvText = await response.text()
	const data = csvParse(csvText)
	console.log(data)
	
  const ctx = document.getElementById('chart')
	console.log(ctx)
    
    Chart.defaults.color = 'white' // sets default font color
	Chart.defaults.font.family = 'PT Sans' // sets default font family
	Chart.defaults.font.size = 15

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
					fill: false
				},
				{
					label: 'Fatal police shootings in Canada',
					data: data.map(d => d['Fatal police shootings (Canada)']),
					borderColor: 'blue',
					fill: false
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
                            weight: 'bold'
                        },
						padding: {
							top: 10,
							bottom: 5
						}
                    },
                    subtitle: {
                        text: 'The annual number of fatal police shootings has risen in both the U.S. and Canada over the last decade.',
                        display: true,
						align: 'start',
                        font: {
                            size: 20,
							family: 'PT Sans Caption',
                            weight: 'normal'
                        },
                        padding: {
                            top: 2,
                            bottom: 40
                        }
                    },
					legend: {
                        position: 'bottom',
						labels: {
							font: {
								size: 20,
								weight: 'normal'
							}
						},
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
								size: 20,
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
								weight: 'bold',
								family: 'PT Sans'
						}
						}
					}
				}
		}
	})
};

async function loadAndChartAASHE() {
  const response = await fetch('data/aashe.csv')
	const csvText = await response.text()
	const data = csvParse(csvText)


  const ctx2 = document.getElementById('barChart')
	console.log(ctx2)

	
	Chart.defaults.color = 'white' // sets default font color
	Chart.defaults.font.family = 'PT Sans' // sets default font family
	Chart.defaults.font.size = 15
	
  new Chart(
	
    ctx2, 
    {
      type: 'bar',
	  data: {
		labels: data.map(d => d.Category),
		datasets: [{
					label: 'Percentage of Points Scored',
					data: data.map(d => d['Percentage of Points Scored']),
				}],
			},
			options: {
				indexAxis: 'y', // this is what makes it horizontal
				scales: {
					x: {
						grid: {
							display: true,
							color: 'rgba(255, 255, 255, 0.2)'
						},
						position: 'top',
						min: 0,
						max: 100,
						title: {
							display: false,
						}
					},
					y: {
						beginAtZero: true,
						title: {
							display: true,
							text: 'Operational Sustainability Category',
							font: {
								size: 20,
								weight: 'bold'
							}
						}
					}
				},
				plugins: {
					title: {
						text: 'Latest sustainability report shows Quinnipiac underperforming in key operational areas',
						display: true,
						position: 'top',
						align: 'start',
						font: {
							size: 35,
							weight: 'bold'
						}
					},
					subtitle: {
						text: 'The university\'s 2025 AASHE STARS report shows it earning just 19% of the available credits for operational sustainability.',
						display: true,
						position: 'top',
						align: 'start',
						font: {
							size: 20,
							family: 'PT Sans Caption',
							weight: 'normal'
						},
						padding: {
							top: 2,
							bottom: 20
						}
					},
					legend: {
						display: true,
						position: 'top',
						labels: {
							font: {
								size: 20,
								weight: 'normal'
							}
						},
						padding: {
							bottom: 30,
						}
					}
				},
				responsive: true
			}
		}
  	)
	};

loadAndChartData();
loadAndChartAASHE()