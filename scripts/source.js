// Select YouTube links directly
const youtubeLinks = document.querySelectorAll(
  "a[href*='youtube.com/watch?v=']"
);

const tooltip = document.createElement("div");

tooltip.style.position = "absolute";
tooltip.style.backgroundColor = "#000000";
tooltip.style.padding = "10px";
tooltip.style.border = "1px solid #ccc";
tooltip.style.borderRadius = "4px";
tooltip.style.fontSize = "12px";
tooltip.style.zIndex = "9999";

// Attach the tooltip to the body (only once)
document.body.appendChild(tooltip);

// Fetch video details and update the tooltip content
async function fetchVideoDetails(videoId, apiKey) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics,contentDetails&key=${apiKey}`
    );
    const data = await response.json();
    const video = data.items[0];

    if (video) {
      duration = parseISO8601Duration(video.contentDetails.duration);
      duration.hours
        ? (tooltip.textContent = `Title: ${video.snippet.title}; Views: ${video.statistics.viewCount}; Likes: ${video.statistics.likeCount}; Duration: ${duration.hours}:${duration.minutes}:${duration.seconds}`)
        : (tooltip.textContent = `Title: ${video.snippet.title}; Views: ${video.statistics.viewCount}; Likes: ${video.statistics.likeCount}; Duration: ${duration.minutes}:${duration.seconds}`);
    } else {
      tooltip.textContent = "Video details not available";
    }
  } catch (error) {
    console.error("Error fetching video details:", error);
    tooltip.textContent = "Error fetching data";
  }
}

function parseISO8601Duration(durationString) {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const match = durationString.match(regex);

  if (match) {
    const hours = match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    const seconds = match[3] ? parseInt(match[3], 10) : 0;
    return { hours, minutes, seconds };
  } else {
    console.log("Invalid duration format.");
    return null;
  }
}

fetch(chrome.runtime.getURL("secrets.json"))
  .then((response) => response.json())
  .then((secrets) => {
    const apiKey = secrets.apiKey;

    // Add a custom tooltip to each YouTube link
    youtubeLinks.forEach((link) => {
      const videoId = link.href.match(/youtube\.com\/watch\?v=([^&]+)/)[1];

      link.addEventListener("mouseover", (event) => {
        fetchVideoDetails(videoId, apiKey); // Fetch video details

        // Position the tooltip near the mouse cursor
        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.style.top = `${event.pageY + 10}px`;
        tooltip.style.display = "block"; // Show the tooltip
      });

      link.addEventListener("mouseout", () => {
        tooltip.textContent = "";
        tooltip.style.display = "none"; // Hide the tooltip
      });
    });
  })
  .catch((error) => {
    console.error("Error loading secrets:", error);
    tooltip.textContent = "Error fetching data";
  });
