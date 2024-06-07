// Select all the links on the page
var links = document.querySelectorAll("a");
var youtubeLinks = Array.from(links).filter((link) =>
  link.href.includes("youtube.com/watch?v=")
);

// Add an event listener to each link
for (var i = 0; i < youtubeLinks.length; i++) {
  youtubeLinks[i].addEventListener("mouseenter", function () {
    console.log("Mouse entered a link");
  });
}
