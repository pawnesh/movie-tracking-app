chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('window.html', {
      'outerBounds': {
        'width': 505,
        'height': 760
      }
    });
  });