let series = [];

const listaSeries = document.getElementById("listaSeries");
const status = document.getElementById("status");
const inputBusca = document.getElementById("inputBusca");
const btnBuscar = document.getElementById("btnBuscar");
const btnTodos = document.getElementById("btnTodos");
const btnFiccao = document.getElementById("btnFiccao");
const btnComedia = document.getElementById("btnComedia");
const btnAcao = document.getElementById("btnAcao");
const btnPolicia = document.getElementById("btnPolicia");
const btnSuspense = document.getElementById("btnSuspense");
const btnDrama = document.getElementById("btnDrama");

// btnBuscar.addEventListener("click", carregarSeries);

async function carregarSeries() {
    try {
        status.textContent = "Carregando series...";

        const resposta = await fetch("./series.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar o JSON");
        }

        series = await resposta.json();
        status.textContent = `${series.length} series carregadas.`;
        mostrarSeries(series);
    } catch (erro) {
        status.textContent = `Erro: ${erro.message}`;
    }
}

function mostrarSeries(lista) {
    listaSeries.innerHTML = "";

    if (lista.length === 0) {
        listaSeries.innerHTML = "<p>Nenhuma série encontrada.</p>";
        return;
    }

    lista.forEach((serie) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h2>${serie.titulo}</h2>
            <p><strong>Ano:</strong> ${serie.ano}</p>
            <p><strong>Gênero:</strong> ${serie.genero}</p>
            <p><strong>Temporadas:</strong> ${serie.temporadas}</p>
            <img src="${serie.imagem}" alt="${serie.titulo}">
        `;

        listaSeries.appendChild(card);
    });
}

function mostrarTodos() {
    inputBusca.value = "";
    mostrarSeries(series);
    status.textContent = `${series.length} series carregadas.`;
}

function buscarSeries() {
    const termo = inputBusca.value.trim().toLowerCase();

    if (!termo) {
        mostrarTodos();
        return;
    }

    const resultados = series.filter((serie) => {
        const titulo = serie.titulo.toLowerCase();
        const ano = String(serie.ano);
        return titulo.includes(termo) || ano.includes(termo);
    });

    mostrarSeries(resultados);
    status.textContent = `${resultados.length} série(s) encontrada(s) para "${inputBusca.value.trim()}".`;
}

function filtrarPorGenero(genero) {
    const filtradas = series.filter((serie) => serie.genero === genero);
    mostrarSeries(filtradas);
    status.textContent = `${filtradas.length} série(s) de ${genero}.`;
}

inputBusca.addEventListener("input", buscarSeries);
btnBuscar.addEventListener("click", buscarSeries);
btnTodos.addEventListener("click", mostrarTodos);
btnFiccao.addEventListener("click", () => filtrarPorGenero("Ficção"));
btnComedia.addEventListener("click", () => filtrarPorGenero("Comédia"));
btnAcao.addEventListener("click", () => filtrarPorGenero("Ação"));
btnPolicia.addEventListener("click", () => filtrarPorGenero("Policial"));
btnSuspense.addEventListener("click", () => filtrarPorGenero("Suspense"));
btnDrama.addEventListener("click", () => filtrarPorGenero("Drama"));


carregarSeries();