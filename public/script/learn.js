import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { auth, db } from "../../public/script/firebase-config.js";

const drawer = document.getElementById("drawer");
const videoContainer = document.getElementById("video-container");
const ratingStars = document.querySelectorAll("[data-stars]");
const submitRating = document.getElementById("submit-rating");
const ratingForm = document.getElementById("rating-form");

const fetchStatus = new Proxy(
  { error: null, data: null, rating: 0 },
  {
    set(obj, prop, value) {
      obj[prop] = value;
      if (prop === "data") {
        updateCourseDetail(value);
        populateDrawer(value);
      }
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

    const docRef = doc(db, "ratings", `${fetchStatus.data.id}`);
    const docSnap = await getDoc(docRef);

    const ratingRadio = document.querySelectorAll('input[type="radio"]');

    if (docSnap.exists()) {
      const data = docSnap.data();
      for (let i = 1; i <= 5; i++) {
        if (data && data[i] && data[i].includes(auth.currentUser.uid)) {
          fetchStatus.rating = i;
        }
      }
    }

    for (const radio of ratingRadio) {
      if (fetchStatus.rating == radio.value) {
        radio.checked = true;
        const label = radio.nextElementSibling;
        const span = document.createElement("span");
        span.textContent = "You rated this course";
        span.style.color = "var(--success)";
        span.style.marginLeft = "1rem";
        span.dataset.prevRate = "true";
        label.appendChild(span);
      }
    }
  }
})();

ratingForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(ratingForm);
  const rating = formData.get("rating");

  if (!rating) return;
  const docRef = doc(db, "ratings", `${fetchStatus.data.id}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    if (
      fetchStatus.rating === 0 ||
      (fetchStatus.rating && fetchStatus.rating != rating)
    ) {
      await updateDoc(docRef, {
        [fetchStatus.rating]: arrayRemove(auth.currentUser.uid),
        [rating]: arrayUnion(auth.currentUser.uid),
      });
      fetchStatus.rating = rating;

      const prevRate = document.querySelector('[data-prev-rate="true"]');
      if (prevRate) {
        prevRate.remove();
      }
      const span = document.createElement("span");
      span.textContent = "You rated this course";
      span.style.color = "var(--success)";
      span.style.marginLeft = "1rem";
      span.dataset.prevRate = "true";
      const ratingRadio = document.querySelector(
        `input[type="radio"][value="${rating}"]`
      );
      ratingRadio.nextElementSibling.appendChild(span);
    } else {
      alert("You have already rated this course");
    }
  } else {
    await setDoc(docRef, { [rating]: [auth.currentUser.uid] });
    const span = document.createElement("span");
    span.textContent = "You rated this course";
    span.style.color = "var(--success)";
    span.style.marginLeft = "1rem";
    span.dataset.prevRate = "true";
    const ratingRadio = document.querySelector(`input[type="radio"][value="${rating}"]`);
    ratingRadio.nextElementSibling.appendChild(span);
  }
});

/**
 *
 * @param {import("./types").CourseDetails} course
 */
function populateDrawer(course) {
  const a = document.createElement("a");
  a.href = `course.html?id=${course.id}&category=${course.category}`;
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
      a.href = `learn.html?id=${course.id}&module=${content.module}&lecture=${lesson}`;

      const lessonType = document.createElement("img");
      lessonType.src = "public/assets/images/icons/PlayCircleIcon.svg";
      lessonType.width = 25;
      lessonType.height = 25;
      lessonType.alt = "";

      let completed = false;
      if (completed) {
        const tickImg = document.createElement("img");
        tickImg.src = "public/assets/images/icons/CheckIcon-green.svg";
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
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;

      const video = createVideo(course.thumbnail);
      videoContainer.insertBefore(video, videoContainer.children[0]);
    } else {
      // User is signed out
      // ...
      const lock = createLockAccess();
      videoContainer.insertBefore(lock, videoContainer.children[0]);
      submitRating.disabled = true;
    }
  });

  const lecture = new URLSearchParams(window.location.search).get("lecture");

  document.getElementById("lecture-title").textContent = lecture;
}

/**
 * Create video element
 * @param {string} thumbnail
 * @returns {HTMLVideoElement}
 */
function createVideo(thumbnail) {
  const video = document.createElement("video");
  video.autoplay = false;
  video.controls = true;
  video.loop = false;
  video.poster = `public/assets/images/course-thumbnail/${thumbnail}`;

  const source = document.createElement("source");
  source.src = `public/assets/videos/course.mp4`;
  source.type = "video/mp4";
  video.appendChild(source);
  return video;
}

function createLockAccess() {
  const lock = document.createElement("div");
  lock.classList.add("lock");
  lock.innerHTML = `
    <img class="lock-img" src="public/assets/images/icons/LockIcon-white.svg" alt="lock icon" width="50" height="50" />
    <h3>Course content Locked</h3>
    <p>Unlock this lecture by enrolling in the course</p>
    <p>If you're already enrolled, 
      <a href="login.html">you'll need to login</a>
    .</p>
  `;
  return lock;
}

(function createRatings() {
  for (let i = 0; i < ratingStars.length; i++) {
    const rating = ratingStars[i];
    const ratingValue = rating.dataset.stars;

    const numberOfStars = parseInt(ratingValue);
    const stars = [];
    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement("img");
      star.src = "public/assets/images/icons/StarFilledIcon.svg";
      star.alt = "star icon";
      star.width = 25;
      star.height = 25;
      stars.push(star);
    }

    const starDesc = document.createElement("span");
    starDesc.textContent = `${ratingValue} Stars`;
    rating.append(...stars, starDesc);
  }
})();
