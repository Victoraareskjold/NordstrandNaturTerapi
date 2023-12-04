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
        <a href="productShowcase.html?id=${doc.id}">
        <div class="productCard">
          <img class="productImg" src="${product.image}" alt="${product.name}" />
          <div class="infoContainer">
            <h4>${product.name}</h4>
            <div class="line"></div>
            <div class="priceCart">
              <p>${product.price} kr</p>
              <button>
                Legg til i handlekurv <img src="/images/Arrow 1.png" alt="" />
              </button>
            </div>
          </div>
        </div>
        </a>
      `;
    });

    document.getElementById("product-container").innerHTML = productsHTML;
  });
}

loadProducts();
