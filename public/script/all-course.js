import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { db } from "./firebase-config.js";

const courseCardContainer = document.getElementById("course-card-container");
// search
const searchInput = document.getElementById("course-search");
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

    const querySnapshot = await getDocs(collection(db, "ratings"));
    const ratings = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const totalUserRated = Object.keys(data).reduce((acc, key) => {
        return acc + data[key].length;
      }, 0);
      const overallRating = Object.keys(data).reduce((acc, key) => {
        return acc + data[key].length * Number(key);
      }, 0);

      ratings.push({
        id: doc.id,
        rating: overallRating / totalUserRated,
      });
    });

    for (let i = 0; i < data.courses.length; i++) {
      const courseCard = document.createElement("course-card");

      const courseId = data.courses[i].id;
      const rating =
        ratings.find((r) => Number(r.id) === courseId)?.rating.toFixed(0) || 0;

      courseCard.setAttribute("id", courseId);
      courseCard.setAttribute("title", data.courses[i].title);
      courseCard.setAttribute("description", data.courses[i].description);
      courseCard.setAttribute("thumbnail", data.courses[i].thumbnail);
      courseCard.setAttribute("category", data.courses[i].category);
      courseCard.setAttribute("level", data.courses[i].level);
      courseCard.setAttribute("ratings", rating);
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

const showList = () => {
  const matchedCourses = allCourseCard.filter((course) => {
    const title = course.shadowRoot.querySelector("h2").textContent.toLowerCase();
    const description = course.shadowRoot.querySelector("p").textContent.toLowerCase();
    return title.includes(search_term) || description.includes(search_term);
  });

  allCourseCard.forEach((course) => {
    if (matchedCourses.includes(course)) {
      course.style.display = "block";
    } else {
      course.style.display = "none";
    }
  });

  return matchedCourses;
};

searchInput.addEventListener("input", (e) => {
  search_term = event.target.value.toLowerCase();
  console.log(showList());
});

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
