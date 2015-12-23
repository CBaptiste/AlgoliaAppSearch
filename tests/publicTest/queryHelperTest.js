describe('queryHelperTest test', function() {
    var mockHelper;

    beforeEach(module('appStore'));
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        mockHelper = $injector.get('queryHelper');
    }));


    it('should call return star if no facets', inject(function (appResource) {
        var data = { category: [] };
        var result = mockHelper.getFacetFilters(data, ['category']);
        expect(result).toBe('*');
    }));

    it('should be * if facets not selected', inject(function (appResource) {
        var data = { category: [{ selected : false, id : 'toto' }] };
        var facets = ['category'];
        var result = mockHelper.getFacetFilters(data, facets);
        expect(result).toBe('*');
    }));

    it('should be clean 1', inject(function (appResource) {
        var data = { category: [{ selected : true, id : 'toto &amp; tata' }] };
        var facets = ['category'];
        var result = mockHelper.getFacetFilters(data, facets);
        expect(result).toBe('(category:toto & tata)');
    }));

});