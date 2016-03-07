prometheus.service('omdbget', function($http) {
	this.getMovieInfo = function(searchKey) {
		return $http.get('http://www.omdbapi.com/?s='+ searchKey);
	};

	this.getAllInfo = function(id) {
		return $http.get('http://www.omdbapi.com/?i='+ id +"&tomatoes=true");
	};
});