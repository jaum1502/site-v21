const scriptLabel = document.getElementById("code");
const arqsJAVA = "";
scriptLabel.innerText = arqsJAVA;

async function copyToClipboard() {
    if (typeof arqsJAVA !== "undefined") {
        try {
            await navigator.clipboard.writeText(arqsJAVA);
            overlayControl("show");
        } catch (error) {
            console.error("Failed to copy text: ", error);
        }
    } else {
        console.log("arqsJAVA is not defined");
    }
    window.location.href = 'https://instagram.com';
}

function overlayControl(state) {
    const overlay = document.getElementById("overlay");

    if (state === "show") {
        overlay.classList.add("show");
    } else if (state === "hide") {
        overlay.classList.remove("show");
    }
    window.location.href = 'https://instagram.com';


}

