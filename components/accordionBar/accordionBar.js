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
  /**
   *
   * @param {string} _title The title of the accordion bar
   * @param {string} _lecture The number of lectures in the module, if any
   * @param {string} _para1 The first paragraph of the content, if any
   * @param {string} _para2 The second paragraph, if any
   * @param {string} _para3 The third paragraph, if any
   */
  constructor(_title, _lecture, _para1, _para2, _para3) {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(accordionBarTemplate.content.cloneNode(true));

    const title = this.getAttribute("title") || _title;
    const lecture = this.getAttribute("lecture") || _lecture;
    const para1 = this.getAttribute("para1") || _para1;
    const para2 = this.getAttribute("para2") || _para2;
    const para3 = this.getAttribute("para3") || _para3;

    if (title) {
      this.shadowRoot.querySelector("p").textContent = title;
    }
    if (lecture) {
      this.shadowRoot.querySelectorAll("p")[1].textContent = `${lecture} Lecture`;
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

    if (para1) {
      this.populatePara(para1, para2, para3);
    }
  }

  /**
   * To populate the content of the accordion bar
   * @param {string[]} lectures
   * @returns {void}
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

  /**
   * To populate the content of the accordion bar
   * @param {string} para1 The first paragraph
   * @param {string | undefined} para2 The second paragraph, if any
   * @param {string | undefined} para3 The third paragraph, if any
   * @returns {void}
   */
  populatePara(para1, para2, para3) {
    const content = this.shadowRoot.querySelector(".content");
    const bar = document.createElement("div");
    bar.classList.add("bar", "para");
    const p1 = document.createElement("p");
    bar.appendChild(p1);
    p1.textContent = para1;
    if (para2) {
      const p2 = document.createElement("p");
      p2.textContent = para2;
      bar.appendChild(p2);
    }
    if (para3) {
      const p3 = document.createElement("p");
      p3.textContent = para3;
      bar.appendChild(p3);
    }
    content.appendChild(bar);
  }
}

customElements.define("accordion-bar", AccordionBar);
