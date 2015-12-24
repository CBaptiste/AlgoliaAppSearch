describe('Service test', function() {
    var $httpBackend, mockService;

    beforeEach(module('appStore'));
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        mockService = $injector.get('appResource');
    }));

    describe('testing api services', function () {

        it('should call BrowseAll', inject(function (appResource) {
            
            $httpBackend.expectGET('https://0LM8552PMH-dsn.algolia.net/1/indexes/AppStore_master?query=&distinct=1&facets=*')
                .respond({ hits: [], nbPages: 2 });

            var result = appResource.getCategoriesAndNbHits({ indexSource: 'AppStore_master' });
            $httpBackend.flush();
            expect(result.nbPages).toBe(2);
        }));

        it('should call SearchByName', inject(function (appResource) {
            
            $httpBackend.expectGET('https://0LM8552PMH-dsn.algolia.net/1/indexes/?query=&distinct=1&hitsPerPage=&restrictSearchableAttributes=name&facetFilters=')
                .respond({ hits: [], nbPages: 2 });

            var result = appResource.searchByName();
            $httpBackend.flush();
            expect(result.nbPages).toBe(2);
        }));

    });
});