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
      <p></p>
      <p></p>
    </button>
    <div class="content"></div>
  </div>`;

class AccordionBar extends HTMLElement {
  constructor(_title, _lecture, _isOpen) {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(accordionBarTemplate.content.cloneNode(true));

    const title = this.getAttribute("title") || _title;
    const lecture = this.getAttribute("lecture") || _lecture;
    const isOpen = this.getAttribute("open") || _isOpen;

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

    this.shadowRoot.querySelector("button").addEventListener("click", () => {
      const icon = this.shadowRoot.querySelector(".icon");
      const content = this.shadowRoot.querySelector(".content");
      if (icon.classList.contains("open")) {
        icon.classList.remove("open");
        content.classList.remove("open");
      } else {
        icon.classList.add("open");
        content.classList.add("open");
      }
    });
  }

  /**
   * To populate the content of the accordion bar
   * @param {string[]} lectures
   */
  populateLecture(lectures) {
    const content = this.shadowRoot.querySelector(".content");
    for (const lecture of lectures) {
      // the bar container for each lecture
      const bar = document.createElement("div");
      bar.classList.add("bar");
      // the play icon
      const icon = document.createElement("img");
      icon.src = "/public/assets/images/icons/PlayCircleIcon.svg";
      icon.width = 25;
      icon.height = 25;
      icon.alt = "";
      // the lecture title
      const p = document.createElement("p");
      p.textContent = lecture;
      // append the icon and the title to the bar
      bar.appendChild(icon);
      bar.appendChild(p);
      content.appendChild(bar);
    }
  }
}

customElements.define("accordion-bar", AccordionBar);
