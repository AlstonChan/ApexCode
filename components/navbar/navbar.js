import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { auth } from "../../public/script/firebase-config.js";
/**
 *
 * @param {string[]} strings
 * @returns
 */
function html(strings) {
  return strings;
}

// Web Component
const navBarTemplate = document.createElement("template");
navBarTemplate.innerHTML = html`<link
    rel="stylesheet"
    href="components/navbar/navbar.css"
  />
  <header>
    <div>
      <a href="index.html" class="logoContainer">
        <img
          src="public/assets/images/logo-100x100.png"
          alt="logo"
          width="100"
          height="100"
        />
        <p>ApexCode</p>
      </a>
      <nav>
        <ul>
          <li><a href="all-course.html">All Course</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="pricing.html">Pricing</a></li>
          <li>
            <button class="cart">
              <img
                src="public/assets/images/icons/CartIcon-white.svg"
                alt="cart"
                width="35"
                height="35"
              />
            </button>
          </li>
          <li id="nav-auth">
            <a class="auth" href="login.html">Log In</a>
          </li>
        </ul>
      </nav>
      <div class="hamburger">
        <button class="cart">
          <img
            src="public/assets/images/icons/CartIcon-white.svg"
            alt="cart"
            width="35"
            height="35"
          />
        </button>
        <button id="menu">
          <img
            src="public/assets/images/icons/MenuIcon-white.svg"
            alt="menu"
            width="35"
            height="35"
          />
        </button>
        <ul class="dropdown">
          <li><a href="all-course.html">All Course</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="pricing.html">Pricing</a></li>
          <li><a href="login.html">Log In</a></li>
        </ul>
      </div>
    </div>
  </header>`;

class Navigation extends HTMLElement {
  #dropdownIsOpen = false;
  #authDropdownIsOpen = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(navBarTemplate.content.cloneNode(true));

    const menuBtn = this.shadowRoot.getElementById("menu");
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.#dropdownIsOpen = !this.#dropdownIsOpen;

      if (this.#dropdownIsOpen) {
        this.shadowRoot.querySelector(".dropdown").style.visibility = "visible";
        this.shadowRoot.querySelector(".dropdown").style.opacity = 1;
        menuBtn.style.transform = "scale(0.95)";
      } else {
        this.shadowRoot.querySelector(".dropdown").style.visibility = "hidden";
        this.shadowRoot.querySelector(".dropdown").style.opacity = 0;
        menuBtn.style = null;
      }
    });

    document.body.addEventListener("click", (e) => {
      if (e.currentTarget !== menuBtn) {
        this.#dropdownIsOpen = false;
        this.shadowRoot.querySelector(".dropdown").style.visibility = "hidden";
        this.shadowRoot.querySelector(".dropdown").style.opacity = 0;
        menuBtn.style = null;
      }
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const element = this.#createProfileElement();
        this.shadowRoot.getElementById("nav-auth").innerHTML = "";
        this.shadowRoot.getElementById("nav-auth").appendChild(element);
        this.shadowRoot.getElementById("nav-logout").addEventListener("click", () => {
          this.#logoutUser();
        });
      }
    });
  }

  #createProfileElement() {
    // Profile element
    const profile = document.createElement("button");
    profile.className = "profile";

    const img = document.createElement("img");
    img.src = "public/assets/images/icons/ProfileIcon-white.svg";
    img.alt = "profile picture";
    img.width = 35;
    img.height = 35;
    img.classList.add("profile-icon");
    profile.appendChild(img);

    profile.addEventListener("click", () => {});

    // Dropdown element
    const dropdown = document.createElement("ul");
    dropdown.className = "authDropdown";
    dropdown.innerHTML = `
      <li><a href="profile.html">Profile</a></li>
      <li><p id="nav-logout">Logout</p></li>
    `;

    profile.addEventListener("click", (e) => {
      e.stopPropagation();
      this.#authDropdownIsOpen = !this.#authDropdownIsOpen;

      if (this.#authDropdownIsOpen) {
        dropdown.style.visibility = "visible";
        dropdown.style.opacity = 1;
      } else {
        dropdown.style.visibility = "hidden";
        dropdown.style.opacity = 0;
      }
    });

    document.body.addEventListener("click", (e) => {
      if (e.currentTarget !== dropdown) {
        this.#authDropdownIsOpen = false;
        this.shadowRoot.querySelector(".authDropdown").style.visibility = "hidden";
        this.shadowRoot.querySelector(".authDropdown").style.opacity = 0;
      }
    });

    profile.appendChild(dropdown);

    return profile;
  }

  #logoutUser() {
    auth.signOut().then(() => {
      window.location.href = "logout.html";
    });
  }
}

customElements.define("navigation-bar", Navigation);

const navBar = document.createElement("navigation-bar");
document
  .querySelector("body")
  .insertBefore(navBar, document.querySelector("body").firstChild);
