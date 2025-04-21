// TABLE OF CONTENTS

// 00. LOAD ALL FUNCTIONS
// 01. CODE BLOCK COPY
// 02. OPEN EXTERNAL LINKS IN NEW TAB
// 03. DROPDOWN MENU - WRITINGS
// 04. HAMBURGER MENU
// 05. UPDATE RELATIVE DATES
// 06. HEADER SCROLL EFFECT

// 00. LOAD ALL FUNCTION ----------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  copyCodeBlock();
  openExternalLinksInNewTab();
  dropdownHeaderWritings();
  hamburgerMenu();
  updateRelativeDates();
});

document.addEventListener("scroll", () => {
  headerScrollEffect();
});

// 01. CODE BLOCK COPY ------------------------------------------------------------------
function copyCodeBlock() {
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
        "absolute top-4 right-4 bg-neutral-700 text-white-prose px-2.5 py-1.5 text-xs rounded-md hover:bg-neutral-600 transition-all ease-in-out copy-btn hover:cursor-pointer";

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

// 02. OPEN EXTERNAL LINKS IN NEW TAB ---------------------------------------------------
function openExternalLinksInNewTab() {
  document.querySelectorAll('article a[href^="http"]').forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
}

// 03. DROPDOWN MENU - WRITINGS ---------------------------------------------------------
function dropdownHeaderWritings() {
  const dropdownButton = document.getElementById("dropdown-writings-button");
  const dropdownMenu = document.getElementById("dropdown-writings-menu");

  dropdownButton.addEventListener("click", function (event) {
    event.stopPropagation();
    const isOpen = dropdownMenu.classList.contains("opacity-100");

    if (isOpen) {
      dropdownMenu.classList.remove(
        "opacity-100",
        "scale-100",
        "pointer-events-auto",
      );
      dropdownMenu.classList.add(
        "opacity-0",
        "scale-95",
        "pointer-events-none",
      );
    } else {
      dropdownMenu.classList.remove(
        "opacity-0",
        "scale-95",
        "pointer-events-none",
      );
      dropdownMenu.classList.add(
        "opacity-100",
        "scale-100",
        "pointer-events-auto",
      );
    }
  });

  document.addEventListener("click", function (event) {
    if (
      !dropdownMenu.contains(event.target) &&
      !dropdownButton.contains(event.target)
    ) {
      dropdownMenu.classList.remove(
        "opacity-100",
        "scale-100",
        "pointer-events-auto",
      );
      dropdownMenu.classList.add(
        "opacity-0",
        "scale-95",
        "pointer-events-none",
      );
    }
  });
}

// 04. HAMBURGER MENU -------------------------------------------------------------------
function hamburgerMenu() {
  const hamburgerButton = document.getElementById("hamburger-button");
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const menuOpen = document.getElementById("menu-open");
  const menuClose = document.getElementById("menu-close");
  const header = document.getElementById("header");
  const body = document.body;

  // Open Menu
  hamburgerButton.addEventListener("click", () => {
    if (hamburgerMenu.classList.contains("hidden")) {
      // Show Menu
      hamburgerMenu.classList.remove("hidden");
      header.classList.remove("bg-neutral-900/50");
      header.classList.add("bg-neutral-900");
      setTimeout(() => {
        hamburgerMenu.classList.remove("translate-x-full");
      }, 50);
      setTimeout(() => {
        header.classList.remove("backdrop-blur-sm");
      }, 100);
      body.style.overflow = "hidden";

      // Toggle Icons
      menuOpen.classList.add("hidden");
      menuClose.classList.remove("hidden");
    } else {
      // Hide Menu
      hamburgerMenu.classList.add("translate-x-full");
      body.style.overflow = "";
      header.classList.add("bg-neutral-900/50", "backdrop-blur-sm");
      header.classList.remove("bg-neutral-900");

      setTimeout(() => {
        hamburgerMenu.classList.add("hidden");
      }, 300);

      // Toggle Icons
      menuOpen.classList.remove("hidden");
      menuClose.classList.add("hidden");
    }
  });

  // Close Menu
  document.addEventListener("click", (event) => {
    if (
      !hamburgerMenu.contains(event.target) &&
      !hamburgerButton.contains(event.target) &&
      !hamburgerMenu.classList.contains("hidden")
    ) {
      hamburgerMenu.classList.add("translate-x-full");
      body.style.overflow = "";

      setTimeout(() => {
        hamburgerMenu.classList.add("hidden");
      }, 300);

      // Toggle Icons
      menuOpen.classList.remove("hidden");
      menuClose.classList.add("hidden");
    }
  });
}

// 05. UPDATE RELATIVE DATES ------------------------------------------------------------
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

// 06. HEADER SCROLL EFFECT -------------------------------------------------------------
function headerScrollEffect() {
  const threshold = 150;
  const pageHeader = document.getElementById("header");

  if (window.scrollY > threshold) {
    pageHeader.classList.remove("border-neutral-800/0");
    pageHeader.classList.add(
      "border-neutral-800/50",
      "shadow-md",
      "bg-neutral-900/50",
      "backdrop-blur-sm",
    );
  } else {
    pageHeader.classList.remove(
      "border-neutral-800/50",
      "shadow-md",
      "bg-neutral-900/50",
      "backdrop-blur-sm",
    );
    pageHeader.classList.add("border-neutral-800/0");
  }
}
