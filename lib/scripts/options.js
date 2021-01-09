/* eslint-disable no-console */
/* eslint-disable no-invalid-this */
/* eslint-disable no-undef */
chrome.storage.local.get('store', function (details) {
  details = details.store;
  var words = details.blacklistedWords;
  var wordsNode = '';
  for (var i_4 = 0; i_4 < words.length; i_4++) {
    wordsNode +=
      '<li>' +
      words[i_4] +
      '<div class="delete-button" id=' +
      words[i_4].replace(/ /g, '_') +
      '> &#x2702; </div> </li> ';
  }
  document.getElementById('word_view').innerHTML = wordsNode;
  for (var i = 0; i < words.length; i++) {
    document
      .getElementById(words[i].replace(/ /g, '_'))
      .addEventListener('click', removeWord, false);
  }
});

function removeWord() {
  var id = this.id;
  chrome.storage.local.get('store', function (details) {
    details = details.store
    var words = details.blacklistedWords;
    for (var j = 0; j < words.length; j++) {
      if (words[j] === id.replace(/_/g, ' ')) {
        console.warn('word found');
        details.blacklistedWords.splice(j, 1);
        break;
      }
    }
    chrome.storage.local.set({ store: details });
    window.location.reload();
  });
}
