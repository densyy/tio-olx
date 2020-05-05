
const urlOlx = 'https://sp.olx.com.br/baixada-santista-e-litoral-sul/regiao-de-santos/eletrodomesticos?apt=5&apt=7&pe=200&ps=20&sd=3428&sd=3429&sd=3430&sf=1'
const url = 'https://cors-anywhere.herokuapp.com/' + urlOlx

window.fetch(url)
  .then((retorno) => { return retorno.text() })
  .then((data) => {
    const html = new window.DOMParser().parseFromString(data, 'text/html')
    const body = html.body.innerHTML
    const bodyParsed = body.replace(/&quot;/g, '"')
    
    const regex = new window.RegExp('{"subject":"(.*?)priorityAdImage":(true|false)}', 'g')
    const anuncios = bodyParsed.match(regex)

    const dataOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    for (const anuncio of anuncios) {
      const obj = JSON.parse(anuncio)

      const anuncioObj = {
        titulo: obj.subject,
        preco: obj.price,
        url: obj.url,
        foto: obj.thumbnail,
        data: new Date((obj.date * 1000)).toLocaleDateString('pt-BR', dataOptions),
        local: obj.location
      }

      adicionarAnuncio(anuncioObj)
    }
  })


function adicionarAnuncio (anuncio) {
  const main = document.querySelector('main')
  main.innerHTML += `
  <div class="anuncio">
    <a href="${anuncio.url}" target="_blank">
      <img class="foto" src="${anuncio.foto}">
      <p class="titulo">${anuncio.titulo}</p>
      <p class="preco">${anuncio.preco}</p>
      <!-- <p class="local">${anuncio.local}</p> -->
      <p class="data">${anuncio.data}</p>
    </a>
  </div>
  `
}
