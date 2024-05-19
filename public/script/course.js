const addToCart = document.getElementById("addToCart");

const fetchStatus = new Proxy(
  { error: null, data: null },
  {
    set(obj, prop, value) {
      obj[prop] = value;
      updateCourseDetail(value);
      return Reflect.set(...arguments);
    },
  }
);

(async () => {
  const response = await fetch("public/course.json");
  if (response.ok) {
    /**
     * @type {import("./types").CourseData}
     */
    const data = await response.json();
    const id = new URLSearchParams(window.location.search).get("id");

    const course = data.courses.find((course) => course.id === Number(id));
    if (course) {
      fetchStatus.data = course;
    } else {
      fetchStatus.error = "Course not found";
    }
  }
})();

/**
 *
 * @param {import("./types").CourseDetails} course
 */
function updateCourseDetail(course) {
  document.title = `Apex Code | ${course.title}`;

  const title = document.querySelector("h1");
  title.textContent = course.title;

  const desc = document.querySelector("p.desc");
  desc.textContent = course.description;

  const language = document.getElementById("lang");
  language.textContent = course.language;

  const lastUpdate = document.getElementById("lastUpdate");
  lastUpdate.textContent = course.lastUpdate;

  const skillLevel = document.getElementById("skillLevel");
  switch (course.level) {
    case 1:
      skillLevel.textContent = "Beginner";
      break;
    case 2:
      skillLevel.textContent = "Intermediate";
      break;
    case 3:
      skillLevel.textContent = "Advanced";
      break;
    default:
      skillLevel.textContent = "Unknown";
  }

  let moduleCount = 0;
  let lectureCount = 0;
  const courseAccordion = document.querySelector(".content");
  for (const module of course.content) {
    moduleCount++;
    lectureCount += module.lessons.length;
    const accordionBar = new AccordionBar(module.module, module.lessons.length, false);
    accordionBar.populateLecture(course.id, module.module, module.lessons);
    courseAccordion.appendChild(accordionBar);
  }

  const moduleCountElement = document.getElementById("moduleCount");
  moduleCountElement.textContent = moduleCount;
  const lectureCountElement = document.getElementById("lectureCount");
  lectureCountElement.textContent = lectureCount;
}

addToCart.addEventListener("click", function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const id = new URLSearchParams(window.location.search).get("id");
  if (cart.includes(id)) {
    alert("Course already added to cart");
    return;
  }
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Course added to cart");
});
