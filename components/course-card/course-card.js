/**
 *
 * @param {string[]} strings
 * @returns
 */
function html(strings) {
  return strings;
}

// Web Component
const courseCardTemplate = document.createElement("template");
courseCardTemplate.innerHTML = html`
  <link rel="stylesheet" href="/components/course-card/course-card.css" />
  <a href="#" class="main">
    <div class="thumbnail">
      <img
        src="https://placehold.co/345x200"
        alt="illustration"
        width="345"
        height="200"
      />
    </div>
    <div class="content">
      <h2>Course Title</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur. Ut mi commodo pulvinar id consectetur orci
        et id. Ultrices consectetur sed euismod blandit sem pellentesque arcu. Elit sem
        lectus eu ut proin lectus tortor tortor aliquam. Mauris augue tristique
      </p>
      <div class="badges"></div>
      <div class="ratings">
        <img
          src="/public/assets/images/icons/StarFilledIcon.svg"
          width="20"
          height="20"
          alt=""
        />
        <img
          src="/public/assets/images/icons/StarFilledIcon.svg"
          width="20"
          height="20"
          alt=""
        />
        <img
          src="/public/assets/images/icons/StarFilledIcon.svg"
          width="20"
          height="20"
          alt=""
        />
        <img
          src="/public/assets/images/icons/StarFilledIcon.svg"
          width="20"
          height="20"
          alt=""
        />
        <img
          src="/public/assets/images/icons/StarIcon.svg"
          width="20"
          height="20"
          alt=""
        />
      </div>
      <div class="price">RM 20.00</div>
    </div>
  </a>
`;

class CourseCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(courseCardTemplate.content.cloneNode(true));

    const title = this.getAttribute("title");
    const description = this.getAttribute("description");
    const thumbnail = this.getAttribute("thumbnail");
    const category = this.getAttribute("category");
    const level = this.getAttribute("level");

    if (title) {
      this.shadowRoot.querySelector("h2").textContent = title;
    }
    if (description) {
      this.shadowRoot.querySelector("p").textContent = description;
    }
    if (thumbnail) {
      this.shadowRoot.querySelector(
        "img"
      ).src = `/public/assets/images/course-thumbnail/${thumbnail}`;
    }
    if (category) {
      const badge = document.createElement("p");
      badge.textContent = category;
      this.shadowRoot.querySelector(".badges").appendChild(badge);
    }
    if (level) {
      const badge = document.createElement("p");
      badge.classList.add("level");
      switch (Number(level)) {
        case 1:
          badge.textContent = "🟢 Beginner";
          badge.classList.add("beginner");
          break;
        case 2:
          badge.textContent = "🟡 Intermediate";
          badge.classList.add("intermediate");
          break;
        case 3:
          badge.textContent = "🔴 Advanced";
          badge.classList.add("advance");
          break;
        default:
          badge.textContent = "🟢 Beginner";
          badge.classList.add("beginner");
      }
      this.shadowRoot.querySelector(".badges").appendChild(badge);
    }
  }
}

customElements.define("course-card", CourseCard);
