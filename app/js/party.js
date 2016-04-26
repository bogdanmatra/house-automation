// Party module adds random colors to the photo frames starts the music and makes components dance.
PartyModule = (function(){
    // Manipulated DOM elements
    var frames = $('#photo-frames div');
    var thermometer = $('#thermometer');
    var light = $('#lamp-light');
    var curtain = $('#curtain');
    var controlPanel = $('.control-panel');
    var audioPlayer = $('#party-song').get(0);

    var flashInterval = 200;
    var backgroundColor = 'background-color';
    var partyInProgress = false;
    var rotateAnimation = 'rotate';
    var wiggleAnimation = 'wiggle';
    var canceler;

    // Method generates a random color and populates the frames then updates all coolors at 0.2 seconds.
    var startColorFlashes = function(){
        var getRandomColor = function(){
            // This line of code belongs to: https://css-tricks.com/examples/RandomHexColor/ .
            return '#' + Math.floor(Math.random()*16777215).toString(16);
        };
        var changeAllColors = function(){
            frames.each(function(index, div){
                $(div).css(backgroundColor, getRandomColor());
            });
        };
        changeAllColors();
        canceler = setInterval(function(){
            changeAllColors();
        }, flashInterval);
    };

    // Clears photo frames and the 'setInterval' which updates colors.
    var stopColorFlashes = function(){
        clearInterval(canceler);
        frames.css(backgroundColor, '');
    };

    var startParty = function(){
        // Play music and flashes
        partyInProgress = true;
        audioPlayer.play();
        startColorFlashes();

        //Add other elements animations
        thermometer.addClass(rotateAnimation);
        light.addClass(rotateAnimation);
        curtain.addClass(wiggleAnimation);
        controlPanel.addClass(wiggleAnimation);

        $.post(Routes.addSomeBeerInTheFridgeUrl, { 'sixPack': true });
    };

    var stopParty = function(){
        // Stops music and flashes
        partyInProgress = false;
        audioPlayer.currentTime = 0;
        audioPlayer.pause();
        stopColorFlashes();

        //Removes animations from other elements
        thermometer.removeClass(rotateAnimation);
        light.removeClass(rotateAnimation);
        curtain.removeClass(wiggleAnimation);
        controlPanel.removeClass(wiggleAnimation);
    };

    var toggleParty = function(){
        partyInProgress ? stopParty() : startParty();
    };

    return {
        startParty: startParty,
        stopParty: stopParty,
        toggleParty : toggleParty
    }

})();
