//variavel para controlar a chamada da função timeOut
var timerId = 0

function AbrirJogo() {
    var nivelJogo = document.getElementById('nivelJogo').value

    //forçando a mudança de url e passando o parâmetro para a página seguinte
    window.location.href = 'jogo.html?' + nivelJogo
}

function VoltarPaginaInicial() {
    window.location.href = 'index.html?'
}

//configuração do jogo
function IniciarJogo() {

    //obtendo toda string do "?" em diante
    var url = window.location.search

    var nivelJogo = url.replace("?", "")

    var duracao = 0
    var quantidadeBaloes = 0

    switch (nivelJogo) {
        //fácil
        case '1':
            duracao = 60
            quantidadeBaloes = 30
            break;

        //normal
        case '2':
            duracao = 40
            quantidadeBaloes = 50
            break;

        //difícil
        case '3':
            duracao = 30
            quantidadeBaloes = 60
            break;
    }

    //inserindo segundos no cronômetro
    //innerHTML -> inserindo o conteúdo dentro da taq
    document.getElementById('cronometroDuracao').innerHTML = duracao


    CriarBaloes(quantidadeBaloes)
    document.getElementById('quantidadeBaloes').innerHTML = quantidadeBaloes
    document.getElementById('baloesEstourados').innerHTML = 0


    ContagemTempo(duracao + 1)
}

//criar os baloões dentro do jogo
function CriarBaloes(quantidade) {
    for (var i = 1; i <= quantidade; i++) {
        var balao = document.createElement("img")
        balao.src = "../img/balao_azul_pequeno.png"
        balao.style.margin = '12px'
        balao.id = 'balao' + i
        balao.onclick = function () { EstourarBalao(this) }

        //adicionar elementos html
        document.getElementById('cenario').appendChild(balao)
    }
}

function EstourarBalao(balao) {
    //limpando o atributo do click, para não poder clicar muitas vezes em um balão já estourado
    document.getElementById(balao.id).setAttribute("onclick", "")
    document.getElementById(balao.id).src = '../img/balao_azul_pequeno_estourado.png'
    Pontuacao(-1)
}

function Pontuacao(acao) {
    var quantidadeBaloes = document.getElementById('quantidadeBaloes').innerHTML
    var baloesEstourados = document.getElementById('baloesEstourados').innerHTML

    //convertendo os valores para int
    quantidadeBaloes = parseInt(quantidadeBaloes)
    baloesEstourados = parseInt(baloesEstourados)

    quantidadeBaloes += acao
    baloesEstourados -= acao

    document.getElementById('quantidadeBaloes').innerHTML = quantidadeBaloes
    document.getElementById('baloesEstourados').innerHTML = baloesEstourados

    SituacaoJogo(quantidadeBaloes)
}

function SituacaoJogo(quantidadeBaloes) {
    if (quantidadeBaloes == 0) {
        alert('Parabéns! \nVocê conseguiu estourar todos os balões a tempo!')
        PararJogo()
        VoltarPaginaInicial()
    }
}

function PararJogo() {
    clearTimeout(timerId)
}

//contagem de tempo para o cronometro
function ContagemTempo(duracao) {

    //diminuindo um segundo da duração total
    duracao -= 1

    if (duracao == -1) {
        //parando a execução da função do setTimeout
        clearTimeout(timerId)
        GameOver()
        return false
    }

    //incluindo a duração entre as tags html, onde o id (cronometroDuracao) está sendo chamado
    document.getElementById('cronometroDuracao').innerHTML = duracao

    //executando a função a cada 1 segundo
    timerId = setTimeout('ContagemTempo(' + duracao + ')', 1000)
}

function RemoverEventoBaloes() {
    var i = 1; //contador para recuperar balões por id

    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while (document.getElementById('balao' + i)) {
        //retira o evento onclick do elemnto
        document.getElementById('balao' + i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}

function GameOver() {
    RemoverEventoBaloes()
    alert('Fim de jogo! \nVocê não conseguiu estourar todos os balões a tempo.')
    VoltarPaginaInicial()
}