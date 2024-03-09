

// Listen for messages from the popup script (to create new rules)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'createRedirectRule') {
        const { originalUrl, redirectUrl } = message.payload;
        
        // Create a redirect rule
        chrome.declarativeNetRequest.updateDynamicRules({
            addRules: [
                {
                    id: Math.floor(Math.random() * 101), // Unique ID
                    priority: 1,
                    action: {
                        type: "redirect",
                        redirect: {
                            url: redirectUrl
                        }
                    },
                    condition: {
                        urlFilter: simplifyURL(originalUrl)
                    }
                }
            ]
        });
        console.log(redirectUrl, originalUrl)
        // Send a response back to the popup script
        sendResponse({ success: true });
    }
});

function simplifyURL(url) {
    // Remove the protocol (http:// or https://) and www. from the URL
    var simplifiedURL = url.replace(/^https?:\/\/(www\.)?/, '');
    // Remove trailing slash if present
    simplifiedURL = simplifiedURL.replace(/\/$/, '');
    // Get the domain name without the TLD (e.g., google)
    var domain = simplifiedURL.split('/')[0].split('.').slice(-2)[0];
    return domain;
}