/*===========   API Service    ===========*/
angular.module('ppfilecreator').factory('HttpService', function (CacheFactory, $http, $q, localStorageService, $state) {
  
  const DEBUG = true;
  if (DEBUG) console.warn('HTTP DEBUG SET')
  const BASE_URL = '__API-URL__/api/v1/';
  
  if (!CacheFactory.get('dataCache')) {3
    CacheFactory.createCache('dataCache', {
      maxAge: 1 * 60 * 1000,
      deleteOnExpire: 'aggressive',
      recycleFreq: .5 * 60 * 1000, // half of max age
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
  
  
  function getUrl(url: string) {
    var deferred = $q.defer();
    $http({
        method: 'GET',
        url: url,
        headers: {
          'x-token': localStorageService.get('accessToken')
        }
    }).then(function (data) {
      deferred.resolve(data);
    }, function(error) {
      return error;
    });
    
    return deferred.promise;
  }
  
  function getUrlAndCache(url:string, force?:boolean) {
    var deferred = $q.defer(); // this has to be in here because its scoped
    if (!force && dataCache.get(url)) {
      deferred.resolve(dataCache.get(url));
    } else {
      $http({
          method: 'GET',
          url: url,
          headers: {
            'x-token': localStorageService.get('accessToken')
          }
      }).then(function (data) {
        if (DEBUG) console.log(data);
        dataCache.put(url, data);
        deferred.resolve(data);
      }, function(error) {
        if (error.status == 401 && $state.current.name != 'login') { 
          localStorageService.remove('accessToken');
          $state.go('login'); 
          return; 
        }
      });
    }
    return deferred.promise;
  }
  
  function deleteUrl(url) {
    var deferred = $q.defer();
    
    $http({
      method: 'DELETE',
      url: url, 
      headers: {
        // 'Content-Type': 'application/json',
        'x-token': localStorageService.get('accessToken')
      },				
    }).then(function(data) {
      deferred.resolve(data);
    }, function(error) {
      deferred.resolve(error);
      if (error.status == 401 && $state.current.name != 'login') {
        localStorageService.remove('accessToken');
        $state.go('login'); 
        return; 
      }
    });
    
    return deferred.promise;
  }

  function postJson(url:string, data:object, cb?) {
    var deferred = $q.defer();
    
    $http({
      method: 'POST',
      url: url, 
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'x-token': localStorageService.get('accessToken')
      },				
    }).then(function(data) {
      deferred.resolve(data);
      if (DEBUG) console.log(data);
      if (typeof(cb) !== 'undefined') { 
        CacheFactory.destroy();
        cb(data) 
      }
    }, function(error) {
      deferred.resolve(error);
      if (error.status == 401 && $state.current.name != 'login') {
        localStorageService.remove('accessToken');
        $state.go('login'); 
        return; 
      }
    });
    
    return deferred.promise;
  };
  
  return {
    CreateNewDocument: function(d) {
      return postJson(BASE_URL+'/files/', d);
    },
    
    GetDocuments: function(force?: boolean) {
      return getUrlAndCache(BASE_URL+'/files/', force);
    },
    
    GetTemplates: function(force?: boolean) {
      return getUrlAndCache(BASE_URL+'/templates/', force);
    },
    
    GetTemplate: function(d) {
      return getUrlAndCache(BASE_URL+'/templates/'+d);
    },
    
    RemoveTemplate: function(id) {
      return deleteUrl(BASE_URL+'/templates/'+id);
    },
    
    GetVerse: function(data: any, d) {
      let ver = 'v='+data['ver'];
      let ref = 'ref='+encodeURI(data['ref']);
      
      return getUrlAndCache(BASE_URL+'/bible?' + ver + '&' + ref);
    },


    login: function(data) {
      return postJson(BASE_URL+'/auth', data, function(d) {
        if (d.data.success == true) {
          // TODO: user storage.. find a better way of reauthorising
          // localStorageService.set('user', data);
          localStorageService.set('accessToken', d.data.token)
        }
      });
    },
    
    logout: function() {
      return deleteUrl(BASE_URL+'/auth');
    }
    
    // LoginFacebook: function() {
      // return getUrl(BASE_URL+'/auth/facebook');
    // }
    
  }; // end return
// end angular module
});
