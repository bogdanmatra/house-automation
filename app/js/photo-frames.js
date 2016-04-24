PhotosFramesModule = function(){
    var frames = $('#photo-frames div');
    var backgroundImage = 'background-image';
    var maxFrames = 7;
    var framesIndex;
    var cancelerList =[];

    var updateDOM = function(url, index){
        $(frames[index]).css(backgroundImage, 'url('+ url + ')');
    }

    var delayPhotoReplace = function(url, delay){
        var randomFrameIndex =  parseInt(Math.random()*maxFrames);
        var canceler = setTimeout(function(){
                            updateDOM(url, randomFrameIndex);
                       },delay);
        cancelerList.push(canceler);
    };

    var pushPhoto = function(url){
        if(framesIndex < maxFrames){
            updateDOM(url, framesIndex);
        }else{
            var delay = (framesIndex - maxFrames + 1) * 1500;
            delayPhotoReplace(url,delay);
        }
        framesIndex++;
    }

    var startSlideShow = function(){
        framesIndex = 0;
        $.get('mock-server/photos.json', function(photos){
            photos.urls.forEach(function(url){
                pushPhoto(url);
            })
        });
    };

    var stopSlideShow = function(){
        frames.css(backgroundImage,'');
        cancelerList.forEach(function(canceler){
            clearTimeout(canceler);
        });
    }

    var toggler = true;
    var toggleSlideShow = function(){
        toggler ? startSlideShow() : stopSlideShow();
        toggler = !toggler;
    }

    return {
        startSlideShow : startSlideShow,
        stopSlideShow: stopSlideShow,
        toggleSlideShow: toggleSlideShow
    }
};
