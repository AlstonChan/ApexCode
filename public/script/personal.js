import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { auth, db } from "../../public/script/firebase-config.js";

const username = document.getElementById("username");
const email = document.getElementById("email");

const memberMonthly = document.getElementById("member-monthly");
const memberYearly = document.getElementById("member-yearly");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;

    const docRef = doc(db, "accounts", `${uid}`);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    username.textContent = data.name;
    email.textContent = user.email;

    if (data.membership) {
      if (data.membership === "monthly") {
        memberMonthly.classList.remove("hidden");
      } else if (data.membership === "yearly") {
        memberYearly.classList.remove("hidden");
      }
    }
  } else {
    // User is signed out
    username.textContent = "Guest";
  }
});
