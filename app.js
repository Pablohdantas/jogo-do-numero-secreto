//let titulo=document.querySelector("h1");//No documento proucure o h1
//titulo.innerHTML="Jogo do Número Secreto";  //titulo dentro do html vai ser ="Número secreto"
//MESMA FORMA DA QUE ESTAR ESCRITA NAS FUNÇÕES
//let paragrafo=document.querySelector('p');
//paragrafo.innerHTML="Escolha um número de 1 a 10"
let listaDeNumerosSorteados=[];
let numeroLimiteDeTentativas=100;
let numeroSecreto=numeroAleatorio();
let contadorTentativas=1;

function textoNaTela(tag,texto){
    let campo=document.querySelector(tag);
    campo.innerHTML=texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );//se for no chrome
}
function exibirTexto(){
    textoNaTela("h1","Jogo do Número Secreto");
    textoNaTela("p","Escolha um número de 1 a 100");
}

function verificarChute(){
    let chute=document.querySelector("input").value;
    if(chute==numeroSecreto){
        textoNaTela("h1","Parabéns, você acertou o número");
        let mensagemTentativa=contadorTentativas>1?"tentativas":"tentativa";//adianto de vida tmlc
        textoNaTela("p",`Você acertou em ${contadorTentativas} ${mensagemTentativa} ! `);
        document.getElementById("reiniciar").removeAttribute("disabled")
    }else{
        if(chute>numeroSecreto){
            textoNaTela("p","Esse número é maior que o número secreto");
        }else{
            textoNaTela("p","Esse número é menor que o número secreto");
        }
        contadorTentativas++
        limparCampoDeTexto();
        
    }
}
function numeroAleatorio(){
   let numeroEscolhido= parseInt(Math.random()*numeroLimiteDeTentativas+1);
   let quantidadeDeElemntosDaLista=listaDeNumerosSorteados.length;

   if(quantidadeDeElemntosDaLista==numeroLimiteDeTentativas){
    listaDeNumerosSorteados=[]
   }

   if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return numeroAleatorio();
   }else{
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
   }
}
function limparCampoDeTexto(){
    let chute=document.querySelector("input");
    chute.value="";
}

function reiniciarJogo() {
    numeroSecreto=numeroAleatorio();
    limparCampoDeTexto();
    contadorTentativas=1;
    exibirTexto();
    document.getElementById("reiniciar").setAttribute("disabled",true)

    
}
exibirTexto();