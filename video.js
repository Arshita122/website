function embedVideo(videoUrl, containerId) {
    // Check if videoUrl is provided
    if (!videoUrl) {
        console.error("Video URL is required");
        return;
    }

    // Check if the container element exists
    var container = document.getElementById(containerId);
    if (!container) {
        console.error("Container element not found");
        return;
    }

    // Create an iframe element
    var iframe = document.createElement('iframe');

    // Set iframe attributes
    iframe.setAttribute('src', videoUrl);
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('allowfullscreen', true); // Allow full-screen mode

    // Append the iframe to the container
    container.appendChild(iframe);
}
