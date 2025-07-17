// TABLE OF CONTENTS

// 00. LOAD ALL FUNCTIONS
// 01. UPDATE RELATIVE DATES
// 02. OPEN EXTERNAL LINKS IN NEW TAB
// 03. CODE BLOCK COPY
// 04. TABLE OF CONTENTS DROPDOWN
// 05. TABLE OF CONTENTS HIGHLIGHT
// 06. HAMBURGER MENU
// 07. BACK TO TOP BUTTON

// 00. LOAD ALL FUNCTION ----------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  updateRelativeDates();
  openExternalLinksInNewTab();
  codeBlockCopyButton();
  tocToggle();
  tocHighlight();
  hamburgerMenu();
  backToTopButton();
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

// 04. TABLE OF CONTENTS DROPDOWN -------------------------------------------------------
function tocToggle() {
  const toggleBtn = document.getElementById("toc-toggle");
  const icon = document.getElementById("toc-icon");
  const content = document.getElementById("toc");

  if (!toggleBtn || !icon || !content) return;

  let isOpen = false;
  toggleBtn.addEventListener("click", () => {
    isOpen = !isOpen;

    if (isOpen) {
      content.classList.remove("max-h-0", "opacity-0");
      content.classList.add("max-h-[calc(100vh-8rem)]", "opacity-100");
      icon.classList.add("rotate-180");
    } else {
      content.classList.remove("max-h-[calc(100vh-8rem)]", "opacity-100");
      content.classList.add("max-h-0", "opacity-0");
      icon.classList.remove("rotate-180");
    }
  });
}

// 05. TABLE OF CONTENTS HIGHLIGHT ------------------------------------------------------
function tocHighlight() {
  const tocLinks = document.querySelectorAll("#toc a");
  const headingLinks = Array.from(tocLinks).map((link) =>
    document.querySelector(decodeURIComponent(link.getAttribute("href"))),
  );

  const setActive = () => {
    let index = headingLinks.findIndex((el, i) => {
      if (!el) return false;
      const next = headingLinks[i + 1];
      return (
        window.scrollY >= el.offsetTop - 120 &&
        (!next || window.scrollY < next.offsetTop - 120)
      );
    });

    tocLinks.forEach((link) => link.classList.remove("active"));
    if (index >= 0 && tocLinks[index]) {
      tocLinks[index].classList.add("active");
    }
  };

  window.addEventListener("scroll", setActive);
  setActive();
}

// 06. HAMBURGER MENU -------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  const iconOpen = document.getElementById("menu-open");
  const iconClose = document.getElementById("menu-close");

  let isOpen = false;

  const openMenu = () => {
    // Jump out open, jump in close
    iconOpen.classList.remove("opacity-100", "scale-100");
    iconOpen.classList.add("opacity-0", "scale-0");

    iconClose.classList.remove("opacity-0", "scale-0");
    iconClose.classList.add("opacity-100", "scale-100");

    menu.classList.remove("hidden");
    requestAnimationFrame(() => {
      menu.classList.add("opacity-100", "scale-100");
      menu.classList.remove("opacity-0", "scale-95");
    });

    toggleBtn.setAttribute("aria-expanded", "true");
    isOpen = true;
  };

  const closeMenu = () => {
    // Jump out close, jump in open
    iconOpen.classList.remove("opacity-0", "scale-0");
    iconOpen.classList.add("opacity-100", "scale-100");

    iconClose.classList.remove("opacity-100", "scale-100");
    iconClose.classList.add("opacity-0", "scale-0");

    menu.classList.add("opacity-0", "scale-95");
    menu.classList.remove("opacity-100", "scale-100");
    toggleBtn.setAttribute("aria-expanded", "false");
    isOpen = false;

    menu.addEventListener("transitionend", function handler() {
      if (!isOpen) menu.classList.add("hidden");
      menu.removeEventListener("transitionend", handler);
    });
  };

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    isOpen ? closeMenu() : openMenu();
  });

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !toggleBtn.contains(e.target) && isOpen) {
      closeMenu();
    }
  });
});

// 07. BACK TO TOP BUTTON ---------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    const showAfter = 300;
    const hideBeforeBottom = 300;

    const scrollY = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const fromBottom = pageHeight - (scrollY + windowHeight);

    if (scrollY > showAfter && fromBottom > hideBeforeBottom) {
      btn.classList.remove("scale-0", "opacity-0");
    } else {
      btn.classList.add("scale-0", "opacity-0");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
