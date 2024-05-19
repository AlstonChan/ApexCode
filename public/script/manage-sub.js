import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { auth, db } from "../../public/script/firebase-config.js";

const memberMonthly = document.getElementById("member-monthly");
const memberYearly = document.getElementById("member-yearly");

const cancelSub = document.querySelectorAll("[data-cancel");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;

    const docRef = doc(db, "accounts", `${uid}`);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    if (data.membership) {
      if (data.membership === "monthly") {
        memberMonthly.classList.remove("hidden");
      } else if (data.membership === "yearly") {
        memberYearly.classList.remove("hidden");
      } else {
        const container = document.querySelector(".main-content");
        const message = document.createElement("p");
        message.textContent = "You are not a member";
        container.appendChild(message);
      }
    } else {
      const container = document.querySelector(".main-content");
      const message = document.createElement("p");
      message.textContent = "You are not a member";
      container.appendChild(message);
    }
  } else {
    // User is signed out
    const container = document.querySelector(".main-content");
    const message = document.createElement("p");
    message.textContent = "You are not logged in";
    container.appendChild(message);
  }
});

cancelSub.forEach((button) => {
  button.addEventListener("click", async () => {
    const uid = auth.currentUser.uid;
    const docRef = doc(db, "accounts", `${uid}`);
    await updateDoc(docRef, {
      membership: null,
    });
    alert("Subscription cancelled");
    window.location.reload();
  });
});
