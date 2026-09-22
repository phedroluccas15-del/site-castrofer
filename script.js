(function () {
  var WHATSAPP = "5535988322547";

  var topo = document.getElementById("topo");
  var btn = document.querySelector(".menu-btn");
  var menu = document.getElementById("menu");

  function fecharMenu() {
    menu.classList.remove("aberto");
    btn.setAttribute("aria-expanded", "false");
  }

  btn.addEventListener("click", function () {
    var aberto = menu.classList.toggle("aberto");
    btn.setAttribute("aria-expanded", aberto ? "true" : "false");
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") fecharMenu();
  });

  window.addEventListener("scroll", function () {
    topo.classList.toggle("rolou", window.scrollY > 10);
  }, { passive: true });

  // formulário: monta a mensagem e abre o WhatsApp (não precisa de servidor)
  var form = document.getElementById("form-orcamento");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nome = form.elements.nome;
    var cidade = form.elements.cidade;
    var ok = true;
    [nome, cidade].forEach(function (campo) {
      var vazio = !campo.value.trim();
      campo.classList.toggle("erro", vazio);
      if (vazio) ok = false;
    });
    if (!ok) return;

    var texto = "Olá, meu nome é " + nome.value.trim() + ", da cidade de " + cidade.value.trim() +
      ". Gostaria de um orçamento de ferragem.";
    var mensagem = form.elements.mensagem.value.trim();
    if (mensagem) texto += "\n\n" + mensagem;

    window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto), "_blank", "noopener");
  });

  var videos = document.querySelectorAll("video");
  videos.forEach(function (v) {
    v.addEventListener("play", function () {
      videos.forEach(function (outro) { if (outro !== v) outro.pause(); });
    });
  });

  // prints de feedback: clique abre em tamanho grande
  var caixa = document.createElement("div");
  caixa.className = "lightbox";
  caixa.setAttribute("role", "dialog");
  caixa.setAttribute("aria-label", "Feedback ampliado");
  caixa.hidden = true;
  caixa.innerHTML = '<button type="button" class="lightbox__fechar" aria-label="Fechar">&times;</button><img alt="">';
  document.body.appendChild(caixa);
  var caixaImg = caixa.querySelector("img");

  function fecharCaixa() { caixa.hidden = true; document.body.classList.remove("sem-rolagem"); }
  document.querySelectorAll(".feed__item img").forEach(function (img) {
    img.tabIndex = 0;
    function abrir() {
      caixaImg.src = img.src;
      caixaImg.alt = img.alt;
      caixa.hidden = false;
      document.body.classList.add("sem-rolagem");
    }
    img.addEventListener("click", abrir);
    img.addEventListener("keydown", function (e) { if (e.key === "Enter") abrir(); });
  });
  caixa.addEventListener("click", fecharCaixa);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") fecharCaixa(); });

  document.getElementById("ano").textContent = new Date().getFullYear();
})();
