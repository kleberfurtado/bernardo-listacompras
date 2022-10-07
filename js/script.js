const CHAVE = 'bernardo.lista.compras.chave'
 
var listaItens = carregarStorage();
 
preencherListaHTML()
calcularValores()
 
function carregarStorage() {
  var conteudo = localStorage.getItem(CHAVE)
  if (conteudo) {
    return JSON.parse(conteudo)
  }
  return []
}
function adicionarItem() {
 
  const nomeProduto = document.querySelector('#campoNomeProduto').value;
  if (nomeProduto == "") {
    window.alert("ERRO, Produto inexistente")
    return
  }
  const objetoProduto = { selecionado: false, nome: nomeProduto, valor: 0 };
  listaItens.push(objetoProduto);
  localStorage.setItem(CHAVE, JSON.stringify(listaItens))
  preencherListaHTML();
 
}
 
function preencherListaHTML() {
  textoHTML = '';
  for (indice = 0; indice < listaItens.length; indice++) {
    const objetoProduto = listaItens[indice];
    textoHTML = `${textoHTML}<li><input type="checkbox" onclick="marcarSelecionado(this, '${objetoProduto.nome}')"`;
 
    if (objetoProduto.selecionado) {
      textoHTML += ' checked ';
    }
    textoHTML = `${textoHTML}><span>${objetoProduto.nome}</span><button onclick="removerItem('${objetoProduto.nome}')">X</button></li>`;
  }
 
  const listaHTML = document.querySelector('#listaItens');
  listaHTML.innerHTML = textoHTML;
}
 
function marcarSelecionado(checkbox, itemClicado) {
  for (indice = 0; indice < listaItens.length; indice++) {
    const objetoProduto = listaItens[indice];
    if (objetoProduto.nome == itemClicado) {
      objetoProduto.selecionado = checkbox.checked;
      objetoProduto.valor = objetoProduto.selecionado ? obterValor() : 0
      calcularValores()
      localStorage.setItem(CHAVE, JSON.stringify(listaItens))
      return;
 
 
    }
  }
}
function obterValor() {
  do {
    var valor = window.prompt('Informe o valor do produto');
    if (valor == '') {
      return 0;
    }
    var valorNumerico = parseFloat(valor);
  } while (Number.isNaN(valorNumerico));
 
 
  return (valorNumerico)
}
function calcularValores() {
  var total = 0
  for (indice = 0; indice < listaItens.length; indice++) {
    const objetoProduto = listaItens[indice];
    total += objetoProduto.valor
  }
  document.getElementById('valorCompras').innerHTML = total
}
 
function removerItem(itemClicado) {
  for (indice = 0; indice < listaItens.length; indice++) {
    const objetoProduto = listaItens[indice];
    if (objetoProduto.nome == itemClicado) {
      listaItens.splice(indice, 1);
      break;
    }
 
  }
  preencherListaHTML();
  localStorage.setItem(CHAVE, JSON.stringify(listaItens))
  calcularValores();
}
