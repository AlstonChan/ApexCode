const header = document.getElementById("header");

/**
 *
 * @param {string[]} strings
 * @returns
 */
function html(strings) {
  return strings;
}

// Web Component
const template = document.createElement("template");
template.innerHTML = html`<link rel="stylesheet" href="./components/header/header.css" />
  <header>
    <div>
      <a href="/" class="logoContainer">
        <img
          src="./public/assets/images/logo-100x100.png"
          alt="logo"
          width="100"
          height="100"
        />
        <p>ApexCode</p>
      </a>
      <nav>
        <ul>
          <li><a href="/all-course.html">All Course</a></li>
          <li><a href="/faq.html">FAQ</a></li>
          <li><a href="/about.html">About</a></li>
          <li><a href="/pricing.html">Pricing</a></li>
          <li>
            <button class="cart">
              <img
                src="./public/assets/images/icons/CartIcon-white.svg"
                alt="cart"
                width="35"
                height="35"
              />
            </button>
          </li>
          <li><a class="auth" href="/login.html">Log In</a></li>
        </ul>
      </nav>
      <div class="hamburger">
        <button class="cart">
          <img
            src="./public/assets/images/icons/CartIcon-white.svg"
            alt="cart"
            width="35"
            height="35"
          />
        </button>
        <button id="menu">
          <img
            src="./public/assets/images/icons/MenuIcon-white.svg"
            alt="menu"
            width="35"
            height="35"
          />
        </button>
        <ul class="dropdown">
          <li><a href="/all-course.html">All Course</a></li>
          <li><a href="/faq.html">FAQ</a></li>
          <li><a href="/about.html">About</a></li>
          <li><a href="/pricing.html">Pricing</a></li>
          <li><a href="/login.html">Log In</a></li>
        </ul>
      </div>
    </div>
  </header>`;

class Navigation extends HTMLElement {
  #dropdownIsOpen = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const menuBtn = this.shadowRoot.getElementById("menu");
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.#dropdownIsOpen = !this.#dropdownIsOpen;
      console.log(e.currentTarget === menuBtn);

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
  }
}

customElements.define("navigation-bar", Navigation);
