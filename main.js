const template = document.querySelector('#pet-card-template')
const wrapper = document.createDocumentFragment()

// Display Current Temperature
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

// Pets Area
async function petsArea(species) {
  const petsPromise = await fetch(
    'https://inspiring-dango-c2e6ff.netlify.app/.netlify/functions/pets'
  )
  const petsData = await petsPromise.json()

  petsData.forEach((pet) => {
    const clone = template.content.cloneNode(true)

    clone.querySelector('.pet-card').dataset.species = pet.species

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
petsArea('all')

function createAgeText(birthYear) {
  const currentYear = new Date().getFullYear()
  const age = currentYear - birthYear

  if (age == 1) return '1 year old'
  if (age == 0) return 'Less than a year old'

  return `${age} years old`
}

// Pet filter button code
const allButtons = document.querySelectorAll('.pet-filter button')
allButtons.forEach((el) => {
  el.addEventListener('click', handleButtonClick)
})

function handleButtonClick(e) {
  // remove active class from any and all buttons
  allButtons.forEach((el) => el.classList.remove('active'))
  // add active class to the specific button that just got clicked
  e.target.classList.add('active')
  // filter the pets
  const currentFilter = e.target.dataset.filter
  document.querySelectorAll('.pet-card').forEach((el) => {
    if (el.dataset.species == currentFilter || currentFilter == 'all') {
      el.style.display = 'grid'
    } else {
      el.style.display = 'none'
    }
  })
}
