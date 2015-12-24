describe('Test controller', function() {
    var scope, $httpBackend, $filter, $q, $sce, $window, appResource, queryHelper, clientConfig, _, controller, mockAlgoliaResponse, defered;

    mockAlgoliaResponse = {
        hits: [],
		facets: { category: {} }
    };
	clientConfigMock = {
		indexes: {
			master: 'toto'
		}
	};
    mockService = {
        getCategoriesAndNbHits: function(){
            defered = $q.defer();
            defered.resolve(mockAlgoliaResponse);
            return {
                $promise: defered.promise
            }
        },
        searchByName: function(data){
            defered = $q.defer();
            defered.resolve(mockAlgoliaResponse);
            return {
                $promise: defered.promise
            }
        }
    };


    beforeEach(module('appStore', function ($provide) {
        $provide.value('appResource', mockService);
        $provide.value('clientConfig', clientConfigMock);
    }));

    beforeEach(inject(function ($rootScope, $controller, _$filter_, _$q_, _$sce_, _$window_, _appResource_) {
        $filter = _$filter_;
        $q = _$q_;
        $sce = _$sce_;
        $window = _$window_;
        scope = $rootScope.$new();
        appResource = _appResource_;

        createController = function() {
            return $controller('controller', {
                '$scope': scope,
                '$filter': $filter,
                '$q': $q,
                '$sce': $sce,
                '$window': $window
            });
        };
    }));

    it('controller should not be undefined', function() {
        var controller = createController();
        expect(controller).not.toBe(undefined);
    });

    it('should reverse sort if changeRankSort()', function() {
        var controller = createController();
        
        scope.changeRankSort();
        scope.$digest();

        expect(scope.filters.ascendantSort).toBe(false);
    });

    it('should decrease page when next()', function(){
        var controller = createController();

        scope.next();
        scope.$digest();

        expect(scope.filters.page).toBe(1);
    });  

    it('should decrease page when previous()', function(){
        var controller = createController();
        scope.next();
        scope.previous()
        scope.$digest();

        expect(scope.filters.page).toBe(0);
    });

    it('should reset page when selecting filter', function(){
        var controller = createController();
        scope.selectFilter({selected : false});
        scope.$digest();

        expect(scope.filters.page).toBe(0);
    });

    it('should reset searchbox when selecting filter', function(){
        var controller = createController();
        scope.selectFilter({selected : false});
        scope.$digest();

        expect(scope.searchbox).toBe("");
    });

    it('checks url path for missing images', function() {
        var controller = createController();
        expect(scope.fake).toBe("../public/img/fake.png");
    });
});