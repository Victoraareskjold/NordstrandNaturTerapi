import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
/* import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

const storage = getStorage();

async function uploadImage(file) {
  const storageRef = ref(storage, "images/" + file.name);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
}

document
  .getElementById("bildeOpplasting")
  .addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (file) {
      const downloadURL = await uploadImage(file);
      document.getElementById("bildeUrl").value = downloadURL;
    }
  }); */

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "/login.html";
  } else {
    // Ytterligere logikk her
  }
});

const productForm = document.getElementById("product-form");

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const navn = document.getElementById("navn").value;
  const pris = document.getElementById("pris").value;
  const bildeUrl = document.getElementById("bildeUrl").value;
  const beskrivelse = document.getElementById("beskrivelse").value;
  const lager = document.getElementById("lager").value;

  try {
    await addDoc(collection(db, "products"), {
      name: navn,
      price: pris,
      image: bildeUrl,
      description: beskrivelse,
      stock: lager,
    });

    productForm.reset();
    alert("Produkt lagt til!");
  } catch (error) {
    console.error("Feil ved å legge til produkt: ", error);
  }
});

function updatePreview() {
  const navn = document.getElementById("navn").value;
  const pris = document.getElementById("pris").value;
  const bildeUrl = document.getElementById("bildeUrl").value;
  const beskrivelse = document.getElementById("beskrivelse").value;

  const previewHTML = `
    <div class="productCard">
      <img class="productImg" src="${
        bildeUrl || "/path/to/default/image.jpg"
      }" alt="${navn}" />
      <div class="infoContainer">
        <h4>${navn || "Produktnavn"}</h4>
        <div class="line"></div>
        <div class="priceCart">
          <p>${pris || 0} kr</p>
          <button>
            Legg til i handlekurv <img src="/images/Arrow 1.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById("product-preview").innerHTML = previewHTML;
}

document.getElementById("navn").addEventListener("input", updatePreview);
document.getElementById("pris").addEventListener("input", updatePreview);
document.getElementById("bildeUrl").addEventListener("input", updatePreview);
document.getElementById("beskrivelse").addEventListener("input", updatePreview);

// Oppdater forhåndsvisningen når siden lastes
updatePreview();
