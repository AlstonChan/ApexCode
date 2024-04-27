const head = document.querySelector("head");

// Create a meta tag with the charset attribute
const charsetUTF = document.createElement("meta");
charsetUTF.setAttribute("charset", "UTF-8");

// Create a meta tag with the name and content attributes
const viewportDefault = document.createElement("meta");
viewportDefault.setAttribute("name", "viewport");
viewportDefault.setAttribute("content", "width=device-width, initial-scale=1.0");

// Create a link for the global css
const globalCss = document.createElement("link");
globalCss.setAttribute("rel", "stylesheet");
globalCss.setAttribute("href", "public/style/global.css");

// Create a link for the favicon
const favicon = document.createElement("link");
favicon.setAttribute("rel", "shortcut icon");
favicon.setAttribute("href", "public/assets/images/favicon.ico");
favicon.setAttribute("type", "image/x-icon");

// Create a meta tag with the name and content attributes
const descriptionMeta = document.createElement("meta");
descriptionMeta.setAttribute("name", "description");
descriptionMeta.setAttribute(
  "content",
  "ApexCode is a platform for learning how to code. We offer a variety of courses for all skill levels."
);

head.insertBefore(descriptionMeta, head.firstChild);
head.insertBefore(favicon, head.firstChild);
head.insertBefore(viewportDefault, head.firstChild);
head.insertBefore(charsetUTF, head.firstChild);
head.appendChild(globalCss);
