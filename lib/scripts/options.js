/* eslint-disable no-console */
/* eslint-disable no-invalid-this */
/* eslint-disable no-undef */
'use strict';

const app = angular.module('critic-filter-settings', ['ngRoute']);

const tableBodyID = 'table-body-stats';

app.config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: './components/main.html',
        controller: 'main-controller'
      });
  }
]);

app.controller('main-controller', [
  '$scope',
  function ($scope) {
    $scope.initTable = function() {
      const tableBodyElement = document.getElementById(tableBodyID);
      chrome.storage.local.get('store', function(details) {
        details = details.store;
        for (const wi in details.blacklistedWords) {
          const tr = document.createElement('tr');
          tr.innerHTML = formatTableRow(parseInt(wi)+1, details.blacklistedWords[wi], details.wordStatsMap[details.blacklistedWords[wi]].occurences);
          tableBodyElement.appendChild(tr);
        }
        // Attach event listeners.
        for (const wi in details.blacklistedWords) {
          document.getElementById(`remove-btn-id-${wi}`).addEventListener('click', function() {
            removeWord(parseInt(wi));
          }, false);
        }
      });
    };
  }
]);

function removeWord(id) {
  chrome.storage.local.get('store', function (details) {
    details = details.store;
    details.blacklistedWords.splice(id);
    chrome.storage.local.set({ store: details });
    window.location.reload();
  });
}

function formatTableRow(index, word, occurence) {
  return `<td scope="row">${index}</td><td>${word}</td><td>${occurence}</td><td><button type="button" class="btn btn-danger" id='remove-btn-id-${index-1}'>Remove</button></td>`;
}
