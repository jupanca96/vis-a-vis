
const cvInput = document.getElementById("cv");
const fileText = document.getElementById("file-text");
const fileWrapper = document.getElementById("file-wrapper");
const form = document.getElementById("jobs-form");
const submitBtn = document.getElementById("submit-btn");
const GOOGLE_APP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwuaMiqJunDodluBxtHYnMOPaLClT2s8zQmPDXgJrEI-6cnMrdrRXbctLQz9WbsHzqS/exec";

// Control visual del input file
cvInput?.addEventListener("change", () => {
  const file = cvInput.files?.[0];
  if (file) {
    fileText.textContent = file.name.toUpperCase();
    fileWrapper.classList.add("has-file");
  } else {
    fileText.textContent = "CLICK TO UPLOAD YOUR CV (PDF ONLY)";
    fileWrapper.classList.remove("has-file");
  }
});

// Función auxiliar para transformar el archivo a Base64 de forma asíncrona
const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    // Eliminar el prefijo 'data:application/pdf;base64,' del string
    const base64String = reader.result.split(',')[1];
    resolve(base64String);
  };
  reader.onerror = (error) => reject(error);
});

// Interceptar el envío del formulario
form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    alert("Por favor, rellene todos los campos requeridos.");
    return;
  }

  // Bloquear botón mientras procesa
  const originalBtnText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "SENDING...";

  // Recolectar campos de texto estándar
  const formData = new FormData(form);
  const payload = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    cvFile: null,
    cvName: null
  };

  // Procesar el archivo si existe
  const file = cvInput.files?.[0];
  if (file) {
    try {
      payload.cvFile = await toBase64(file);
      payload.cvName = `${payload.last_name.toUpperCase()}_${payload.first_name.toUpperCase()}_CV.pdf`;
    } catch (err) {
      console.error("Error al procesar el PDF:", err);
      alert("Hubo un problema al cargar el archivo PDF.");
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
      return;
    }
  }

  // Enviar datos hacia Google Apps Script
  try {
    const response = await fetch(GOOGLE_APP_SCRIPT_URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.status === "success") {
      alert("¡Tu postulación ha sido enviada con éxito!");
      form.reset();
      fileText.textContent = "CLICK TO UPLOAD YOUR CV (PDF ONLY)";
      fileWrapper.classList.remove("has-file");
    } else {
      alert(`Error en el servidor de Google: ${result.error}`);
    }
  } catch (error) {
    console.error("Error de red:", error);
    alert("Se envió la postulación (Nota: Si la fila apareció en tu Excel, puedes ignorar este aviso. Google Apps Script a veces da falsos bloqueos de CORS en respuestas directas).");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
  }
});