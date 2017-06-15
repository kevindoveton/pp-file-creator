const TEXT_SLIDE = function() { return { id: guid(), htmlContent: '', type: 'TEXT_SLIDE' } };
const BIBLE_SLIDE = function() { return { id: guid(), fullRef: '', ref: { book: '', chapter: '', verse: '' }, translation: '', htmlContent: '', type: 'BIBLE_SLIDE' } };
const IMAGE_SLIDE = function() { return { id: guid(), path: '', type: 'IMAGE_SLIDE' } };

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


angular.module('ppfilecreator.controllers').controller('HomeCtrl', function($scope, ModalService, HttpService, FileSaver, Blob) {
  
  $scope.toolbar = {
    'toolbar': {
      'buttons': [
        'bold', 
        'italic', 
        'underline',
        'h1',
        'superscript',
        'orderedlist',
        'unorderedlist',
      ]
    }
  }
  
  $scope.slides = [TEXT_SLIDE()];
  
  $scope.submit = function() {
    console.log($scope.slides);
    
    HttpService.CreateNewDocument({
      slides: $scope.slides
    }).then(function(d) {
      if (typeof(d.status) !== 'undefined' && d.status == 200) {
        var data = new Blob([d.data], { type: 'text/xml;charset=utf-8' });
        FileSaver.saveAs(data, 'file.pro5');
      } else {
        alert('failed');
      }
    });
    
  }
  
  // $scope.addSlide = function(position:number) {
  //   $scope.slides = insertToArray($scope.slides, position+1, {htmlContent:''})
  // }
  
  $scope.removeSlide = function(position:number) {
    $scope.slides = removeFromArray($scope.slides, position)
  }
  
  $scope.addSlide = function(position) {
    ModalService.showModal({
      templateUrl: "/modals/newSlide.html",
      controller: "NewSlideModalCtrl"
    }).then(function(modal) {
      modal.close.then(function(result) {
        switch (result) {
          case 'TEXT':
            $scope.slides = insertToArray($scope.slides, position+1, TEXT_SLIDE());
            break;
          case 'IMAGE':
            $scope.slides = insertToArray($scope.slides, position+1, IMAGE_SLIDE());
            break;
          case 'BIBLE':
            $scope.slides = insertToArray($scope.slides, position+1, BIBLE_SLIDE());
            break;
        }
      });
    });
  };
  
  
  
});

function insertToArray(arr:Array<object>, position:number, item:object) {
  if (typeof(position) !== 'undefined') {
    arr.splice(position, 0, item);
  } else {
    arr.push(item);
  }
  
  return arr;
}

function removeFromArray(arr:Array<object>, position:number) {
  arr.splice(position, 1);
  return arr;
}


angular.module('ppfilecreator.controllers').controller('NewSlideModalCtrl', function($scope, $state, close) {
  $scope.close = close;
  
  $scope.slide = function (type:string) {
    return close(type);
  }
});
