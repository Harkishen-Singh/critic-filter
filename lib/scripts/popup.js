/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

const app = angular.module('critic-filter', ['ngRoute']);

const settingsElementID = 'settings-url-element';
const blacklistedWordsNumID = 'blacklisted-words-value';
const stateEnabledID = 'state-enabled-btn';
const stateEnabledParentID = 'state-enabled-btn-parent';
const stateDisabledID = 'state-disabled-btn';
const stateDisabledParentID = 'state-disabled-btn-parent';
const alertReloadID = 'alert-reload';

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
    const settingsPageURL = document.URL.replace('popup/view.html#!/', 'options/options-view.html');
    let isFirst = true;
    const settingsElement = document.getElementById(settingsElementID);
    settingsElement.href = settingsPageURL;
    settingsElement.target = '_blank';
    const elementEnabledBtn = document.getElementById(stateEnabledID);
    const elementEnabledBtnParent = document.getElementById(stateEnabledParentID);
    const elementDisabledBtn = document.getElementById(stateDisabledID);
    const elementDisabledBtnParent = document.getElementById(stateDisabledParentID);
    const inactiveClasses = 'btn btn-light btn-sm';
    const activeClasses = 'btn btn-success btn-sm active';
    const disabledActiveClasses = 'btn btn-danger btn-sm active';
    const reloadPageElement = document.getElementById(alertReloadID);
    reloadPageElement.style.display = 'none';

    chrome.storage.local.get('store', function (details) {
      details = details.store;
      const words = details.blacklistedWords;
      const elementNumBlacklistedWords = document.getElementById(blacklistedWordsNumID);
      elementNumBlacklistedWords.innerText = words.length.toString();
    });

    $scope.initState = function() {
      chrome.storage.local.get('store', function(details) {
        details = details.store;
        $scope.updateState(details.state);
      });
    };

    $scope.updateState = function(state) {
      if (state) {
        elementEnabledBtn.checked = true;
        elementDisabledBtn.checked = false;
        elementEnabledBtnParent.className = activeClasses;
        elementDisabledBtnParent.className = inactiveClasses;
      } else {
        elementEnabledBtn.checked = false;
        elementDisabledBtn.checked = true;
        elementDisabledBtnParent.className = disabledActiveClasses;
        elementEnabledBtnParent.className = inactiveClasses;
      }
      chrome.storage.local.get('store', function(details) {
        details = details.store;
        details.state = state;
        chrome.storage.local.set({ store: details });
        if (!isFirst) {
          reloadPageElement.style.display = 'block';
        } else {
          isFirst = false;
        }
      });
    };

    $scope.addNewWord = function () {
      chrome.storage.local.get('store', function (details) {
        details = details.store;
        const word = $scope.new_word;
        if (details.blacklistedWords.length === 1 && details.blacklistedWords[0] === '__sample__') {
          // Remove sample word that is inserted while during setup().
          details.blacklistedWords = [];
          details.wordStatsMap = {};
        }
        details.blacklistedWords.push(word);
        details.wordStatsMap[word] = {occurences: 0};
        chrome.storage.local.set({ store: details });
        window.location.reload();
      });
    };
  }
]);
