/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

const app = angular.module('critic-filter', ['ngRoute']);

app.config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: './components/main.html',
        controller: 'main-controller'
      })
      .when('/view', {
        templateUrl: './components/view.html',
        controller: 'test-view'
      })
      .when('/try', {
        templateUrl: './components/try.html',
        controller: 'try-view'
      });
  }
]);

chrome.storage.local.get('mainMemory', function (details) {
  var words = details.mainMemory.criticlistWords;
  console.log(words);
  console.warn('inside the words storage');
  var wordsNode = '';
  for (var i_4 = 0; i_4 < words.length; i_4++) {
    wordsNode += '<li>' + words[i_4] + '</li>';
  }
  document.getElementById('word_view').innerHTML = wordsNode;
});

app.controller('main-controller', [
  '$scope',
  function ($scope) {
    console.warn('inside the main-contr');

    chrome.storage.local.get('mainMemory', function (details) {
      var words = details.mainMemory.criticlistWords;
      console.log(words);
      var wordsNode = '';
      for (var i_4 = 0; i_4 < words.length; i_4++) {
        wordsNode += '<li>' + words[i_4] + '</li>';
      }
      document.getElementById('word_view').innerHTML = wordsNode;
    });

    $scope.addNewWord = function () {
      console.log('button clicked');
      chrome.storage.local.get('mainMemory', function (details) {
        var word = $scope.new_word;
        console.log('word: ', word);
        details.mainMemory.criticlistWords.push(word);
        chrome.storage.local.set({ mainMemory: details.mainMemory });
        window.location.reload();
      });
    };
  }
]);

app.controller('test-view', [
  '$scope',
  function ($scope) {
    // console.warn('inside the test-view');
  }
]);

app.controller('try-view', [
  '$scope',
  function ($scope) {
    // console.warn('inside the try-view');
  }
]);
