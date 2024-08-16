import { db } from "./firebase-config.js";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { openModal } from "./modal-functions.js";

// Hent referanse til samlingen "behandlinger"
const behandlingerRef = collection(db, "behandlinger");

// Lag en forespørsel som sorterer dokumentene etter "priority" feltet
const q = query(behandlingerRef, orderBy("priority", "asc"));

onSnapshot(q, (querySnapshot) => {
  let behandlingerHTML = "";

  // Gå gjennom de sorterte dokumentene
  querySnapshot.forEach((doc) => {
    const behandling = doc.data();

    behandlingerHTML += `
      <div class="behandlingerCard">
        <a href="behandlingerShowcase.html?id=${doc.id}">
          <img src="${behandling.image}" alt="${behandling.name}" />
        </a>
        <div class="alignment">
          <a href="behandlingerShowcase.html?id=${doc.id}">
            <div class="cardText">
              <h3>${behandling.name}</h3>
              <p>${behandling.description}</p>
              <a href="behandlingerShowcase.html?id=${doc.id}"><button class="simpleBtn">Les mer..</button></a>
            </div>
          </a>
          <button class="primaryBtn bestillTimeBtn">Bestill time</button>
        </div>
      </div>
    `;
  });

  // Sett den genererte HTML-koden inn i DOM-elementet
  document.querySelector(".cardContainer").innerHTML = behandlingerHTML;
});

// Legg til event listener for "Bestill time"-knappene
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("bestillTimeBtn")) {
    openModal();
  }
});
