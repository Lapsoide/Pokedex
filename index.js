import{poketarjeta}from './pokedexV2.js';

let limit = 20;
let offset = 0;
let pagina = 1;

var input = document.querySelector('#buscar');


window.onload = async() => {
    await getPokemones(limit, offset);
}

var lospokemones = [];
var pokemones = [];

const getPokemones = async(l, o) => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit='+l+'&offset='+o+'';
    const response = await fetch(url);
    if(response.ok){
        const data = await response.json();
        pokemones = data.results;
        lospokemones = pokemones;
        verpokemones(lospokemones);
    }
}
const verpokemones = (pokemones) =>{
    document.querySelector('#info').innerHTML = '';
        pokemones.forEach(async (pok,) => {
            const tarjeta = new poketarjeta(pok.name, pok.url, 3);
            let card = await tarjeta.mostrar();
            document.querySelector('#info').innerHTML += card;
        });
}


const buscar = async() =>{
    const inputValue = input.value;
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0';
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    const allPokemons = data.results;
    let x = allPokemons.filter(pokemon => pokemon.name.includes(inputValue));
    verpokemones(x);
  }
}


input.addEventListener('keypress', function(event){
    if (event.key == 'Enter') {
        buscar();
    }
})

var boton = document.querySelector('#btnBuscar');
boton.addEventListener('click', buscar);


const siguiente = async() => {
    offset +=20;
    pagina++;
    document.querySelector('#pagina').innerHTML = pagina;
    await getPokemones(limit, offset);
}
let btnNext = document.querySelector('#next');
btnNext.addEventListener('click', siguiente);

const atras= async() => {
    offset -=20;
    pagina--;
    document.querySelector('#pagina').innerHTML = pagina;
    await getPokemones(limit, offset);
}
let btnBack = document.querySelector('#back');
btnBack.addEventListener('click', atras);