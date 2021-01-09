/* eslint-disable no-undef */
var elements = document.getElementsByTagName('*');

chrome.storage.local.get('store', function (details) {
  details = details.store;
  if (!details.state) {
    return;
  }
  var arrayOfStrings = details.blacklistedWords;
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    for (var j = 0; j < element.childNodes.length; j++) {
      var newnode = element.childNodes[j];
      if (newnode.nodeType === 3) {
        var text = newnode.nodeValue.toLowerCase();
        const found = arrayOfStrings.find((v) =>
          text.includes(v.toLowerCase())
        );
        if (found) {
          element.style = 'filter: blur(5px)';
        }
      }
    }
  }
});
