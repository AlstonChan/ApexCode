/**
 *
 * @param {string[]} strings
 * @returns
 */
function html(strings) {
  return strings;
}

// Web Component
const accordionBarTemplate = document.createElement("template");
accordionBarTemplate.innerHTML = html`<link
    rel="stylesheet"
    href="/components/accordionBar/accordionBar.css"
  />
  <div>
    <button class="main">
      <div class="icon">
        <img
          src="/public/assets/images/icons/ChevronUpIcon-white.svg"
          alt=""
          width="30"
          height="30"
        />
      </div>
      <p>Module 1 : Introduction to the course</p>
      <p>7 Lecture</p>
    </button>
    <div class="content"></div>
  </div>`;

class AccordionBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(accordionBarTemplate.content.cloneNode(true));

    const title = this.getAttribute("title");
    const lecture = this.getAttribute("lecture");
    const isOpen = this.getAttribute("open");

    if (title) {
      this.shadowRoot.querySelector("p").textContent = title;
    }
    if (lecture) {
      this.shadowRoot.querySelectorAll("p")[1].textContent = `${lecture} Lecture`;
    }
    if (isOpen) {
      this.shadowRoot.querySelector(".icon").classList.add("open");
    } else {
      this.shadowRoot.querySelector(".icon").classList.remove("open");
    }
  }
}

customElements.define("accordion-bar", AccordionBar);
