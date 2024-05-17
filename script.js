const iniciarJogo = document.getElementById('iniciar-jogo');
const modal = document.getElementById('modal');
const Mesa = document.getElementById('mesa');
const Soma = document.getElementById('soma');
const Jogador = document.getElementById('jogador');
const PC = document.getElementById('PC');

var somatoria = 0;


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
    var darkCarta0 = document.getElementsByClassName("carta")[0];
    var darkCarta1 = document.getElementsByClassName("carta")[1];
    var darkNum0 = document.getElementsByClassName("valor")[0];
    var darkNum1 = document.getElementsByClassName("valor")[1];

    darkNum0.style.display = "none";
    darkNum1.style.display = "none";

    darkCarta0.style.backgroundColor = "red";
    darkCarta1.style.backgroundColor = "red";
}

function calcularSoma(){
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

    somatoria = parcela;
}

iniciarJogo.addEventListener('click', () => {
    modal.style.display = 'none';
    Mesa.style.display = 'flex';
    Soma.style.display = 'block';

    PC.appendChild(addCarta(indexDisponivel()));
    PC.appendChild(addCarta(indexDisponivel()));

    escurecerCartas();

    Jogador.appendChild(addCarta(indexDisponivel()));
    Jogador.appendChild(addCarta(indexDisponivel()));

    calcularSoma();

    soma.textContent = `Soma: ${somatoria}`;
});


