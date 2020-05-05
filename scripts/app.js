
function init() {
  //! the below constants find and select various elements of the DOM
  const titleState = document.querySelector('#titleState')
  const titleDate = document.querySelector('#titleDate')

  const mainData = document.querySelector('#mainData')
  const extraData = document.querySelector('#extraData')

  const stateSelector = document.querySelector('#selector')
  const dateSelector = document.querySelector('#date')

  const ctx = document.getElementById('myChart')

  //! these variables keep track of what US State and date are currently selected
  let selState = 'US'
  let selDate = 'Current'

  //! these variables store the data for page and graph
  let data = []
  let stateInfo = []
  let graphData = []
  let dateData = []
  let deathData = []
  let infectionData = []
  let hospitalizedData = []
  let recoveredData = []

  //! these functions make requests to the covidtracking api
  async function getUSCurrent() {
    const response = await fetch('https://covidtracking.com/api/v1/us/current.json')
    data = await response.json()
    displayMain()
    titleState.innerHTML = 'US Overall'
    titleDate.innerHTML = 'Current'
    selState = 'US'
    selDate = 'Current'
  }

  async function getUSDaily() {
    const response = await fetch('https://covidtracking.com/api/v1/us/daily.json')
    graphData = await response.json()
    createGraphData()
  }

  async function getStateCurrent(name) {
    const response = await fetch(`https://covidtracking.com/api/v1/states/${name}/current.json`)
    data = [await response.json()]
    displayStateCurrent()
    selState = name
    selDate = 'Current'
  }

  async function getStateDaily(name) {
    const response = await fetch(`https://covidtracking.com/api/v1/states/${name}/daily.json`)
    graphData = await response.json()
    createGraphData()
  }

  async function getStateInfo(name) {
    const response = await fetch(`https://covidtracking.com/api/v1/states/${name}/info.json`)
    stateInfo = await response.json()
    titleState.innerHTML = stateInfo.name
    if (selDate !== 'Current') {
      titleDate.innerHTML = moment(selDate, 'YYYYMMDD').format('MMM Do YYYY')
    } else titleDate.innerHTML = selDate
  }

  async function getUSDate(date) {
    const response = await fetch(`https://covidtracking.com/api/v1/us/${date}.json`)
    data = [await response.json()]
    displayDate()
    titleState.innerHTML = 'US Overall'
    titleDate.innerHTML = moment(date, 'YYYYMMDD').format('MMM Do YYYY')
    selState = 'US'
    selDate = date
  }

  async function getStateDate(name, date) {
    const response = await fetch(`https://covidtracking.com/api/v1/states/${name}/${date}.json`)
    data = [await response.json()]
    displayDate()
    titleState.innerHTML = stateInfo.name
    titleDate.innerHTML = moment(date, 'YYYYMMDD').format('MMM Do YYYY')
    selState = name
    selDate = date
  }

  //! these functions converted the collected data into html to be displayed on the page
  function displayMain() {
    const htmlArray = data.map(datum => {
      Object.keys(datum).forEach(function(key) {
        if (datum[key] === null) {
          datum[key] = 'No data'
        }
      })
      return `<article>
      <section class="set">
      <h3 class="title is-5">Test Results</h3>
      <p class="datum">
      <div class="has-text-weight-semibold">Positive: ${datum.positive}</div>
      <div>(Total cumulative positive test results)</div>
      </p>
      <p>
      <div class="has-text-weight-semibold">Negative: ${datum.negative}</div>
      <div>(Total cumulative negative test results)</div>
      </p>
      <p>
      <div class="has-text-weight-semibold">Pending: ${datum.pending}</div>
      <div>(Tests that have been submitted to a lab but no results have been reported yet)</div>
      </p>
      <p>
      <div class="has-text-weight-semibold">Total Test Results: ${datum.totalTestResults}</div>
      <div>(Calculated value (positive + negative) of total test results)</div>
      </p>
      </section>
      <section class="set">
      <h3 class="title is-5">Impact</h3>
      <p>
      <div class="has-text-weight-semibold">Recovered: ${datum.recovered}</div>
      <div>(Total number of individuals that have tested negative after a previous positive test)</div>
      </p>
      <p>
      <div class="has-text-weight-semibold">Deaths: ${datum.death}</div>
      <div>(Total cumulative number of people that have died)</div>
      </p>
      <p>
      <div class="has-text-weight-semibold">Hospitalized: ${datum.hospitalized}</div>
      <div>(Total cumulative number of people hospitalized)</div>
      </p>
      </section>
      <section class="set">
      <h3 class="title is-5">Hospital Figures</h3>
      <p>
      <div class="has-text-weight-semibold">Hospitalized Currently: ${datum.hospitalizedCurrently}</div>
      <div>(Number of individuals currently hospitalized)</div>
      </p>
      <p>
      <div class="has-text-weight-semibold">Hospitalized Cumulatively: ${datum.hospitalizedCumulative}</div>
      <div>(Total number of individuals that have been hospitalized, including those that have been discharged)</div>
      </p>
      <p>
      <div class="has-text-weight-semibold">In ICU Currently: ${datum.inIcuCurrently}</div>
      <div>(Number of individuals currently in an ICU)</div>
      </p>
      <p>
      <div class="has-text-weight-semibold">In ICU Cumulatively: ${datum.inIcuCumulative}</div>
      <div>(Total number of individuals that have been in the ICU)</div>
      </p>
      <p>
      <div class="has-text-weight-semibold">On Ventilator Currently: ${datum.onVentilatorCurrently}</div>
      <div>(Number of individuals currently on a ventilator)</div>
      </p>
      <p>
      <div class="has-text-weight-semibold">On Ventilator Cumulatively: ${datum.onVentilatorCumulative}</div>
      <div>(Total number of individuals that have been on a ventilator)</div>
      </p>
      </section>
      </article>`
    })
    mainData.innerHTML = htmlArray.join('')
  }


  function displayStateCurrent() {
    displayMain()
    const htmlArray = data.map(datum => {
      Object.keys(datum).forEach(function(key) {
        if (datum[key] === null) {
          datum[key] = 'No data'
        }
      })
      return `
      <section class="set">
      <h3 class="title is-5">Data Quality</h3>
      <p>
      <div class="has-text-weight-semibold">Data Quality Grade: ${datum.dataQualityGrade}</div>
      <div>(Letter grade based on our state grading)</div>
      </p>
      </section>`
      
    })
    extraData.innerHTML = htmlArray.join('')
  }

  function displayDate() {
    displayMain()
    const htmlArray = data.map(datum => {
      Object.keys(datum).forEach(function(key) {
        if (datum[key] === null) {
          datum[key] = 'No data'
        }
      })
      return `
      <section class="set">
      <h3 class="title is-5">Increases from the Day Before</h3>
      <p>
      <div class="has-text-weight-semibold">Death Increase: ${datum.deathIncrease}</div>
      </p>
      <p>
      <div class="has-text-weight-semibold">Hospitalized Increase: ${datum.hospitalizedIncrease}</div>
      </p>
      <p>
      <div class="has-text-weight-semibold">Negative Tests Increase: ${datum.negativeIncrease}</div>
      </p>
      <p>
      <div class="has-text-weight-semibold">Positive Tests Increase: ${datum.positiveIncrease}</div>
      </p>
      <p>
      <div class="has-text-weight-semibold">Total Test Results Increase: ${datum.totalTestResultsIncrease}</div>
      </p>
      </section>
      `
    })
    extraData.innerHTML = htmlArray.join('')
  }

  //! this function creates and updates the graph
  function createGraphData() {
    dateData = graphData.map(day => {
      return moment(day.date, 'YYYYMMDD').format('MMM Do YYYY')
    }).reverse()
    infectionData = graphData.map(day => {
      return day.positive
    }).reverse()
    deathData = graphData.map(day => {
      if (!day.death) {
        return 0
      } else return day.death
    }).reverse()
    recoveredData = graphData.map(day => {
      if (!day.recovered) {
        return 0
      } else return day.recovered
    }).reverse()
    hospitalizedData = graphData.map(day => {
      if (!day.hospitalized) {
        return 0
      } else return day.hospitalized
    }).reverse()

    const myChart = new Chart(document.getElementById('myChart'), {
      type: 'line',
      data: {
        labels: [...dateData],
        datasets: [{ 
          data: [...deathData],
          label: 'Deaths',
          borderColor: '#3e95cd',
          fill: false
        }, { 
          data: [...infectionData],
          label: 'Infections (postive tests)',
          borderColor: '#8e5ea2',
          fill: false
        }, { 
          data: [...hospitalizedData],
          label: 'Hospitalized',
          borderColor: '#3cba9f',
          fill: false
        }, { 
          data: [...recoveredData],
          label: 'Recovered',
          borderColor: '#e8c3b9',
          fill: false
        }
        ]
      },
      options: {
        title: {
          display: true,
          text: `Deaths, infections, hospitalizations, and recoveries in ${selState} over time`
        },
        xAxes: [{
          type: 'time',
          ticks: {
            autoSkip: true,
            maxTicksLimit: 20
          }
        }]
      }
    })
  }
 
  //! these are the initial requests to the api made when the user first navigates to the page
  getUSCurrent()
  getUSDaily()

  
  //! these event listners wait for changes to either the state or date selector inputs
  stateSelector.addEventListener('change', (event) => {
    const target = event.target.value
    if (target === 'US' && selDate === 'Current') {
      getUSCurrent()
      getUSDaily()
    } else if (selDate === 'Current') {
      getStateCurrent(target)
      getStateInfo(target)
      getStateDaily(target)
    } else if (target === 'US') {
      getUSDate(selDate)
      getUSDaily()
    } else getStateDate(target, selDate), getStateInfo(target), getStateDaily(target)
  })

  dateSelector.addEventListener('change', (event) => {
    const date = event.target.value.replace(/-/g, '')
    if (selState === 'US') {
      getUSDate(date)
    } else getStateDate(selState, date)
  })
}

//! this ensures the DOM has loaded before making the api requests
window.addEventListener('DOMContentLoaded', init) 