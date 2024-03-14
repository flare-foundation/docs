// External links
const links = document.getElementsByTagName("a");
const content = document.getElementsByClassName("md-content")[0];
for (var i = 0, l = links.length; i < l; ++i) {
  const lk = links[i];
  if (lk.hostname != undefined && lk.hostname !== location.hostname) {
    lk.setAttribute("target", "_blank");
    lk.setAttribute("rel", "noopener noreferrer");
    if (content.contains(lk) && !lk.classList.contains("md-icon")) {
      lk.classList.add("external-link");
    }
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