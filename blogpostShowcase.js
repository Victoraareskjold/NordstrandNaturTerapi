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

const blogPostId = getQueryParams();

if (blogPostId) {
  const docRef = doc(db, "blog", blogPostId);
  getDoc(docRef)
    .then((doc) => {
      if (doc.exists()) {
        const blog = doc.data();
        document.getElementById("blogPostShowcase").innerHTML = `

                    <div class="blogHeader">
                      <h2>${blog.title}</h2>
                      <h5>${blog.time} min. lesetid</h5>
                      <p>${blog.summary} kr</p>
                    </div>

            `;
      } else {
        document.getElementById("blogPostShowcase").innerHTML =
          "<p>Produktet finnes ikke.</p>";
      }
    })
    .catch((error) => {
      console.error("Feil ved henting av produkt: ", error);
    });
}
