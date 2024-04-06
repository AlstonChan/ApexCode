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
  const response = await fetch("/public/course.json");
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
}
