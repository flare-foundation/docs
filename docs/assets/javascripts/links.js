var links = document.getElementsByTagName('a');
for (var i = 0, l = links.length; i < l; ++i) {
    const lk = links[i];
    if (lk.hostname != undefined && lk.hostname !== location.hostname) {
        lk.setAttribute("target", "_blank");
        lk.setAttribute("rel", "noopener noreferrer");
    }
};
