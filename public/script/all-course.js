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

const courseCard = document.createElement("course-card");
// Create 15 course cards. This is just a dummy data.
for (let i = 0; i < 15; i++) {
  courseCardContainer.appendChild(courseCard.cloneNode(true));
}

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

// toggleFilterDrawer(true);
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
