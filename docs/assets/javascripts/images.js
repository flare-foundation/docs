var images = document.getElementsByTagName('img');
for (var i = 0, l = images.length; i < l; ++i) {
    const im = images[i];
    if (im.classList.contains("allow-zoom")) {
        im.title = 'Click to enlarge';
        im.outerHTML = '<a target="_blank" href="' + im.src + '">' + im.outerHTML + '</a>';
    }
};