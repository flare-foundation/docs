// External links
var links = document.getElementsByTagName("a");
for (var i = 0, l = links.length; i < l; ++i) {
  const lk = links[i];
  if (lk.hostname != undefined && lk.hostname !== location.hostname) {
    lk.setAttribute("target", "_blank");
    lk.setAttribute("rel", "noopener noreferrer");
  }
}

// Tutorial comments in source code
var comments = document.getElementsByClassName("c1");
var h3s = document.getElementsByTagName("h3");
const re = /^\/\/ ([0-9]+)\./;
for (var i = 0, l = comments.length; i < l; ++i) {
  const c = comments[i];
  // Find all code comments starting with a number and a dot
  const r = c.innerText.match(re);
  if (r) {
    // Locate target header
    const target = [...h3s].find((e) => e.id.startsWith(`${r[1]}-`));
    // Add link
    if (target) c.outerHTML = `<a href="#${target.id}">` + c.outerHTML + "</a>";
  }
}

async function checkIframeLoaded(path) {
  try {
    const iframe = await waitFor(() =>
      document.querySelector(".swagger-ui-iframe")
    );

    if (iframe && iframe.contentWindow) {
      if (iframe.contentWindow.document.readyState === "complete") {
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        var element = await waitFor(() => iframeDoc.getElementById(path));

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              console.log("Element is visible");
              observer.disconnect();
            } else {
              element.scrollIntoView({
                behavior: "auto",
                block: "center",
                inline: "nearest",
              });
              console.log("Element is NOT visible");
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

window.onload = function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const x = urlParams.get("tag");
  const y = urlParams.get("op");
  const result = `operations-${x}-BTCAddressValidityVerifierController_${y}`;

  checkIframeLoaded(result);
};

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