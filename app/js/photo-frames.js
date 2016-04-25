// PhotoFramesModule encapsulates the logic for changing pictures in the available 7 slots.
// The photo list is retrieved from the server and the first 7 photos are placed in the available slots.
// Then photos are replaced randomly with the remaining items at each 1.5 seconds passed.
PhotosFramesModule = (function(){
    var frames = $('#photo-frames div');
    var backgroundImage = 'background-image';
    var maxFrames = frames.length;
    var framesIndex;
    var cancelerList =[];
    var updateInterval = 1000;
    var slideshowInProgress = false;

    var updateDOMPicture = function(url, index){
        $(frames[index]).css(backgroundImage, 'url('+ url + ')');
    };

    // Function is called when there are no available slots in the frames and each photo will replace a random photo.
    // At each 1.5 secconds passed a random photo will be replaced.
    var delayPhotoReplace = function(url, delay){
        var randomFrameIndex =  parseInt(Math.random()*maxFrames);
        var canceler = setTimeout(function(){
            updateDOMPicture(url, randomFrameIndex);
        },delay);
        cancelerList.push(canceler);
    };

    // Pushes photos in the available 7 slots then when no slots are available calls 'delayPhotoReplace'
    // to randomly replace an existing photo.
    var pushPhoto = function(url){
        if(framesIndex < maxFrames){
            updateDOMPicture(url, framesIndex);
        }else{
            //Calculates a delay for the picture, the picture will appear in the order of the received list.
            var delay = (framesIndex - maxFrames + 1) * updateInterval;
            delayPhotoReplace(url,delay);
        }
        framesIndex++;
    };

    // Retrieves photo list from the server and starts slideshow.
    var startSlideShow = function(){
        slideshowInProgress = true;
        framesIndex = 0;
        $.get( Routes.getPhotosUrl , function(photos){
            // List of photos from National Geographic.
            photos.urls.forEach(function(url){
                pushPhoto(url);
            })
        });
    };

    // Cleans slots and cancels the 'setTimeout' photos which are pending to replace a random photo.
    var stopSlideShow = function(){
        slideshowInProgress = false;
        frames.css(backgroundImage,'');
        cancelerList.forEach(function(canceler){
            clearTimeout(canceler);
        });
    };

    // Toggles between calling start/stop slideshow functions.
    var toggleSlideShow = function(){
        slideshowInProgress ? stopSlideShow() : startSlideShow();
    };

    return {
        startSlideShow : startSlideShow,
        stopSlideShow: stopSlideShow,
        toggleSlideShow: toggleSlideShow
    };
})();
