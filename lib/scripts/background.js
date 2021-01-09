/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// Initialising the chrome storage.

const initialiseStore = {
  blacklistedWords: ['__sample__']
};

function setup() {
  chrome.storage.local.set({ store: initialiseStore });
}

chrome.runtime.onInstalled.addListener(setup);

//Declaring options for context-menu
var menu1 = {
  id: 'addWord',
  title: 'Add this word',
  contexts: ['selection']
};

chrome.contextMenus.create(menu1);

chrome.contextMenus.onClicked.addListener(function (clickData, $scope) {
  var text = clickData.selectionText;
  if (clickData.menuItemId === 'addWord' && text) {
    chrome.storage.local.get('store', function (details) {
      details.store.blacklistedWords.push(text);
      chrome.storage.local.set({ store: details.store });
    });
  }
});
