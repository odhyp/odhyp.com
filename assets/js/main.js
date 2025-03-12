// TABLE OF CONTENTS

// 00. LOAD ALL FUNCTIONS
// 01. CODE BLOCK COPY
// 02. OPEN EXTERNAL LINKS IN NEW TAB

// 00. LOAD ALL FUNCTION ----------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  copyCodeBlock();
  openExternalLinksInNewTab();
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
