const pad = (n) => String(n).padStart(2, "0");

function updateTime() {
  const n = new Date();
  document.getElementById("liveTime").textContent =
    `${pad(n.getDate())}/${pad(n.getMonth() + 1)}/${n.getFullYear()} — ${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`;
}
setInterval(updateTime, 1000);
updateTime();

const btnStart = document.getElementById("btnStart");
const btnCapture = document.getElementById("btnCapture");
const btnStop = document.getElementById("btnStop");
const statusPill = document.getElementById("statusPill");
const statusText = document.getElementById("statusText");
const video = document.getElementById("video");
const placeholder = document.getElementById("placeholder");
const camOverlay = document.getElementById("camOverlay");
const camTag = document.getElementById("camTag");

let stream = null;

async function startCam() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await video.play();
    placeholder.classList.add("hidden");
    camOverlay.classList.add("visible");
  } catch (err) {
    alert("Camera access failed.\n" + err.name + " – " + err.message);
  }
}

function stopCam() {
  if (stream) {
    stream.getTracks().forEach((t) => t.stop());
    stream = null;
  }
  video.srcObject = null;
  placeholder.classList.remove("hidden");
  camOverlay.classList.remove("visible");
}

btnStart.onclick = () => {
  btnStart.disabled = true;
  btnStop.disabled = false;
  statusPill.className = "status-pill running";
  statusText.textContent = "RUNNING";
  camTag.textContent = "Inspection in progress";
  startCam();
};

btnCapture.onclick = () => {
  // Simple placeholder - you can improve this later
  alert("Capture functionality not fully implemented yet.");
};

btnStop.onclick = () => {
  btnStop.disabled = true;
  btnStart.disabled = false;
  btnCapture.disabled = false;
  statusPill.className = "status-pill waiting";
  statusText.textContent = "WAITING";
  stopCam();
  camTag.textContent = "—";
};

// ── Modal logic ──────────────────────────────────────────────
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.querySelector(".modal-close");
const prevBtn = document.querySelector(".modal-prev");
const nextBtn = document.querySelector(".modal-next");

let currentImages = [];
let currentIndex = 0;

function openModal(index) {
  currentImages = Array.from(document.querySelectorAll("#sliderTrack img"));
  currentIndex = index;
  showImage();
  modal.classList.add("show");
}

function showImage() {
  if (!currentImages.length) return;
  const img = currentImages[currentIndex];
  modalImg.src = img.src;
  modalImg.alt = img.alt;
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === currentImages.length - 1;
}

function closeModal() {
  modal.classList.remove("show");
  setTimeout(() => {
    modalImg.src = "";
  }, 300);
}

document.querySelectorAll("#sliderTrack img").forEach((img, i) => {
  img.addEventListener("click", () => openModal(i));
});

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    showImage();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < currentImages.length - 1) {
    currentIndex++;
    showImage();
  }
});

window.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("show")) return;
  if (e.key === "ArrowLeft") prevBtn.click();
  if (e.key === "ArrowRight") nextBtn.click();
  if (e.key === "Escape") closeModal();
});

// Hide loader
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loaderDots").style.display = "none";
  }, 1400);
});
