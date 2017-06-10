/*===========   API Service    ===========*/
angular.module('ppfilecreator').factory('HttpService', function (CacheFactory, $http, $q, localStorageService, $state) {
  
  const BASE_URL = 'http://localhost:4000/api/v1/';
  
  if (!CacheFactory.get('dataCache')) {3
    CacheFactory.createCache('dataCache', {
      maxAge: .3 * 60 * 1000,
      deleteOnExpire: 'aggressive',
      recycleFreq: .15 * 60 * 1000, // half of max age
      // on expire refresh items
      onExpire: function (key, value) { 
        var _this = this; // "this" is the cache in which the item expired
        angular.injector(['ng']).get('$http')({
          method: 'GET',
          url: key,
          headers: {
            'x-token': localStorageService.get('accessToken')
          }
        }).then(function(success) {
          _this.put(key, success);
        });
      }
    });
  }
  
  function appendTransform(defaults, transform) {
    // We can't guarantee that the default transformation is an array
    defaults = angular.isArray(defaults) ? defaults : [defaults];

    // Append the new transformation to the defaults
    return defaults.concat(transform);
  }

  var dataCache = CacheFactory.get('dataCache');
  
  function getUrlAndCache(url:string, cb?) {		
    var deferred = $q.defer(); // this has to be in here because its scoped
    
    if (dataCache.get(url)) {
      deferred.resolve(dataCache.get(url));
    } else {
      $http({
          method: 'GET',
          url: BASE_URL+url,
          headers: {
            'x-token': localStorageService.get('accessToken')
          }
      }).then(function (data) {
        dataCache.put(url, data);
        deferred.resolve(data);
        if (typeof(cb) !== 'undefined') { cb(data) }
      }, function(error) {
        if (error.status == 401 && $state.current.name != 'login') { $state.go('login'); return; }
      });
    }
    return deferred.promise;
  }
  
  function postJson(url:string, data:object, cb?) {
    var deferred = $q.defer();
    
    $http({
      method: 'POST',
      url: BASE_URL+url, 
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'x-token': localStorageService.get('accessToken')
      },				
    }).then(function(data) {
      deferred.resolve(data);
      if (typeof(cb) !== 'undefined') { 
        CacheFactory.destroy();
        cb(data) 
      }
    }, function(error) {
      deferred.resolve(error);
      if (error.status == 401 && $state.current.name != 'login') { 
        $state.go('login'); 
        return; 
      }
    });
    
    return deferred.promise;
  };
  
  return {
    CreateNewDocument: function(data) {
      return postJson('/files/', data);
    },
    
    // ------------------------
    // login
    // TODO: implement this server side
    // ------------------------
    login: function(data) {
      return postJson('/api/auth/login', data, function(d) {
        if (d.data.loginStatus == true) {
          // TODO: user storage.. find a better way of reauthorising
          // localStorageService.set('user', data);
          localStorageService.set('accessToken', d.data.token)
        }
      });
    }
  };
});
