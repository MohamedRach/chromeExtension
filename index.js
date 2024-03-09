document.getElementById("redirectionForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var originalUrl = document.getElementById("originalUrl").value;
    var redirectUrl = document.getElementById("redirectUrl").value;

    chrome.runtime.sendMessage({
        action: 'createRedirectRule',
        payload: {
            originalUrl: originalUrl,
            redirectUrl: redirectUrl
        }
    }, function(response) {
        if (response && response.success) {
            console.log("Redirection rule created successfully.");
        } else {
            console.error("Failed to create redirection rule.");
        }
    });

    document.getElementById("message").innerHTML += "success"
});
