function criaItemLista(id, coordX, coordY) {
    const item = document.createElement('li');
    item.className = "lista__item";
    item.dataset.coordX = coordX;
    item.dataset.coordY = coordY;
    item.id = id;

    item.addEventListener('click', (event) => pintarQuadrado(event));
    return item;
}

const numeroDeColunas = 10;
const numeroDeLinhas = 10;
const lista = document.querySelector("[data-lista]");

for (let y = 0; y < numeroDeColunas; y++) {
    for (let x = 0; x < numeroDeLinhas; x++) {
        lista.appendChild(criaItemLista((y * numeroDeColunas) + x + 1, x, y));
    }
}

function pintarQuadrado(e) {
    const quadrado = document.getElementById(`${e.target.id}`);
    quadrado.classList.toggle('lista__item--ativado');
}