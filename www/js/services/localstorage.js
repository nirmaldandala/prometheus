//Factory for using ngStorage as LocalStorage
//Refer: https://medium.com/@petehouston/awesome-local-storage-for-ionic-with-ngstorage-c11c0284d658#.khci7zowb

prometheus.factory ('StorageService', function ($localStorage) {
	$localStorage = $localStorage.$default({
  		things: []
	});
	var _getAll = function () {
	  return $localStorage.things;
	};
	var _add = function (thing) {
	  $localStorage.things.push(thing);
	}
	var _remove = function (thing) {
	  $localStorage.things.splice($localStorage.things.indexOf(thing), 1);
	}
	return {
	    getAll: _getAll,
	    add: _add,
	    remove: _remove
	};
})