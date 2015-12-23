function QueryHelper(clientConfig) {
    'use strict';
    
    /**
    * [private] clean input
    * @params input {string}
    * @returns string
    */
    function clean(input) {
      return input.replace('&amp;', "&");
    }

    return {
        /**
        * build algolia's facet query parameter according to the facetlist and data
        * @params input {string}
        * @returns string
        */
        getFacetFilters: function(data, facetsList){                  
            var result = [];
            for(var l = 0; l < facetsList.length; l++) {
                var currentFacets = data[facetsList[l]];
                for(var i = 0; i < currentFacets.length; i++) {
                    if(currentFacets[i].selected) result.push(facetsList[l] + ":" + clean(currentFacets[i].id));
                }
            }
            return result.length ? "(" + result.join(',') + ")" : "*";
        },
        /**
        * return the correct datasource used in the URL
        * @params rankAscendant {bool}
        * @returns string
        */
        chooseSource : function(rankAscendant){
          return !rankAscendant? clientConfig.indexes.rankDesc : clientConfig.indexes.rankAsc; 
        }
    };
}

module.exports = QueryHelper;