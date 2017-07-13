const TEXT_SLIDE = function() { return { id: guid(), htmlContent: '', type: 'TEXT_SLIDE' } };
const BIBLE_SLIDE = function() { return { id: guid(), fullRef: '', ref: { book: '', chapter: '', verse: '' }, translation: '', children: [], type: 'BIBLE_SLIDE' } };
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


angular.module('ppfilecreator.controllers').controller('HomeCtrl', function($scope, $window, $state, ModalService, HttpService, FileSaver, Blob, localStorageService) {
  
  
  $scope.sermon = {
    title: '',
    date: '',
    slides: []
  }
  
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
    },
    paste: {
      forcePlainText: false, //default true
      cleanPastedHTML: true,
      cleanReplacements: [],
      cleanAttrs: ['class', 'style', 'dir'],
      cleanTags: ['meta'],
      unwrapTags: []
    }
  }
  
  
  // get slides from storage, or create some new ones
  if (localStorageService.get('slides') != null) {
    $scope.sermon = localStorageService.get('slides');
    $scope.slides = $scope.sermon.slides;
  } else {
    $scope.slides = [TEXT_SLIDE()];
  }
  
  
  $scope.submit = function() {
    $scope.sermon.slides = $scope.slides;
    HttpService.CreateNewDocument($scope.sermon).then(function(d) {
      if (typeof(d.status) !== 'undefined' && d.status == 201) {
        // var data = new Blob([d.data], { type: 'text/xml;charset=utf-8' });
        // FileSaver.saveAs(data, 'file.pro5');
        $state.go('files');
      } else {
        alert('failed');
      }
    });
  }
  
  $scope.getVerse = function(slide, index) {
    var ref = slide.fullRef;
    var ver = slide.ver;
    let bibleData = {
      ref: ref,
      ver: ver
    };
    
    let pos = index;
    let parent = $scope.slides[index];

    for (var i = 0; i < parent.children.length; i++) {
      for (var j = 0; j < $scope.slides.length; j++) {
        if ($scope.slides[j].id == parent.children[i]) {
          removeFromArray($scope.slides, j);
        }
      }
    }
    
    if (parseInt(ref.match(/\d+/)[0]) == NaN) {
      return;
    }
    
    HttpService.GetVerse(bibleData).then((success) => {
      const d = success.data;
      let verse = '';
      for (var i = 0; i < d.length; i++) {
        if (verse != d[i].verse) {
          $scope.slides = insertToArray($scope.slides, pos+1, TEXT_SLIDE());
          parent.children.push($scope.slides[pos+1].id);
          pos++;
        }
        
        var slide = $scope.slides[pos];
        slide.htmlContent += '<p>';
        if (verse != d[i].verse) {
          slide.htmlContent += '<sup>'+d[i].verse+'</sup>';
        }
        slide.htmlContent += d[i].text+'</p>';
        verse = d[i].verse;
      }
    });
  }
  
  $scope.removeSlide = function(position:number) {
    // if the slide has children, remove them first
    if (typeof($scope.slides[position].children) !== 'undefined') {
      let parent = $scope.slides[position];
      for (var i = 0; i < parent.children.length; i++) {
        for (var j = 0; j < $scope.slides.length; j++) {
          if ($scope.slides[j].id == parent.children[i]) {
            $scope.slides = removeFromArray($scope.slides, j);
          }
        }
      }
    }
    // remove the slide
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
  
  // TODO: get this dynamically
  $scope.preview = {
    container: {
      background: '#000',
      width: '1920px',
      height: '1080px'
    },
    
    box: {
      top: '462.08px',
      left: '61.22px',
      width: '1797.547px',
      height: '803.8289px'
    },
    
    innerbox: {
      'font-family': 'Helvetica',
      'font-size': '96px',
      'text-align': 'center', // left, center, right
      'align-items': 'center', // flex-start, center, flex-end
      'justify-content': 'center' // flex-start, center, flex-end
    }
  }
  
  $scope.$on('$stateChangeStart', function( event ) {
    saveSlides();
  });
  
  $window.onbeforeunload = function(evt) {
    saveSlides();
  }
  
  function saveSlides() {
    $scope.sermon.slides = $scope.slides;
    localStorageService.set('slides', $scope.sermon)
  }
  
  $(function() {
    // page resize
    $(window).bind('resize', function() {
      let container = {
        width: $('.preview-container').width(),
        height: $('.preview-container').height()
      }
      
      let preview = {
        width: $('.preview').width(),
        height: $('.preview').height()
      }
      
      let scaleX = container.width / preview.width;
      let scaleY = container.height / preview.height;
      let scale = (scaleX > scaleY) ? scaleY : scaleX;
      
      $('.preview').css({zoom: scale});
    });
    
    $(window).trigger('resize');
  })
  
});

function insertToArray(arr:Array<object>, position:number, item:object) {
  if (typeof(position) !== 'undefined') {
    arr.splice(position, 0, item);
  } else {
    arr.push(item);
  }
  setTimeout(() => {
    $(window).trigger('resize');
  }, 50);
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
