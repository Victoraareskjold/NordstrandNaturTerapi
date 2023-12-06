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

const productId = getQueryParams();

if (productId) {
  const docRef = doc(db, "products", productId);
  getDoc(docRef)
    .then((doc) => {
      if (doc.exists()) {
        const product = doc.data();
        document.getElementById("produktInfo").innerHTML = `

                  <img src="${product.image}" alt="${product.name}">

                  <div>

                    <div class="rowContainer">
                      <h1>${product.name}</h1>
                      <h2>${product.price} kr</h2>
                    </div>
                    
                    <div class="columnContainer">
                      <h5 style="margin-bottom: 4px">Beskrivelse</h5>
                      <p>${product.description}</p>
                    </div>
                    
                    <div class="columnContainer">
                      <h5 style="margin-bottom: 4px">Kategorier</h5>
                      <p>${product.categories}</p>
                    </div>

                    <div class="columnContainer">
                      <h5 style="margin-bottom: 4px">Ingredienser</h5>
                      <p>${product.Ingredients}</p>
                    </div>

                    <div class="buttonContainer">
                      <h5 style="margin-bottom: 4px">${product.price} kr - Legg til i handlekurv</h5>
                    </div>

                  </div>
            `;
      } else {
        document.getElementById("produktInfo").innerHTML =
          "<p>Produktet finnes ikke.</p>";
      }
    })
    .catch((error) => {
      console.error("Feil ved henting av produkt: ", error);
    });
}
