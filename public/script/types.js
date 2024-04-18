/**
 * @typedef {Object} CourseData
 * @property {CourseDetails[]} courses
 */

/**
 * @typedef {Object} CourseContent
 * @property {number} id
 * @property {string} module
 * @property {string[]} lessons
 */

/**
 * @typedef {Object} CourseDetails
 * @property {number} id unique course id
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {string} language the language of the course
 * @property {string} lastUpdate the date when the course was last updated
 * @property {number} level 1 - beginner, 2 - intermediate, 3 - advanced
 * @property {string} thumbnail the filename of the thumbnail image
 * @property {CourseContent[]} content the course content in modules and lessons
 */

exports.default = {};
