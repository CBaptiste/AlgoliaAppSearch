/*jshint -W069 */
var AlgoliaService = require('../libs/algoliaService');

module.exports = {
	
	create: function(request, httpResponse) {
		var data = request.body.data;
		AlgoliaService.create(data, function(objectID){
			httpResponse.status(201);
			httpResponse.send(objectID);
		}, function(){
			httpResponse.status(304);
		});
	},

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

