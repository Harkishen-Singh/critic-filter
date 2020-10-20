// initialising the chrome storage
let initialiseMainMemory = {
  criticlistWords: ['required words']
};
function setup() {
  chrome.storage.local.set({ mainMemory: initialiseMainMemory });
}

chrome.runtime.onInstalled.addListener(setup);

//Declaring options for context-menu
var menu1 = {
    id: "addWord",
    title: "Add this word",
    contexts: ["selection"]
};

chrome.contextMenus.create(menu1);

chrome.contextMenus.onClicked.addListener( function(clickData,$scope){
    var text = clickData.selectionText;
    if (clickData.menuItemId == "addWord" && text) {
        chrome.storage.local.get("mainMemory", function (details) {
          console.log("text: ", text);
          details.mainMemory.criticlistWords.push(text);
          chrome.storage.local.set({ mainMemory: details.mainMemory });
        });
    }
});