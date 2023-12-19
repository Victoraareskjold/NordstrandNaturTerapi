import { db } from "./firebase-config.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Hjelpefunksjon for å hente produkt-ID fra URL
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

const behandlingerId = getQueryParams();

if (behandlingerId) {
  const docRef = doc(db, "behandlinger", behandlingerId);
  getDoc(docRef)
    .then((doc) => {
      if (doc.exists()) {
        const behandlinger = doc.data();
        document.getElementById("behandlingerInfo").innerHTML = `

                  <img src="${behandlinger.image}" alt="${behandlinger.name}">

                  <div>

                    <div class="columnContainer">
                      <h1>${behandlinger.name}</h1>
                      <p>${behandlinger.description}</p>
                      <p>Pris: ${behandlinger.pris},-</p>
                      <button class="primaryBtn bestillTimeBtn">Bestill time</button>
                    </div>

                  </div>

                  <!-- Booking modal -->
                <div id="bookingModal" class="modal">
                  <div class="modal-content">
                    <button class="tilbakeBtn" onclick="closeModal()">Lukk</button>
                    <h2>Book en time</h2>
                    <!-- 
                    <div id="velgKlinikk">
                      <button id="mossBtn">Moss</button>
                      <button id="osloBtn">Nordstrand</button>
                    </div>

                    <div id="kalenderVisning" style="display:none;">
                      <div>
                        <button id="forrigeUke">Forrige uke</button>
                        <button id="nesteUke">Neste uke</button>
                        <button id="iDag">I dag</button>
                      </div>
                      <div id="kalender"></div> -->

                    <iframe style="width: 100%; height: 750px;" frameborder="0"
                      src="https://system.easypractice.net/book/nordstrand-naturterapi"></iframe>
                  </div>
                </div>
            `;
      } else {
        document.getElementById("behandlingerInfo").innerHTML =
          "<p>Produktet finnes ikke.</p>";
      }
    })
    .catch((error) => {
      console.error("Feil ved henting av produkt: ", error);
    });

  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("bestillTimeBtn")) {
      openModal();
    }
  });
  function openModal() {
    const modal = document.getElementById("bookingModal");
    modal.style.display = "block"; // Eller en annen metode for å vise modalen
  }
  function closeModal() {
    document.getElementById("bookingModal").style.display = "none";
  }

  window.closeModal = closeModal;
}
