const template = document.querySelector('#pet-card-template')
const wrapper = document.createDocumentFragment()

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
  console.log('Petsdata', petsData)

  petsData.forEach((pet) => {
    const clone = template.content.cloneNode(true)
    clone.querySelector('h3').textContent = pet.name
    clone.querySelector('.pet-description').textContent = pet.description
    clone.querySelector('.pet-age').textContent = createAgeText(pet.birthYear)
    clone.querySelector('.pet-card-photo img').src = pet.photo
      ? pet.photo
      : 'images/fallback.jpg'
    clone.querySelector(
      '.pet-card-photo img'
    ).alt = `A ${pet.species} named ${pet.name}`
    wrapper.appendChild(clone)
  })
  document.querySelector('.list-of-pets').appendChild(wrapper)
}

petsArea()
function createAgeText(birthYear) {
  const currentYear = new Date().getFullYear()
  const age = currentYear - birthYear

  if (age == 1) return '1 year old'
  if (age == 0) return 'Less than a year old'

  return `${age} years old`
}
