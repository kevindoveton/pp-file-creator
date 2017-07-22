/**
 * local storage is real annoying
 * use this to disable it
*/
const DISABLE_LOCAL_STORAGE = true;

const TEXT_SLIDE = function() { return { id: guid(), htmlContent: '', type: 'TEXT_SLIDE' } };
const BIBLE_SLIDE = function() { return { id: guid(), fullRef: '', ref: { book: '', chapter: '', verse: '' }, ver: 'NIV', children: [], type: 'BIBLE_SLIDE' } };
const IMAGE_SLIDE = function() { return { id: guid(), image: '', htmlContent: '', type: 'IMAGE_SLIDE' } };

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

if (DISABLE_LOCAL_STORAGE) {
  console.warn('DISABLE_LOCAL_STORAGE SET')
}

angular.module('ppfilecreator.controllers').controller('HomeCtrl', function($scope, $window, $state, ModalService, HttpService, FileSaver, Blob, localStorageService) {
  
  $scope.sermon = {
    title: '',
    date: new Date(),
    slides: [IMAGE_SLIDE()],
    template: undefined,
    firstRun: true
  }
  
  $scope.toolbar = {
    'toolbar': {
      'buttons': [
        'bold', 
        'italic', 
        'underline',
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

  HttpService.GetTemplates().then(function(d) {
    if (d.data) {
      $scope.preview = d.data[0].preview;
      $scope.templates = d.data;
      
      if ($scope.sermon.firstRun) {
        $scope.sermon.template = $scope.templates[0]
      }
    }
  });
  
  /**
   * load slides from local storage on page load
   * @requires localStorageService 
   * https://github.com/grevory/angular-local-storage
  */
  if (localStorageService.get('slides') != null) {
    if (!DISABLE_LOCAL_STORAGE) {
      return loadSlides();
    }
  }


  $scope.submit = function() {
    $scope.sermon.slides = $scope.sermon.slides;
    HttpService.CreateNewDocument($scope.sermon).then(function(d) {
      if (typeof(d.status) !== 'undefined' && d.status == 201) {
        HttpService.GetDocuments(true);
        $state.go('files');
      } else {
        console.error(d);
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
    let parent = $scope.sermon.slides[index];

    for (var i = 0; i < parent.children.length; i++) {
      for (var j = 0; j < $scope.sermon.slides.length; j++) {
        if ($scope.sermon.slides[j].id == parent.children[i]) {
          removeFromArray($scope.sermon.slides, j);
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
          $scope.sermon.slides = insertToArray($scope.sermon.slides, pos+1, TEXT_SLIDE());
          parent.children.push($scope.sermon.slides[pos+1].id);
          pos++;
        }
        
        var slide = $scope.sermon.slides[pos];
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
    if (typeof($scope.sermon.slides[position].children) !== 'undefined') {
      let parent = $scope.sermon.slides[position];
      for (var i = 0; i < parent.children.length; i++) {
        for (var j = 0; j < $scope.sermon.slides.length; j++) {
          if ($scope.sermon.slides[j].id == parent.children[i]) {
            $scope.sermon.slides = removeFromArray($scope.sermon.slides, j);
          }
        }
      }
    }
    // remove the slide
    $scope.sermon.slides = removeFromArray($scope.sermon.slides, position)
  }

  $scope.addSlide = function(position) {
    console.log($scope.sermon.slides[0]);
    ModalService.showModal({
      templateUrl: "/modals/newSlide.html",
      controller: "NewSlideModalCtrl"
    }).then(function(modal) {
      modal.close.then(function(result) {
        switch (result) {
          case 'TEXT':
            $scope.sermon.slides = insertToArray($scope.sermon.slides, position+1, TEXT_SLIDE());
            break;
          case 'IMAGE':
            $scope.sermon.slides = insertToArray($scope.sermon.slides, position+1, IMAGE_SLIDE());
            break;
          case 'BIBLE':
            $scope.sermon.slides = insertToArray($scope.sermon.slides, position+1, BIBLE_SLIDE());
            break;
        }
      });
    });
  };

  /**
   * save slides to local storage on page change
  */
  $scope.$on('$stateChangeStart', function( event ) {
    if (!DISABLE_LOCAL_STORAGE) {
      return saveSlides();
    }
  });

  /**
   * save slides to local storage on browser exit
  */
  $window.onbeforeunload = function(evt) {
    if (!DISABLE_LOCAL_STORAGE) {
      return saveSlides();
    }
  }

  /**
   * load slides from local storage
   * @requires localStorageService 
   * https://github.com/grevory/angular-local-storage
  */
  function loadSlides() {
    var sermon = localStorageService.get('slides');
    $scope.sermon = sermon;
    $scope.sermon.date = new Date(sermon.date);
    $scope.sermon.slides = $scope.sermon.slides;
    
    if (typeof($scope.sermon.date) == 'undefined') {
      $scope.sermon.date = new Date();
    }
    if (typeof($scope.sermon.title) == 'undefined') {
      $scope.sermon.title = '';
    }
    if (typeof($scope.sermon.slides) == 'undefined') {
      $scope.sermon.slides = [TEXT_SLIDE()];
    }
    if (typeof($scope.sermon.template) == 'undefined') {
      $scope.sermon.template = 'Default';
    }
  }

  /** 
   * save the slides to local storage
   * @requires localStorageService 
   * https://github.com/grevory/angular-local-storage
  */
  function saveSlides() {
    if (DISABLE_LOCAL_STORAGE) {
      return false;
    }
    $scope.sermon.firstRun = false;
    $scope.sermon.slides = $scope.sermon.slides;
    localStorageService.set('slides', $scope.sermon)
  }

  /**
   * bind the resize function to window.resize
   * @requires jQuery
  */
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


/**
 * insert a slide into an array
 * @param arr {Array} - the array
 * @param position {Number} - the position to be inserted to
 * @param item {Object} - the item to be inserted into the array
 * @returns {Array} - the new array
*/
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

/**
 * remove a slide from the array
 * @param arr {Array} - the array to be removed from
 * @param position {Number} - the item to remove
 * @returns {Array} the new array
*/
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
