import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { db } from "./firebase-config.js";

const topCourse = document.getElementById("top-course");

(async () => {
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

  const topThreeCourse = ratings.sort((a, b) => b.rating - a.rating).slice(0, 3);

  const response = await fetch("public/course.json");
  if (response.ok) {
    /**
     * @type {import("./types").CourseData}
     */
    const data = await response.json();

    switch (topThreeCourse.length) {
      case 0:
        // Randomly select 3 courses if there are no ratings
        topThreeCourse.push({ id: 1 }, { id: 2 }, { id: 3 });
        break;
      case 1:
        // Randomly select 2 courses if there is only 1 rating
        topThreeCourse.push({ id: 1 }, { id: 2 });
        break;
      case 2:
        // Randomly select 1 course if there are only 2 ratings
        topThreeCourse.push({ id: 1 });
        break;
    }

    topThreeCourse.forEach((course) => {
      const courseData = data.courses.find((c) => c.id === Number(course.id));
      const courseCard = document.createElement("course-card");
      courseCard.setAttribute("id", courseData.id);
      courseCard.setAttribute("title", courseData.title);
      courseCard.setAttribute("description", courseData.description);
      courseCard.setAttribute("thumbnail", courseData.thumbnail);
      courseCard.setAttribute("category", courseData.category);
      courseCard.setAttribute("level", courseData.level);
      const element = courseCard.cloneNode(true);
      topCourse.appendChild(element);
    });
  }
})();
