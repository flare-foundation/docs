(function() {
  var url = window.location.href;
  var pattern = /\/apis\/REST\/(attestation-client|btcverifier|dogeverifier|evmverifier)/i;

  if (!pattern.test(url)) {
    return;
  }

  window.onload = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const iframeSelector = urlParams.get("iframeSelector") || ".swagger-ui-iframe"; // Fallback to default if not provided
    const tag = urlParams.get("tag");
    const controller = urlParams.get("ctrl");
    const operationId = urlParams.get("op");
    const elementSelector = `operations-${tag}-${controller}_${operationId}`;

    scrollToIframeId(iframeSelector, elementSelector);
  };

  async function scrollToIframeId(iframeSelector, path) {
    try {
      const iframe = await waitFor(() => document.querySelector(iframeSelector));

      if (iframe && iframe.contentWindow) {
        if (iframe.contentWindow.document.readyState === "complete") {
          var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          var element = await waitFor(() => iframeDoc.querySelector(`[id='${path}']`));

          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // Attempt to simulate a click to expand the operation, if possible
                const control = element.querySelector(".opblock-summary-control");
                if (control) {
                  control.click();
                }
                observer.disconnect();
              } else {
                element.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                  inline: "nearest",
                });
              }
            });
          });

          observer.observe(element);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function waitFor(condition, timeout = 30000) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();

      function checkCondition() {
        const result = condition();
        if (result) {
          resolve(result);
        } else {
          const currentTime = Date.now();
          if (currentTime - startTime >= timeout && timeout != 0) {
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