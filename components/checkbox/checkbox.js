/**
 *
 * @param {string[]} strings
 * @returns
 */
function html(strings) {
  return strings;
}

// Web Component
const checkboxTemplate = document.createElement("template");
checkboxTemplate.innerHTML = html`<link
    rel="stylesheet"
    href="/components/checkbox/checkbox.css"
  />
  <div class="container">
    <label for="">
      <input type="checkbox" name="" id="" />
      <span class="checkbox">
        <svg width="12px" height="11px" viewBox="0 0 12 11">
          <polyline points="1 6.29411765 4.5 10 11 1"></polyline>
        </svg>
      </span>
      <span data-label></span>
    </label>
  </div>`;

class Checkbox extends HTMLElement {
  constructor(_id, _label) {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(checkboxTemplate.content.cloneNode(true));

    const id = this.getAttribute("id") || _id;
    const label = this.getAttribute("label") || _label;

    if (id) {
      this.shadowRoot.querySelector("input").id = id;
      this.shadowRoot.querySelector("input").name = id;
      this.shadowRoot.querySelector("label").htmlFor = id;
    }

    if (label) {
      this.shadowRoot.querySelector("[data-label]").textContent = label;
    }
  }
}

customElements.define("checkbox-custom", Checkbox);
