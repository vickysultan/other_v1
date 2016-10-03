angular
           .module('firstApplication', ['ngMaterial'])
           .controller('autoCompleteController', autoCompleteController);

        function autoCompleteController ($timeout, $q, $log) {
           var self = this;
           self.simulateQuery = false;
           self.isDisabled    = false;
           // list of states to be displayed
           self.states        = loadStates();
           self.querySearch   = querySearch;
           self.selectedItemChange = selectedItemChange;
           self.searchTextChange   = searchTextChange;
           self.newState = newState;
           function newState(state) {
              alert("This functionality is yet to be implemented!");
           }    
           function querySearch (query) {
              var results = query ? self.states.filter( createFilterFor(query) ) : self.states, deferred;
              if (self.simulateQuery) {
                 deferred = $q.defer();
                 $timeout(function () { 
                       deferred.resolve( results ); 
                    }, 
                    Math.random() * 1000, false);
                 return deferred.promise;
              } else {
                 return results;
              }
           }
           function searchTextChange(text) {
              $log.info('Text changed to ' + text);
           }
           function selectedItemChange(item) {
              $log.info('Item changed to ' + JSON.stringify(item));
           }
           //build list of states as map of key-value pairs
           function loadStates() {
              var allStates = 'Ahemdabad, Agra, Amritsar, Bombay, Bhopal, Bangalore, chennai, Coimbatore, Kolkata';
              return allStates.split(/, +/g).map( function (state) {
                 return {
                    value: state.toLowerCase(),
                    display: state
                 };
              });
           }
           //filter function for search query
           function createFilterFor(query) {
              var lowercaseQuery = angular.lowercase(query);
              return function filterFn(state) {
                 return (state.value.indexOf(lowercaseQuery) === 0);
              };
           }
        }  