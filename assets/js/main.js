// TABLE OF CONTENTS

// 00. LOAD ALL FUNCTIONS
// 01. UPDATE RELATIVE DATES
// 02. OPEN EXTERNAL LINKS IN NEW TAB
// 03. CODE BLOCK COPY

// 00. LOAD ALL FUNCTION ----------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  updateRelativeDates();
  openExternalLinksInNewTab();
  codeBlockCopyButton();
});

// 01. UPDATE RELATIVE DATES ------------------------------------------------------------
function updateRelativeDates() {
  function timeAgo(date) {
    const now = new Date();
    const past = new Date(date);
    let seconds = Math.floor((now - past) / 1000);

    if (seconds < 0) return "In the future";

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    const vowelSoundExceptions = ["hour"];

    for (let unit in intervals) {
      let interval = Math.floor(seconds / intervals[unit]);
      let remainder = seconds % intervals[unit];

      if (interval >= 1) {
        // Special case: "Yesterday" (between 24-48 hours ago)
        if (unit === "day" && interval === 1 && seconds < 172800)
          return "Yesterday";

        // Use "Nearly": If remainder is above 90% of the next unit
        if (remainder >= intervals[unit] * 0.9) {
          return `Nearly ${interval + 1} ${unit}${interval + 1 > 1 ? "s" : ""} ago`;
        }

        // Use "An": For vowel sounds, including exceptions (e.g., "An hour ago")
        let article =
          interval === 1 &&
          (["a", "e", "i", "o", "u"].includes(unit[0]) ||
            vowelSoundExceptions.includes(unit))
            ? "An"
            : "A";

        // Singular: "A minute ago", "An hour ago", "A day ago"
        if (interval === 1) return `${article} ${unit} ago`;

        // Plural: "2 days ago", "5 hours ago"
        return `${interval} ${unit}s ago`;
      }
    }

    return "Just now";
  }

  document.querySelectorAll(".relative-time").forEach((el) => {
    el.textContent = timeAgo(el.dataset.time);
  });
}

// 02. OPEN EXTERNAL LINKS IN NEW TAB ---------------------------------------------------
function openExternalLinksInNewTab() {
  document.querySelectorAll('article a[href^="http"]').forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
}

// 03. CODE BLOCK COPY BUTTON -----------------------------------------------------------
function codeBlockCopyButton() {
  let codeBlocks = document.querySelectorAll("pre > code");

  if (codeBlocks.length > 0) {
    codeBlocks.forEach((code) => {
      let pre = code.parentElement;
      let wrapper = document.createElement("div");
      wrapper.classList.add("relative");

      // Move <pre> inside the wrapper
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      // Create Copy Button
      let copyButton = document.createElement("button");
      copyButton.innerText = "Copy";
      copyButton.className =
        "absolute top-4 right-4 bg-neutral-800 text-white px-2.5 py-1.5 text-xs rounded-md hover:bg-neutral-700 transition-all ease-in-out copy-btn hover:cursor-pointer";
      copyButton.setAttribute("aria-label", "Copy code to clipboard");

      // Append button inside wrapper instead of <pre>
      wrapper.appendChild(copyButton);

      // Copy Functionality
      copyButton.addEventListener("click", function () {
        let textToCopy = code.textContent.trim();

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
              copyButton.innerText = "Copied!";
              setTimeout(() => (copyButton.innerText = "Copy"), 1500);
            })
            .catch((err) => {
              console.error("Copy failed", err);
              fallbackCopy(textToCopy, copyButton);
            });
        } else {
          fallbackCopy(textToCopy, copyButton);
        }
      });

      function fallbackCopy(text, button) {
        let textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();

        try {
          let successful = document.execCommand("copy");
          if (successful) {
            button.innerText = "Copied!";
            setTimeout(() => (button.innerText = "Copy"), 1500);
          } else {
            console.error("Fallback: Copy command was unsuccessful");
          }
        } catch (err) {
          console.error("Fallback: Unable to copy", err);
        }

        document.body.removeChild(textArea);
      }
    });
  }
}
