$(document).ready(function(){

    var controlPanel = $('.control-panel');

    var lightLamp = SimpleSwitherModule({
        id: '#lamp-light',
        statusUrl: 'mock-server/light-status.json',
        updateUrl: 'mock-server/light-update',
        class: 'light-open'
    });
    lightLamp.init();
    controlPanel.find('.fa-lightbulb-o').click(lightLamp.toggle);

    var curtain = SimpleSwitherModule({
        id: '#curtain',
        statusUrl: 'mock-server/curtain-status.json',
        updateUrl: 'mock-server/curtain-update',
        class: 'move-down'
    });
    curtain.init();
    controlPanel.find('.fa-moon-o').click(curtain.toggle);

    var thermometer = ThermometerModule();
    thermometer.init();
    controlPanel.find('.fa-chevron-circle-down').click(thermometer.decreaseTemperature);
    controlPanel.find('.fa-chevron-circle-up').click(thermometer.increaseTemperature);

    var photoFrames = PhotosFramesModule();
    controlPanel.find('.fa-photo').click(photoFrames.toggleSlideShow);

    controlPanel.find('.fa-leaf').click(function(){
        $('#cloud').toggleClass('move');
        $.post('mock-server/water-plant', { water : true });
    });

});
