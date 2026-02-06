const RAW_URL = "https://raw.githubusercontent.com/jaum1502/site-v21/main/codigo.txt";

let instagramScript = "";

fetch(RAW_URL)
  .then(res => {
    if (!res.ok) throw new Error("Erro ao carregar o arquivo");
    return res.text();
  })
  .then(texto => {
    instagramScript = texto;

    const scriptLabel = document.getElementById("code");
    if (scriptLabel) scriptLabel.innerText = instagramScript;
  })
  .catch(err => {
    console.error(err);
    alert("Falha ao carregar o código");
  });

async function copyToClipboard() {
  try {
    if (!instagramScript) {
      alert("Código ainda não carregou");
      return;
    }

    await navigator.clipboard.writeText(instagramScript);
    overlayControl("show");

      window.location.href = "https://instagram.com";

  } catch (error) {
    console.error("Failed to copy text:", error);
    alert("Erro ao copiar.");
  }
}

function overlayControl(state) {
  const overlay = document.getElementById("overlay");
  if (!overlay) return;

  if (state === "show") {
    overlay.classList.add("show");
  } else if (state === "hide") {
    overlay.classList.remove("show");
  }
}

