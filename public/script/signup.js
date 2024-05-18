import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { auth, db } from "./firebase-config.js";

const signupForm = document.getElementById("signup-form");
const usernameSignUpError = document.getElementById("usernameSignUpError");
const emailSignUpError = document.getElementById("emailSignUpError");
const passSignUpError = document.getElementById("passSignUpError");
const confPassError = document.getElementById("confPassError");

const formState = new Proxy(
  {
    username: null,
    email: null,
    password: null,
    confPassword: null,
  },
  {
    set(obj, prop, value) {
      obj[prop] = value;
      setInputError(formState);

      return Reflect.set(...arguments);
    },
  }
);

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = new FormData(e.target).get("signUpUsername");
  const email = new FormData(e.target).get("signUpEmail");
  const password = new FormData(e.target).get("signUpPassword");
  const confPassword = new FormData(e.target).get("confPass");

  // input validation
  if (username === "" || email === "" || password === "" || confPassword === "") {
    formState.username = "Username is required";
    formState.email = "Email is required";
    formState.password = "Password is required";
    formState.confPassword = "Please confirm your password";
    return;
  } else {
    formState.username = null;
    formState.email = null;
    formState.password = null;
    formState.confPassword = null;
  }

  if (username.length < 3 || username.length > 30) {
    return (formState.username = "Username must be between 3 and 30 characters");
  } else formState.username = null;

  const re =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (!re.test(email)) {
    return (formState.email = "Invalid email address");
  } else formState.email = null;

  if (password.length < 6) {
    return (formState.password = "Password must be at least 6 characters");
  } else formState.password = null;

  if (password !== confPassword) {
    return (formState.confPassword = "Passwords do not match");
  } else formState.confPassword = null;

  try {
    if (
      formState.username === null &&
      formState.email === null &&
      formState.password === null &&
      formState.confPassword === null
    ) {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "accounts", userCredential.user.uid), {
        name: username,
        uid: userCredential.user.uid,
        createdAt: Date(),
      });

      console.log(userCredential);
      signupForm.reset();
      window.location.href = "index.html";
    }
  } catch (error) {
    console.error(error);
  }
});

/**
 * Set error message for input fields
 * @typedef {Object} FormState
 * @property {string} formState.username
 * @property {string} formState.email
 * @property {string} formState.password
 * @property {string} formState.confPassword
 *
 * @param {FormState} formState
 * @return {void}
 */
function setInputError(formState) {
  if (formState.username !== null) {
    usernameSignUpError.textContent = formState.username;
  } else {
    usernameSignUpError.textContent = "";
  }

  if (formState.email !== null) {
    emailSignUpError.textContent = formState.email;
  } else {
    emailSignUpError.textContent = "";
  }

  if (formState.password !== null) {
    passSignUpError.textContent = formState.password;
  } else {
    passSignUpError.textContent = "";
  }

  if (formState.confPassword !== null) {
    confPassError.textContent = formState.confPassword;
  } else {
    confPassError.textContent = "";
  }
}
