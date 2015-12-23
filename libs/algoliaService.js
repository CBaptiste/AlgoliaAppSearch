
var algoliasearch = require('algoliasearch');
var client = algoliasearch("0LM8552PMH", "0e5fd5df56677d5084edd6f2c85a3033");
var index = client.initIndex('AppStore_master');

module.exports = {

	create: function(data, success, error){
		index.saveObject(data, function(err, content) {
			if (err) error();
			success(content.objectID);
		});
	},

	delete : function(id, success, error){
		index.deleteObject(id, function(err) {
			if (err) error();
			success(null);
		});
	}
};