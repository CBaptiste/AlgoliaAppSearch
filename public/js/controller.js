var _ = require('underscore');

function Controller($scope, $filter, $sce, $window, $timeout, $http, appResource, queryHelper, clientConfig) { 

    'use strict';

    //the search with the GET parameter facetFilters is dynamic via this explicit list
    var facets = ['category'];
    var totalIndex;

    $scope.fake = "../public/img/fake.png"; // fake image for image-less data
    $scope.filters = { ascendantSort : true, page: 0 }; //anytime this model is changed, the results will be updated
    $scope.loaded = false;

    /**
    * Select or deselect a category filter
    * @param category model {Object}
    */
    $scope.selectFilter = function(categoryItem) {
        $scope.filters.page = 0;
        $scope.searchbox = "";
        categoryItem.selected = !categoryItem.selected;
    };

    /**
    * open a new tab with a specific url
    * @param url string {string}
    */
    $scope.go = function(url) {
        $window.open(url, '_target');
    };

    /**
    * open a new tab with a specific url
    * @param url string {string}
    */
    $scope.changeRankSort = function() {
        $scope.filters.ascendantSort = !$scope.filters.ascendantSort;
    };
    
    /**
    * decrease page reference
    */
    $scope.previous = function() {
        $scope.filters.page--;
    };

    
    /**
    * increase page reference
    */
    $scope.next = function(){
        $scope.filters.page++;
    };

    browseAll(null);


    
    /**
    * triggered when filters or searchbox changes. Fetch a new dataset from Algolia
    */
    function refresh(){        
        appResource.searchByName({ 
            query : $scope.searchbox, 
            facetFilters: queryHelper.getFacetFilters($scope.filters, facets), 
            hitsPerPage: 15, 
            page: $scope.filters.page, 
            indexSource: queryHelper.chooseSource($scope.filters.ascendantSort) 
        }).$promise
            .then(function searchSuccess(content) {
                $scope.results = content;
                $scope.nbPages = content.nbPages;

                //little trick to improve a liitle bit the DOM image refresh effect on user 
                //and prevents picture from loading from top to bottom

                $scope.results.hits.map(function(hit) {
                    //$timeout 0 triggered when DOM loaded so we can appendChild
                    $timeout(function(){
                        var img = getImage(hit);
                        document.getElementById(hit.objectID).appendChild(img);
                    },0);
                });

            });
    }
    
    /**
    * Create a new DOM image
    * @param url string {string}
    *@returns DOM node
    */
    function getImage(hit) {
        var img = new Image(30,30); 
        //to make sure that the image is displayed only when it is fully loaded           
        img.onload = function(){ img.style.visibility = 'visible'; }; 
        img.src = hit.image || $scope.fake;
        img.style.visibility = 'hidden';
        return img;
    }

        
    /**
    * recursive function to get apps and categories
    * @param algolia's browsing current cursor string {string}
    */
    function browseAll(cursor) {
        appResource.browseAll({cursor: cursor}).$promise
            .then(function(data){
                if(!totalIndex) totalIndex = data.hits;
                else  totalIndex = totalIndex.concat(data.hits);

                if(totalIndex.length < data.nbHits) browseAll(data.cursor);
                else if(totalIndex.length === data.nbHits){
                  init(totalIndex);
                } 
          });
    }

    
    /**
    * populate the scope from all the apps
    */
    function init(data) {

        var indexByCategories = _.countBy(data, 'category');
        var categories = [];
        for(var i in indexByCategories){
          categories.push({ id: i, total: indexByCategories[i], selected: false });
        }

        $scope.placeholder = "look amongst the " + data.length + " apps that we have !";
        //must be called .category to match algolia's facets property's name
        $scope.filters.category = categories;

        refresh();
        //refresh when search changes
        $scope.$watch('searchbox', function(newval, oldval){
            if(!angular.equals(newval,oldval)) refresh();
        });
        //changes when filter changes
        $scope.$watch('filters', function(newval, oldval){
            if(!angular.equals(newval,oldval)) refresh();
        }, true);
        $scope.loaded = true;
    }
}

module.exports = Controller;