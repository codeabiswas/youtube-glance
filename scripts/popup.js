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

// Add a custom tooltip to each YouTube link
youtubeLinks.forEach((link) => {
  link.addEventListener("mouseover", (event) => {
    tooltip.textContent = `Title: <title>\nViews: <count>\nLength: <duration>\nLikes: <likes>`;

    // Position the tooltip near the mouse cursor
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;

    tooltip.style.display = "block"; // Show the tooltip
  });

  link.addEventListener("mouseout", () => {
    tooltip.style.display = "none"; // Hide the tooltip
  });
});
