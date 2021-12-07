document.getElementById('highlight').addEventListener('click', sendHighlightMessage, false);

function sendHighlightMessage() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {highlight: true}, function(response) {
      console.log(response);
    });
  });
}
