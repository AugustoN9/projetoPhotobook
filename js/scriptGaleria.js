const statusDiv = document.getElementById("galeriaStatus");
let imagens = [];

statusDiv.innerText = "Carregando imagens...";

fetch("imagens.json")
  .then((res) => {
    if (!res.ok) throw new Error("Erro ao carregar JSON");
    return res.json();
  })
  .then((data) => {
    imagens = data;
    statusDiv.innerText = ""; // Limpa a mensagem
    renderizarGaleria("todas");
  })
  .catch((err) => {
    statusDiv.innerText =
      "Erro ao carregar imagens. Verifique o caminho do JSON ou se está rodando com servidor local.";
    console.error(err);
  });

function renderizarGaleria(categoria) {
  const container = document.getElementById("galeriaImagens");
  container.innerHTML = "";
  const filtradas =
    categoria === "todas"
      ? imagens
      : imagens.filter((img) => img.categoria === categoria);
  filtradas.forEach((img) => {
    const div = document.createElement("div");
    div.className = "gallery-item";
    div.innerHTML = `<img src="${img.src}" alt="${img.alt}" onclick="abrirLightbox('${img.src}', '${img.alt}')">`;
    container.appendChild(div);
  });
}


function filtrarCategoria(cat) {
  document
    .querySelectorAll(".filter-buttons button")
    .forEach((btn) => btn.classList.remove("active"));
  const btn = Array.from(
    document.querySelectorAll(".filter-buttons button")
  ).find((b) => b.textContent.toLowerCase().includes(cat.replace("-", "")));
  if (btn) btn.classList.add("active");
  renderizarGaleria(cat);
}

function abrirLightbox(src, alt) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.style.display = "flex";
}

function fecharLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

 function scrollGaleria() {
    const galeria = document.getElementById('galeria');
    if (galeria) {
      galeria.scrollIntoView({ behavior: 'smooth' });
    }
  }