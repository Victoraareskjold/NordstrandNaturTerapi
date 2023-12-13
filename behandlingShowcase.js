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
}
