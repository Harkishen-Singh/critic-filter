chrome.storage.local.get("mainMemory", function (details) {
  var words = details.mainMemory.criticlistWords;
  console.log(words);
  var wordsNode = "";
  for (var i_4 = 0; i_4 < words.length; i_4++) {
    wordsNode += "<li>" + words[i_4] + "</li>";
  }
  document.getElementById("word_view").innerHTML = wordsNode;
});
