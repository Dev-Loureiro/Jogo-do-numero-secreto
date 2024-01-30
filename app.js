let listaDeNumerosSorteadors = [];
let numeroLimite = 3;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirTextoInicial() {
    exibirTextoNaTela('h1', 'Adivinhe o número secreto');
    exibirTextoNaTela('p', 'Escolha um número de 1 a 10');
}

exibirTextoInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('h1', 'Você acetou!');
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        exibirTextoNaTela('h1', 'Você errou!')
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
        } else {
            exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}


function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteadors.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteadors = [];
    }

    if (listaDeNumerosSorteadors.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteadors.push(numeroEscolhido);
        console.log(listaDeNumerosSorteadors);
        return numeroEscolhido;
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    
    exibirTextoInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
} 