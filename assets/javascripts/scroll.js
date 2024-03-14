(function() {
  // Trigger when the page is fully loaded
  window.onload = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Check if URL parameters exist
    if (urlParams.has("tag") && urlParams.has("ctrl") && urlParams.has("op")) {
      const iframeSelector = urlParams.get("iframeSelector") || ".swagger-ui-iframe";
      const tag = urlParams.get("tag");
      const controller = urlParams.get("ctrl");
      const operationId = urlParams.get("op");
      const elementSelector = `operations-${tag}-${controller}_${operationId}`;

      scrollToIframeIdAndHighlight(iframeSelector, elementSelector);
    }
  };

  // Scrolls to and highlights an element within an iframe
  async function scrollToIframeIdAndHighlight(iframeSelector, elementSelector) {
    try {
      const iframe = await waitFor(() => document.querySelector(iframeSelector));

      if (iframe && iframe.contentWindow) {
        if (iframe.contentWindow.document.readyState === "complete") {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          const element = await waitFor(() => iframeDoc.querySelector(`[id='${elementSelector}']`));

          if (element) {
            // Ensure the operation detail is expanded before scrolling
            const control = element.querySelector(".opblock-summary-control");
            if (control) {
              control.click();
              // Animation is applied directly via CSS to '.opblock.is-open'
            }

            element.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "nearest",
            });
          }
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // Utility to wait for a condition to be true
  function waitFor(condition, timeout = 30000) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();

      function checkCondition() {
        const result = condition();
        if (result) {
          resolve(result);
        } else {
          if (Date.now() - startTime >= timeout) {
            reject(new Error("Timeout exceeded while waiting for condition."));
          } else {
            setTimeout(checkCondition, 100);
          }
        }
      }

      checkCondition();
    });
  }
})();