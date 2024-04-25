/**
 *
 * @param {string[]} strings
 * @returns
 */
function html(strings) {
  return strings;
}

// Web Component
const footerBoxTemplate = document.createElement("template");
footerBoxTemplate.innerHTML = html`<link
    rel="stylesheet"
    href="components/footer/footer-box.css"
  />
  <footer>
    <div class="footer-content">
      <div class="left">
        <h2>ApexCode</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Per ornare odio</p>
        <address>
          <p>
            Email address:
            <a href="mailto:support@apexcode.com">support@apexcode.com</a>
          </p>
          <p>Phone: <a href="tel:+1234567890">+1234567890</a></p>
        </address>
      </div>
      <div class="right">
        <h3>Quick Links</h3>
        <div class="links">
          <ul class="dropdown">
            <li><a href="index.html">Home</a></li>
            <li><a href="all-course.html">All Course</a></li>
            <li><a href="faq.html">FAQ</a></li>
            <li><a href="about.html">About</a></li>
          </ul>
          <ul class="dropdown">
            <li><a href="pricing.html">Pricing</a></li>
            <li><a href="LICENSE.md">License</a></li>
            <li><a href="login.html">Login</a></li>
            <li><a href="signup.html">Sign Up</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="copyright">Copyright @ <span id="copyright-year"></span> ApexCode</div>
  </footer>`;

class FooterBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(footerBoxTemplate.content.cloneNode(true));

    const startingYear = 2024;
    const currentYear = new Date().getFullYear();
    const yearElement = this.shadowRoot.getElementById("copyright-year");
    yearElement.textContent =
      currentYear === startingYear ? startingYear : `${startingYear} - ${currentYear}`;
  }
}

customElements.define("footer-box", FooterBox);

const footerBox = document.createElement("footer-box");
document.querySelector("body").appendChild(footerBox);
