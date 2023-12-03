import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const auth = getAuth();
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Innlogging vellykket, omdiriger til admin-siden
      window.location.href = "/admin.html";
    })
    .catch((error) => {
      console.error("Innloggingsfeil: ", error);
      alert("Innlogging feilet: " + error.message); // Vis en feilmelding til brukeren
    });
});
