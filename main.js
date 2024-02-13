async function start() {
  const weatherPromise = await fetch(
    'https://api.weather.gov/gridpoints/TBW/109,102/forecast'
  )
  // TODO: Get local weather forcast
  // const weatherPromise = await fetch(
  //   'https://api.cultivationdata.net/amds?no=46106',
  //   {
  //     method: 'GET',
  //     mode: 'cors',
  //   }
  // )
  const weatherData = await weatherPromise.json()
  const ourTemperature = weatherData.properties.periods[0].temperature

  const convertedToC = ((ourTemperature - 32) / 1.8).toFixed(0)
  const tempOutput = document.querySelector('#temp-output')
  tempOutput.textContent = convertedToC
}

start()

async function petsArea() {
  const petsPromise = await fetch(
    'https://learnwebcode.github.io/bootcamp-pet-data/pets.json'
  )
  const petsData = await petsPromise.json()

  petsData.forEach((pet) => {
    console.log(pet.name)
  })
}

petsArea()
