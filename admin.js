import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

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

export {};
