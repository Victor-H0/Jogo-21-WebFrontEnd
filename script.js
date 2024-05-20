const iniciarJogo = document.getElementById('iniciar-jogo');
const modal = document.getElementById('modal');
const Mesa = document.getElementById('mesa');
const TotalJog = document.getElementById('TotalJog');
const TotalPC = document.getElementById('TotalPC');
const Jogador = document.getElementById('jogador');
const PC = document.getElementById('PC');
const comprar = document.getElementById('comprar');
const parar = document.getElementById('parar');
const rotuloJogador = document.getElementById('nomeJogador');
const rotuloPC = document.getElementById('nomePC');

var somaPC = 0;
var somaJogador = 0;

// A - 0 | 2 - 1 | 3 - 2 | 4 - 3 | 5 - 4 | 6 - 5 | 7 - 6 | 8 - 7 | 9 - 8 | 10 - 9 | J - 10 | Q - 11 | K - 12 |
var qtde = [4,4,4,4,4,4,4,4,4,4,4,4,4];
const valores = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
const converter = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];


function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


  function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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


function escurecerCarta(){

    //Vi umas regras do jogo e pelo visto só umas das cartas do PC fica virada pra baixo

    const darkCarta = PC.getElementsByClassName('carta')[0];
    const darkNum = PC.getElementsByClassName('valor')[0];

    darkCarta.style.backgroundColor = "red";
    darkNum.style.display = "none";

}


function calcularSoma(Player){

    //Juntei as duas funções de somar em uma funcão só, com o parâmetro do jogador que vc quer calcular a soma

    let qtdeA = 0; 
    let parcela = 0;   

    for(let i=0; i < Player.childElementCount; i++){

        let valor = valores[converter.indexOf(Player.children[i].firstChild.innerHTML)];

        if(valor == 11){
            qtdeA++;
        }

        parcela += valor;
    }

    while(parcela > 21 && qtdeA > 0){
        parcela -= 10;
        qtdeA--;
    }

    return parcela;
}


async function verificarSoma(){

    await esperar(1000);


    //Caso o Jogagor ou o PC estourem o limite
    if(somaJogador > 21 && somaPC > 21){
        alert('Não houve vencedores!');
        reiniciar();
    }
    else if(somaJogador > 21 && somaPC < 22){
        alert('Você Perdeu!');
        reiniciar();
    }
    else if(somaJogador < 22 && somaPC > 21){
        alert('Parabéns, você venceu!');
        reiniciar();
    }

    //Caso ninguém estoure
    else if(somaJogador == somaPC){
        alert('Não houve vencedores!');
        reiniciar();
    }
    else if(somaJogador > somaPC){
        alert('Parabéns, você venceu!');
        reiniciar();
    }
    else if(somaJogador < somaPC){
        alert('Perdeu!');
        reiniciar();
    }
    // if (somaJogador == 21) {
    //     setTimeout(function() {
    //         alert('Parabéns, você venceu!');
    //         reiniciar();
    //     }, 1000);
    // }

    // if (somaPC == 21) {
    //     setTimeout(function() {
    //         alert('Perdeu!');
    //         reiniciar();
    //     }, 1000); 
    // }

    // if (somaJogador > 21 && somaPC < 21) {
    //     setTimeout(function() {
    //         alert('Perdeu!');
    //         reiniciar();
    //     }, 1000); 
    // }

    // if (somaJogador < 21 && somaPC > 21) {
    //     setTimeout(function() {
    //         alert('Parabéns, você venceu!');
    //         reiniciar();
    //     }, 1000);
    // }

    // if (somaJogador > 21 && somaPC > 21) {
    //     setTimeout(function() {
    //         alert('Não houve vencedores!');
    //         reiniciar();
    //     }, 1000); 
    // }
}

function reiniciar() {
    //window.location.href = window.location.href;
    location.reload(true);
}

async function comprarPC(){
    while(somaPC < 17){
        await esperar(1500);
        alert('O Dealer Irá Comprar');
        PC.appendChild(addCarta(indexDisponivel()));
        somaPC = calcularSoma(PC);
        TotalPC.textContent = `Soma das Cartas do Dealer: ${somaPC}`;        
    }
    verificarSoma();
}

function parada(){

    PC.getElementsByClassName('carta')[0].style.backgroundColor = "whitesmoke";
    PC.getElementsByClassName('valor')[0].style.display = "block";
    somaPC = calcularSoma(PC);
    TotalPC.textContent = `Soma das Cartas do Dealer: ${somaPC}`;

    comprarPC();

    // verificarSoma();
}

iniciarJogo.addEventListener('click', () => {
    modal.style.display = 'none';
    Mesa.style.display = 'flex';
    TotalJog.style.display = 'block';
    rotuloJogador.style.display = 'block';
    rotuloPC.style.display = 'block';

    PC.appendChild(addCarta(indexDisponivel()));
    PC.appendChild(addCarta(indexDisponivel()));

    //somaPC = calcularSoma(PC);
    escurecerCarta();

    Jogador.appendChild(addCarta(indexDisponivel()));
    Jogador.appendChild(addCarta(indexDisponivel()));

    somaJogador = calcularSoma(Jogador);

    TotalJog.textContent = `Soma das Suas Cartas: ${somaJogador}`;

    if(somaJogador == 21){
        comprar.disabled = true;
    }    
    //verificarSoma();
});

comprar.addEventListener('click', () => {

    //Na regra do jogo somente o jogador compra carta no botão comprar. O PC só compra carta dps q o Jogador resolve parar e se tiver com menos de 17 na somaPC

    Jogador.appendChild(addCarta(indexDisponivel()));
    somaJogador = calcularSoma(Jogador);
    TotalJog.textContent = `Soma das Suas Cartas: ${somaJogador}`;

    if(somaJogador == 21){
        comprar.disabled = true;
        parar.disabled = true;
        setTimeout(function() {
            alert('Voce atingiu 21, não é possivel comprar mais cartas');
            parada();
        }, 1000);
    }
    else if(somaJogador > 21){
        comprar.disabled = true;
        parar.disabled = true;
        setTimeout(function() {
            alert('Voce ultrapassou 21, não é possivel comprar mais cartas');
            parada();
        }, 1000);
    }

    // PC.appendChild(addCarta(indexDisponivel()));

    // somaPC = calcularSoma(PC);
    // escurecerCartas();

    // verificarSoma();
});

parar.addEventListener('click', () => {
    parar.disabled = true;
    comprar.disabled = true;
    parada();


    // if (somaJogador < 21 && somaPC < 21) {
    //     if (somaJogador > somaPC) {
    //         alert('Parabéns, você venceu!');
    //         reiniciar();
    //     }

    //     if (somaJogador < somaPC) {
    //         alert('Perdeu!');
    //         reiniciar();
    //     }
    // }
});


