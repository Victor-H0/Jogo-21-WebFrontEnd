const iniciarJogo = document.getElementById('iniciar-jogo');
const modal = document.getElementById('modal');
const Mesa = document.getElementById('mesa');
const Soma = document.getElementById('soma');
const Jogador = document.getElementById('jogador');
const PC = document.getElementById('PC');
const comprar = document.getElementById('comprar');
const parar = document.getElementById('parar');

var somaPC = 0;
var somaJogador = 0;

// A - 0 | 2 - 1 | 3 - 2 | 4 - 3 | 5 - 4 | 6 - 5 | 7 - 6 | 8 - 7 | 9 - 8 | 10 - 9 | J - 10 | Q - 11 | K - 12 |
var qtde = [4,4,4,4,4,4,4,4,4,4,4,4,4];
const valores = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
const converter = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];


function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function indexDisponivel() {
    let index =  getRandomArbitrary(0,13);
    
    if(qtde[index] > 0){
        qtde[index]--;
        return index;
    }
    else{
        return indexDisponivel();
    }    
}

function addCarta(Numero){
    let novaCarta = document.createElement("div");
    novaCarta.classList.add("carta");

    let contCarta = document.createElement("span");
    contCarta.classList.add("valor");

    let text = document.createTextNode(converter[Numero]);

    contCarta.appendChild(text);
    novaCarta.appendChild(contCarta);

    return novaCarta;
}

function escurecerCartas(){
    const darkCarta = PC.getElementsByClassName('carta');
    const darkNum = PC.getElementsByClassName('valor');

    for(let i = 0; i < darkCarta.length; i++){
        darkCarta[i].style.background = "red";
    }

    for(let i = 0; i < darkNum.length; i++){
        darkNum[i].style.display = "none";
    }
}

function calcularSomaJogador(){
    let qtdeA = 0; 
    let parcela = 0;   

    for(let i=0; i < Jogador.childElementCount; i++){

        let valor = valores[converter.indexOf(Jogador.children[i].firstChild.innerHTML)];

        if(valor == 11){
            qtdeA++;
        }

        parcela += valor;
    }

    while(parcela > 21 && qtdeA > 0){
        parcela -= 10;
        qtdeA--;
    }

    somaJogador = parcela;
}

function calcularSomaPC(){
    let qtdeA = 0;
    let parcela = 0;

    for(let i=0; i < PC.childElementCount; i++) {

        let valor = valores[converter.indexOf(PC.children[i].firstChild.innerHTML)];

        if(valor == 11){
            qtdeA++;
        }

        parcela += valor;
    }

    somaPC = parcela;
}

function verificarSoma(){
    if (somaJogador == 21) {
        setTimeout(function() {
            alert('Parabéns, você venceu!');
            reiniciar();
        }, 1000);
    }

    if (somaPC == 21) {
        setTimeout(function() {
            alert('Perdeu!');
            reiniciar();
        }, 1000); 
    }

    if (somaJogador > 21 && somaPC < 21) {
        setTimeout(function() {
            alert('Perdeu!');
            reiniciar();
        }, 1000); 
    }

    if (somaJogador < 21 && somaPC > 21) {
        setTimeout(function() {
            alert('Parabéns, você venceu!');
            reiniciar();
        }, 1000);
    }

    if (somaJogador > 21 && somaPC > 21) {
        setTimeout(function() {
            alert('Não houve vencedores!');
            reiniciar();
        }, 1000); 
    }
}

function reiniciar() {
    window.location.href = window.location.href;
    location.reload(true);
}

iniciarJogo.addEventListener('click', () => {
    modal.style.display = 'none';
    Mesa.style.display = 'flex';
    Soma.style.display = 'block';

    PC.appendChild(addCarta(indexDisponivel()));
    PC.appendChild(addCarta(indexDisponivel()));

    calcularSomaPC();
    escurecerCartas();

    Jogador.appendChild(addCarta(indexDisponivel()));
    Jogador.appendChild(addCarta(indexDisponivel()));

    calcularSomaJogador();

    Soma.textContent = `Soma: ${somaJogador}`;
    
    verificarSoma();
});

comprar.addEventListener('click', () => {
    Jogador.appendChild(addCarta(indexDisponivel()));

    calcularSomaJogador();
    Soma.textContent = `Soma: ${somaJogador}`;

    PC.appendChild(addCarta(indexDisponivel()));

    calcularSomaPC();
    escurecerCartas();

    verificarSoma();
});

parar.addEventListener('click', () => {
    if (somaJogador < 21 && somaPC < 21) {
        if (somaJogador > somaPC) {
            alert('Parabéns, você venceu!');
            reiniciar();
        }

        if (somaJogador < somaPC) {
            alert('Perdeu!');
            reiniciar();
        }
    }
});


