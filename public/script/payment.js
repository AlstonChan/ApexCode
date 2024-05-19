import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { auth, db } from "../../public/script/firebase-config.js";

const audio = document.getElementById("audio");
const popup = document.getElementById("popup");
const form = document.getElementById("paymentForm");

const priceTag = document.querySelectorAll("[data-price]");

const methodId = new URLSearchParams(window.location.search).get("method");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;

      const cartContent = JSON.parse(localStorage.getItem("cart")) || [];

      if (cartContent.length > 0) {
        const docRef = doc(db, "accounts", `${uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          if (methodId === "0") {
            if (data.membership) {
              alert("You already have a membership, all courses are free for you");
              return;
            }

            if (data.course) {
              if (data.course.length > 0) {
                // check if the user has already purchased the course
                const purchased = data.course.some((courseId) =>
                  cartContent.includes(courseId)
                );

                if (purchased) {
                  alert("You have already purchased the course");
                  return;
                } else {
                  updateDoc(docRef, {
                    course: arrayUnion(...cartContent),
                  });
                  // payment success
                  audio.play();
                  popup.classList.remove("hidden");
                  // remove the cart from the local storage
                  localStorage.removeItem("cart");
                }
              }
            } else {
              updateDoc(docRef, {
                course: arrayUnion(...cartContent),
              });
              // payment success
              audio.play();
              popup.classList.remove("hidden");
              // remove the cart from the local storage
              localStorage.removeItem("cart");
            }
          } else {
            if (data.membership) {
              alert("You already have a membership");
              return;
            } else {
              const membership = new URLSearchParams(window.location.search).get(
                "membership"
              );
              if (membership === "0") {
                updateDoc(docRef, {
                  membership: "monthly",
                });
              } else {
                updateDoc(docRef, {
                  membership: "yearly",
                });
              }
              // payment success
              audio.play();
              popup.classList.remove("hidden");
            }
          }
        }
      } else [alert("Cart is empty, please add some items")];
    } else {
      alert("You need to sign in first");
    }
  });
});

const priceStatus = new Proxy(
  { price: 0 },
  {
    set(obj, prop, value) {
      obj[prop] = value;
      return Reflect.set(...arguments);
    },
  }
);

if (methodId && (methodId === "0" || methodId === "1")) {
  // method 0 is for course payment
  // method 1 is for membership payment
  if (methodId === "0") {
    // fetch the cart items from the local storage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length > 0) {
      let total = 0;
      const price = 89.99;

      total = price * cart.length;
      priceStatus.price = total;
      priceTag.forEach((tag) => {
        tag.textContent = total;
      });
    }
  } else {
    const membership = new URLSearchParams(window.location.search).get("membership");
    if (membership === "0") {
      priceStatus.price = 39.99;
      priceTag.forEach((tag) => {
        tag.textContent = 39.99;
      });
    } else {
      priceStatus.price = 399.99;
      priceTag.forEach((tag) => {
        tag.textContent = 399.99;
      });
    }
  }
} else {
  window.location.href = window.location.href.replace("payment", "cart");
}
