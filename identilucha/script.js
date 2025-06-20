function toggleCargo(value) {
  const cargoInput = document.getElementById("cargo");
  cargoInput.classList.toggle("hidden", value !== "administrativo");
}

document.getElementById("carnetForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const form = e.target;
  const reader = new FileReader();
  const file = document.getElementById("foto").files[0];

  reader.onloadend = function () {
    const data = {
      nombre: form.nombre.value,
      tipo_doc: form.tipo_doc.value,
      documento: form.documento.value,
      contacto: form.contacto.value,
      sangre: form.sangre.value,
      rol: form.rol.value,
      cargo: form.cargo.value,
      foto: reader.result,
      qr: `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://identilucha.vercel.app/carnet.html?doc=${form.documento.value}`
    };
    localStorage.setItem("carnetData", JSON.stringify(data));
    window.location.href = "carnet.html";
  };

  if (file) reader.readAsDataURL(file);
});

if (window.location.pathname.includes("carnet.html")) {
  const data = JSON.parse(localStorage.getItem("carnetData") || "{}");
  document.getElementById("carnet_nombre").textContent = data.nombre || "";
  document.getElementById("carnet_tipo_doc").textContent = data.tipo_doc || "";
  document.getElementById("carnet_documento").textContent = data.documento || "";
  document.getElementById("carnet_contacto").textContent = data.contacto || "";
  document.getElementById("carnet_sangre").textContent = data.sangre || "";
  document.getElementById("carnet_rol").textContent = data.rol?.toUpperCase() || "";
  document.getElementById("carnet_foto").src = data.foto || "";
  document.getElementById("carnet_qr").src = data.qr || "";
  document.getElementById("carnet_cargo").textContent = data.rol === "administrativo" ? `Cargo: ${data.cargo}` : "";
}

function descargarPDF() {
  const carnetElement = document.getElementById("carnet");
  const nombre = document.getElementById("carnet_nombre").innerText || "carnet";
  const opt = {
    margin: 0.5,
    filename: `carnet-${nombre.replaceAll(" ", "_")}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
  };
  html2pdf().from(carnetElement).set(opt).save();
}
