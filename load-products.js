import { db } from "./firebase-config.js";
import {
  collection,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

function loadProducts() {
  const productsRef = collection(db, "products");

  onSnapshot(productsRef, (querySnapshot) => {
    let productsHTML = "";

    querySnapshot.forEach((doc) => {
      const product = doc.data();
      productsHTML += `
        <div class="productCard">
            <div class="productImgContainer">
              <a href="productShowcase.html?id=${doc.id}">
                <img class="productImg" src="${product.image}" alt="${product.name}" />
                <div class="productOverlay">
                  <button class="detailButton">Vis detaljer</button>
                </div>
            </div>
          </a>
          <div class="infoContainer">
            <a href="productShowcase.html?id=${doc.id}">
              <h4>${product.name}</h4>
            </a>
            <div class="line"></div>
            <div class="priceCart">
              <p>${product.price} kr</p>
              <button>
                Legg til i handlekurv <img src="/images/Arrow 1.png" alt="" />
              </button>
            </div>
          </div>
        </div>
      `;
    });

    document.getElementById("product-container").innerHTML = productsHTML;
  });
}

loadProducts();
