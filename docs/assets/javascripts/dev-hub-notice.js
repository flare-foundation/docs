document.addEventListener('DOMContentLoaded', function() {
    // Create the developer hub notice
    const notice = document.createElement('div');
    notice.className = 'dev-hub-notice';
    notice.innerHTML = `
    <p>🚨 <strong>Developer Documentation has moved!</strong> Visit the <a href="https://dev.flare.network/" target="_blank">Flare Dev Hub</a> for all developer resources.</p>
    <button class="dev-hub-notice-close" aria-label="Close notification">✕</button>
  `;

    // Insert it as the first element after the header
    const header = document.querySelector('.md-header');
    if (header && header.nextElementSibling) {
        header.parentNode.insertBefore(notice, header.nextElementSibling);
    }

    // Add event listener to close button
    const closeButton = notice.querySelector('.dev-hub-notice-close');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            notice.style.display = 'none';
            // Set a cookie to remember that the notice was closed
            document.cookie = "devHubNoticeClosed=true; path=/; max-age=86400"; // 24 hours
        });
    }

    // Check if the notice was previously closed
    if (document.cookie.indexOf('devHubNoticeClosed=true') !== -1) {
        notice.style.display = 'none';
    }
});