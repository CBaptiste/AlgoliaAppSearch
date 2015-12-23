function Service($resource, clientConfig){
    'use strict';

    /**
    * angular's built-in resource to build RESTful server communication
    * @params data {Object}
    * @returns $resource
    */
    return $resource("", {}, {
        searchByName: {
            method: "GET",
            url: "https://" + clientConfig.appId + "-dsn.algolia.net/" + clientConfig.version + "/indexes/:indexSource?query=:query&distinct=1&hitsPerPage=:hitsPerPage&restrictSearchableAttributes=:restrictSearchableAttributes&facetFilters=:facetFilters",
            params:{
                query: '@query',
                hitsPerPage: '@hitsPerPage',
                restrictSearchableAttributes: 'name',
                facetFilters: '@facetFilters',
                indexSource: '@indexSource'
            },
            headers: clientConfig.httpAuthentificationHeader
        },
        browseAll: {
            method: "GET",
            url: "https://" + clientConfig.appId + "-dsn.algolia.net/" + clientConfig.version + "/indexes/" + clientConfig.indexes.master + "/browse?cursor=:cursor",
            params: {
                cursor: '@cursor'
            },
            headers: clientConfig.httpAuthentificationHeader
        }
    });
}

module.exports = Service;