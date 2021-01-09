/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

const app = angular.module('critic-filter', ['ngRoute']);
const blacklistedWordsNumID = 'blacklisted-words-value';

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

app.controller('main-controller', [
  '$scope',
  function ($scope) {
    chrome.storage.local.get('store', function (details) {
      details = details.store;
      const words = details.blacklistedWords;
      const elementNumBlacklistedWords = document.getElementById(blacklistedWordsNumID);
      elementNumBlacklistedWords.innerText = words.length.toString();
    });

    $scope.addNewWord = function () {
      chrome.storage.local.get('store', function (details) {
        details = details.store;
        const word = $scope.new_word;
        if (details.blacklistedWords.length === 1 && details.blacklistedWords === '__sample__') {
          // Remove sample word that is inserted while during setup().
          details.blacklistedWords = [];
        }
        details.blacklistedWords.push(word);
        chrome.storage.local.set({ store: details });
        window.location.reload();
      });
    };
  }
]);
