chrome.storage.local.get("mainMemory", function (details) {
  var words = details.mainMemory.criticlistWords;
  console.log(words);
  var wordsNode = "";
  for (var i_4 = 0; i_4 < words.length; i_4++) {
    wordsNode += "<li>" + words[i_4] + "</li>";
  }
  document.getElementById("word_view").innerHTML = wordsNode;
});

$(function () {
  $("#addWord").click(function () {
    chrome.storage.local.get("mainMemory", function (details) {
      var word = document.getElementById("critic_word").value;
      console.log("word: ", word);
      details.mainMemory.criticlistWords.push(word);
      chrome.storage.local.set({ mainMemory: details.mainMemory });
      var wordsnewNode = "<li>" + word + "</li>";
      document.getElementById("word_view").innerHTML += wordsnewNode;
      document.getElementById("critic_word").value = "";
    });
  });
});
