import { db } from "./firebase-config.js";
import {
  collection,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { openModal } from "./modal-functions.js";

const behandlingerRef = collection(db, "behandlinger");

onSnapshot(behandlingerRef, (querySnapshot) => {
  let behandlingerHTML = "";

  querySnapshot.forEach((doc) => {
    const behandling = doc.data();
    behandlingerHTML += `
      <div class="behandlingerCard">
        <img src="${behandling.image}" alt="${behandling.name}" />
        <div class="alignment">
          <div class="cardText">
            <h3>${behandling.name}</h3>
            <p>${behandling.description}</p>
            <a href="behandlingerShowcase.html?id=${doc.id}"><button class="simpleBtn">Les mer..</button></a>
          </div>
          <button class="primaryBtn bestillTimeBtn">Bestill time</button>
        </div>
      </div>
    `;
  });

  document.querySelector(".cardContainer").innerHTML = behandlingerHTML;
});

// Legg til event listener for bestill time-knappene
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("bestillTimeBtn")) {
    openModal();
  }
});
