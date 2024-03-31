const courseCardContainer = document.getElementById("course-card-container");
// Get filter button
const filterDrawer = document.getElementById("filter-drawer");
const filterBtn = document.getElementById("filter");
const closeDrawerBtn = document.getElementById("close-drawer");
const clearFilterBtn = document.getElementById("clear-filter");
if (!document.getElementById("dimmed-bg")) {
  createDrawerBg();
}
const dimmedBg = document.getElementById("dimmed-bg");
// filter drawer level filter
const levelFilter = document.querySelectorAll("checkbox-custom[level]");

// https://developer.mozilla.org/en-US/docs/Glossary/IIFE
// This is a Immediately Invoked Function Expression (IIFE)
// that fetches the course data from the public and creates
// a course card for each course. The course card is a custom
// element that is defined in the course-card.js file. The
// course card contains information about the course such as title,
// description, thumbnail, category, level, and ratings
(async () => {
  const response = await fetch("/public/course.json");
  if (response.ok) {
    /**
     * @typedef {Object} CourseData
     * @property {CourseDetails[]} courses
     */

    /**
     * @typedef {Object} CourseDetails
     * @property {number} id unique course id
     * @property {string} title
     * @property {string} description
     * @property {string} thumbnail the filename of the thumbnail image
     * @property {string} category
     * @property {number} level 1 - beginner, 2 - intermediate, 3 - advanced
     * @property {string} language the language of the course
     */

    /**
     * @type {CourseData}
     */
    const data = await response.json();

    for (let i = 0; i < data.courses.length; i++) {
      const courseCard = document.createElement("course-card");
      courseCard.setAttribute("id", data.courses[i].id);
      courseCard.setAttribute("title", data.courses[i].title);
      courseCard.setAttribute("description", data.courses[i].description);
      courseCard.setAttribute("thumbnail", data.courses[i].thumbnail);
      courseCard.setAttribute("category", data.courses[i].category);
      courseCard.setAttribute("level", data.courses[i].level);
      courseCardContainer.appendChild(courseCard.cloneNode(true));
    }
  }
})();

// filter drawer state
const filterState = new Proxy(
  { drawerIsOpen: false },
  {
    set(obj, prop, value) {
      obj[prop] = value;

      return Reflect.set(...arguments);
    },
  }
);

toggleFilterDrawer(true);
filterBtn.addEventListener("click", () => {
  if (filterState.drawerIsOpen) {
    filterState.drawerIsOpen = false;
    toggleFilterDrawer(false);
  } else {
    filterState.drawerIsOpen = true;
    toggleFilterDrawer(true);
  }
});
dimmedBg.addEventListener("click", () => {
  filterState.drawerIsOpen = false;
  toggleFilterDrawer(false);
});
closeDrawerBtn.addEventListener("click", () => {
  filterState.drawerIsOpen = false;
  toggleFilterDrawer(false);
});

levelFilter.forEach((level) => {
  level.shadowRoot.querySelector("input").addEventListener("change", (e) => {
    console.log(e);
  });
});

/**
 * Create a dimmed background for filter drawer
 * @returns {void}
 */
function createDrawerBg() {
  const dimmedBg = document.createElement("div");
  dimmedBg.classList.add("hidden");
  dimmedBg.id = "dimmed-bg";
  document.querySelector("body").appendChild(dimmedBg);
}

/**
 * Toggle filter drawer
 * @param {boolean} isOpen
 * @returns {void}
 */
function toggleFilterDrawer(isOpen) {
  if (isOpen) {
    filterDrawer.classList.add("show");
    dimmedBg.classList.remove("hidden");
  } else {
    filterDrawer.classList.remove("show");
    dimmedBg.classList.add("hidden");
  }
}
