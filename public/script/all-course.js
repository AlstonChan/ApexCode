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

/**
 * @type {HTMLElement[]}
 */
const allCourseCard = [];

// https://developer.mozilla.org/en-US/docs/Glossary/IIFE
// This is a Immediately Invoked Function Expression (IIFE)
// that fetches the course data from the public and creates
// a course card for each course. The course card is a custom
// element that is defined in the course-card.js file. The
// course card contains information about the course such as title,
// description, thumbnail, category, level, and ratings
(async () => {
  const response = await fetch("public/course.json");
  if (response.ok) {
    /**
     * @type {import("./types").CourseData}
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
      const element = courseCard.cloneNode(true);
      allCourseCard.push(element);
      courseCardContainer.appendChild(element);
    }
    document.getElementById("filter-result").textContent = allCourseCard.length;
  }
})();

// filter drawer state
const filterState = new Proxy(
  {
    drawerIsOpen: false,
    beginner: false,
    intermediate: false,
    advanced: false,
  },
  {
    set(obj, prop, value) {
      obj[prop] = value;

      switch (prop) {
        case "drawerIsOpen":
          toggleFilterDrawer(value);
          break;

        default:
          break;
      }

      let resultCount = 0;

      const checkedLevel = Object.keys(obj).filter((key) => {
        if (key === "drawerIsOpen") return false;
        return obj[key];
      });
      if (checkedLevel.length === 0) {
        allCourseCard.forEach((card) => {
          card.style.display = "block";
          resultCount = allCourseCard.length;
        });
      } else {
        allCourseCard.forEach((card) => {
          const element = card.shadowRoot.querySelector(".level");
          if (
            element.classList &&
            checkedLevel.some((level) => element.classList.contains(level))
          ) {
            card.style.display = "block";
            resultCount++;
          } else {
            card.style.display = "none";
          }
        });
      }

      document.getElementById("filter-result").textContent = resultCount;
      const totalFilterCount = checkedLevel.length;
      document.querySelector(".filter-count").textContent = totalFilterCount;

      return Reflect.set(...arguments);
    },
  }
);

// toggleFilterDrawer(true);
filterBtn.addEventListener("click", () => {
  if (filterState.drawerIsOpen) {
    filterState.drawerIsOpen = false;
  } else {
    filterState.drawerIsOpen = true;
  }
});
dimmedBg.addEventListener("click", () => {
  filterState.drawerIsOpen = false;
});
closeDrawerBtn.addEventListener("click", () => {
  filterState.drawerIsOpen = false;
});

levelFilter.forEach((level) => {
  level.shadowRoot.querySelector("input").addEventListener("change", (e) => {
    if (e.target.checked) {
      filterState[e.target.id] = true;
    } else {
      filterState[e.target.id] = false;
    }
  });
});

document.querySelectorAll(".clear-filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    levelFilter.forEach((level) => {
      level.shadowRoot.querySelector("input").checked = false;
    });
    filterState.beginner = false;
    filterState.intermediate = false;
    filterState.advanced = false;
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
