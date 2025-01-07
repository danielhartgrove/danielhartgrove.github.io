const pokemonID = document.getElementById('pokemon-id');
const pokemonName = document.getElementById('pokemon-name');
const spriteContainer = document.getElementById('sprite-container');
const types = document.getElementById('types');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const getPrev = async () => {
  let _ID = parseInt(pokemonID.innerText.replace(/#/g, ''));
  if(_ID === 1){
	  _ID = 1025;
  }else{
	  _ID--;
  }
  getPokemon(_ID);
}

const getNext = async () => {
  let _ID = parseInt(pokemonID.innerText.replace(/#/g, ''));
  if(_ID === 1025){
	  _ID = 1;
  }else{
	  _ID++;
  }
  getPokemon(_ID);
}

const getRandom = async () => {
  let _ID = getRandomInt(1025);
  getPokemon(_ID);
}

const getSearched = async() => {
  let _ID = searchInput.value.toLowerCase();
  getPokemon(_ID);
}

const getPokemon = async (id) => {
  try {
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${id}`
    );
    const data = await response.json();
    setInfo(data);
   }catch (err) {
    window.alert('Pokémon not found');
    console.log(`Pokémon not found ${err}`);
    nonExistent();
  }
};

const setInfo = (data) => {
    // Set Pokémon info
    pokemonName.textContent = `${data.name.toUpperCase()}`;
    searchInput.value = `${data.name.toUpperCase()}`;
    pokemonID.textContent = `#${data.id}`;
    weight.textContent = `WEIGHT: ${data.weight}`;
    height.textContent = `HEIGHT: ${data.height}`;
    spriteContainer.innerHTML = `
      <img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">
    `;

    // Set stats
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    // Set types
    types.innerHTML = data.types
      .map(obj => `<span class="type ${capitalizeFirstLetter(obj.type.name)}">${capitalizeFirstLetter(obj.type.name)}</span>`)
      .join(' / ');
 
}

const nonExistent = () => {
  spriteContainer.innerHTML = `
      <img id="sprite" src="https://static.wikia.nocookie.net/tales-of-mythical-objects/images/d/d8/MissingNo..png/revision/latest?cb=20210613024446" alt="${data.name} front default sprite">`

  // reset stats
  pokemonName.textContent = 'MissingNo.';
  pokemonID.textContent = '#0';
  types.innerHTML = 'Bird';
  height.textContent = 'HEIGHT: 3';
  weight.textContent = 'WEIGHT: 10';
  hp.textContent = '33';
  attack.textContent = '136';
  defense.textContent = '0';
  specialAttack.textContent = '6';
  specialDefense.textContent = '6';
  speed.textContent = '204';
};