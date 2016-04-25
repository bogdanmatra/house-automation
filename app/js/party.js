PartyModule = (function(){


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

    var startColorFlashes = function(){
        var getRandomColor = function(){
            // Code belongs to: https://css-tricks.com/examples/RandomHexColor/
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

    var stopColorFlashes = function(){
        clearInterval(canceler);
        frames.css(backgroundColor, '');
    };

    var startParty = function(){
        partyInProgress = true;
        audioPlayer.play();
        startColorFlashes();

        thermometer.addClass(rotateAnimation);
        light.addClass(rotateAnimation);
        curtain.addClass(wiggleAnimation);
        controlPanel.addClass(wiggleAnimation);
    };

    var stopParty = function(){
        partyInProgress = false;
        audioPlayer.currentTime = 0;
        audioPlayer.pause();
        stopColorFlashes();

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
