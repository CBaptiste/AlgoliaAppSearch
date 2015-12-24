/*jshint -W069 */
var AlgoliaService = require('../libs/algoliaService');

module.exports = {

	/**
    * get POST request and  call AlgoliaService to use algolia's API
    * @param request
    * @param httpResponse
    */
	create: function(request, httpResponse) {
		var data = request.body.data;
		AlgoliaService.create(data, function(objectID){
			httpResponse.status(201);
			httpResponse.send(objectID);
		}, function(){
			httpResponse.status(304);
		});
	},

	/**
    * get DELETE request and  call AlgoliaService to use algolia's API
    * @param request
    * @param httpResponse
    */
	delete: function(request, httpResponse){
		var id = request.params['id'];
		AlgoliaService.delete(id, function(data){
			httpResponse.status(200);
			httpResponse.send(data);
		}, function(err){
			httpResponse.status(204);
		});
	}
};

