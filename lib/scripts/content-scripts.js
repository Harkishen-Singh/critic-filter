/* eslint-disable no-undef */
const elements = document.getElementsByTagName('*');

chrome.storage.local.get('store', function (details) {
  details = details.store;
  if (!details.state) {
    return;
  }
  mapstore = {}
  var arrayOfStrings = details.blacklistedWords;
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    for (var j = 0; j < element.childNodes.length; j++) {
      var newnode = element.childNodes[j];
      if (newnode.nodeType === 3) {
        var text = newnode.nodeValue.toLowerCase();
        for(var k = 0; k < arrayOfStrings.length; k++) {
          if(text.includes(arrayOfStrings[k].toLowerCase())) {
            element.style = 'filter: blur(5px)';
            mapstore[arrayOfStrings[k]] = 1
          }
        }
      }
    }
  }
  for (var k in mapstore) {
    details.wordStatsMap[k].occurences++;
  }
  chrome.storage.local.set({ store: details });
});
