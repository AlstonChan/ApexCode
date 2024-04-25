const drawer = document.getElementById("drawer");

const fetchStatus = new Proxy(
  { error: null, data: null },
  {
    set(obj, prop, value) {
      obj[prop] = value;
      updateCourseDetail(value);
      populateDrawer(value);
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
function populateDrawer(course) {
  const a = document.createElement("a");
  a.href = `/course.html?id=${course.id}&category=${course.category}`;
  a.textContent = course.title;
  document.querySelector("h2").appendChild(a);

  for (let i = 0; i < course.content.length; i++) {
    const content = course.content[i];
    const module = document.createElement("div");
    module.classList.add("module");

    const title = document.createElement("h3");
    title.classList.add("moduleHead");
    title.textContent = content.module;

    const completion = document.createElement("small");
    completion.classList.add("completion");
    const completionStatus = document.createElement("span");
    completionStatus.textContent = `0/${content.lessons.length} completed`;
    completion.appendChild(completionStatus);

    const lessons = document.createElement("ul");
    for (let j = 0; j < content.lessons.length; j++) {
      const lesson = content.lessons[j];
      const lessonItem = document.createElement("li");

      const linkContainer = document.createElement("div");
      linkContainer.classList.add("linkContainer");
      const a = document.createElement("a");
      a.textContent = lesson;
      a.href = `/learn.html?id=${course.id}&module=${content.module}&lecture=${lesson}`;

      const lessonType = document.createElement("img");
      lessonType.src = "/public/assets/images/icons/PlayCircleIcon.svg";
      lessonType.width = 25;
      lessonType.height = 25;
      lessonType.alt = "";

      let completed = false;
      if (completed) {
        const tickImg = document.createElement("img");
        tickImg.src = "/public/assets/images/icons/CheckIcon-green.svg";
        tickImg.width = 25;
        tickImg.height = 25;
        tickImg.alt = "";
        tickImg.style.marginLeft = "auto";
      }

      linkContainer.appendChild(lessonType);
      linkContainer.appendChild(a);
      if (completed) linkContainer.appendChild(tickImg);

      lessonItem.appendChild(linkContainer);
      lessons.appendChild(lessonItem);
    }

    module.appendChild(title);
    module.appendChild(completion);
    module.appendChild(lessons);
    drawer.appendChild(module);
  }
}

/**
 *
 * @param {import("./types").CourseDetails} course
 */
function updateCourseDetail(course) {
  const video = document.querySelector("video");
  video.poster = `/public/assets/images/course-thumbnail/${course.thumbnail}`;

  const lecture = new URLSearchParams(window.location.search).get("lecture");

  document.getElementById("lecture-title").textContent = lecture;
}
