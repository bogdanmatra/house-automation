//Control panel setup afer document is ready
$(document).ready(function(){

    // Control panel select
    var controlPanel = $('.control-panel');

    // Lamp module and curtain module both use SimpleSwitherModule because the logic is identical
    // Initialize Lamp Module and attach handler
    var lightLamp = SimpleSwitherModule({
        id: '#lamp-light',
        statusUrl: 'mock-server/light-status.json',
        updateUrl: 'mock-server/light-update',
        class: 'light-open'
    });
    lightLamp.init();
    controlPanel.find('.fa-lightbulb-o').click(lightLamp.toggle);

    // Initialize Curtain Module and attach handler
    var curtain = SimpleSwitherModule({
        id: '#curtain',
        statusUrl: 'mock-server/curtain-status.json',
        updateUrl: 'mock-server/curtain-update',
        class: 'move-down'
    });
    curtain.init();
    controlPanel.find('.fa-moon-o').click(curtain.toggle);


    // Initialize Thermometer Module and attach handlers
    var thermometer = ThermometerModule();
    thermometer.init();
    controlPanel.find('.fa-chevron-circle-down').click(thermometer.decreaseTemperature);
    controlPanel.find('.fa-chevron-circle-up').click(thermometer.increaseTemperature);

    // Create Photo Frames Module and attach handler
    var photoFrames = PhotosFramesModule();
    controlPanel.find('.fa-photo').click(photoFrames.toggleSlideShow);

    // Water plant handler
    controlPanel.find('.fa-leaf').click(function(){
        var cloud = $('#cloud');
        cloud.addClass('move');
        var animationDuration = parseInt(cloud.css('animation-duration')) * 1000;
        // Remove animation class after animation has finished in order to animate again next time when adding the class
        setTimeout(function(){
            cloud.removeClass('move');
        },animationDuration);
        // Notify server to water plant
        $.post('mock-server/water-plant', { water : true });
    });

});
