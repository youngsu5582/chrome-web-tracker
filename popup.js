document.addEventListener('DOMContentLoaded', function() {
  var getURLButton = document.getElementById('getURLButton');
  var currentURL = document.getElementById('currentURL');

  getURLButton.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var url = tabs[0].url;
      currentURL.textContent = url;
    });
  });
});
