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
      <div class="badges">
        <span>Javascript</span>
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
  }
}

customElements.define("course-card", CourseCard);
