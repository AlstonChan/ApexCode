import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { auth } from "./firebase-config.js";

const loginForm = document.getElementById("login-form");
const emailLoginError = document.getElementById("emailLoginError");
const passLoginError = document.getElementById("passLoginError");
const generalError = document.getElementById("generalError");

const formState = new Proxy(
  {
    email: null,
    password: null,
    general: null,
  },
  {
    set(obj, prop, value) {
      obj[prop] = value;
      setInputError(formState);

      return Reflect.set(...arguments);
    },
  }
);

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = new FormData(e.target).get("loginEmail");
  const password = new FormData(e.target).get("loginPassword");

  // input validation
  if (email === "" || password === "") {
    formState.email = "Email is required";
    formState.password = "Password is required";
    return;
  } else {
    formState.email = null;
    formState.password = null;
  }

  const re =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (!re.test(email)) {
    return (formState.email = "Invalid email address");
  } else formState.email = null;

  if (password.length < 6) {
    return (formState.password = "Invalid Password");
  } else formState.password = null;

  try {
    if (formState.email === null && formState.password === null) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
    }
  } catch (error) {
    // A general vague error message is shown to the user in case of any error
    // This is to prevent leaking sensitive information to the user
    // to prevent adversary from knowing what went wrong
    if (error) formState.general = "Invalid email or password";
    // console.error(error);
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
  if (formState.email !== null) {
    emailLoginError.textContent = formState.email;
  } else {
    emailLoginError.textContent = "";
  }

  if (formState.password !== null) {
    passLoginError.textContent = formState.password;
  } else {
    passLoginError.textContent = "";
  }

  if (formState.general !== null) {
    generalError.textContent = formState.general;
  } else {
    generalError.textContent = "";
  }
}

