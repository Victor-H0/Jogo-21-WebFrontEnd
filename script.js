const iniciarJogo = document.getElementById('iniciar-jogo');
const modal = document.getElementById('modal');
const Mesa = document.getElementById('mesa');
const Soma = document.getElementById('soma');

var qtde1 = 4;
var qtde2 = 4;
var qtde3 = 4;
var qtde4 = 4;
var qtde5 = 4;
var qtde6 = 4;
var qtde7 = 4;
var qtde8 = 4;
var qtde9 = 4;
var qtde10 = 4;
var qtde11 = 4;
var qtde12 = 4;
var qtde13 = 4;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function criarValor() {
    let index =  getRandomArbitrary(1,13);
    
}

iniciarJogo.addEventListener('click', () => {
    modal.style.display = 'none';
    Mesa.style.display = 'flex';
    Soma.style.display = 'block';
    });

