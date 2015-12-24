function Controller($scope, $filter, $sce, $window, $timeout, appResource, queryHelper, clientConfig) { 

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

    //start loading
    init();
    
    /**
    * populate the scope from all the apps
    */
    function init() {
		appResource.getCategoriesAndNbHits({ indexSource: clientConfig.indexes.master }).$promise
            .then(function(data){
			var categories = [];
			for(var i in data.facets.category){
			  categories.push({ id: i, total: data.facets.category[i], selected: false });
			}
			$scope.placeholder = "look amongst the " + data.nbHits + " apps that we have !";
			//must be called .category to match algolia's facets property's name
			$scope.filters.category = categories;

			refresh();
			//refresh when search changes
			$scope.$watch('searchbox', function(newval, oldval){
				if(!angular.equals(newval,oldval)){
					$scope.filters.page = 0;
					refresh();
				}
			}, true);
			//refresh when filter changes
			$scope.$watch('filters', function(newval, oldval){
				if(!angular.equals(newval,oldval)) refresh();
			}, true);

			$scope.loaded = true;
        });
    }

    /**
    * triggered when filters or searchbox changes. Fetch a new dataset from Algolia
    */
    function refresh(){
        appResource.searchByName({ 
            query : $scope.searchbox, 
            facetFilters: queryHelper.getFacetFilters($scope.filters, facets), 
            hitsPerPage: 16, 
            page: $scope.filters.page, 
            indexSource: queryHelper.chooseSource($scope.filters.ascendantSort) 
        }).$promise
            .then(function searchSuccess(content) {
                $scope.results = content;
                $scope.nbPages = content.nbPages;

                //little trick to improve a liitle bit the DOM image refresh effect on user 
                //and prevents picture from loading from top to bottom

                $scope.results.hits.map(function(hit) {
                    //$timeout 0 triggered when DOM loaded so we can getElementById
                    $timeout(function(){
                        var img = getImage(hit);
						if(!document.getElementById(hit.objectID).hasChildNodes())
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
}

module.exports = Controller;