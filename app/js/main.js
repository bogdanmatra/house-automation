//Control panel setup afer document is ready.
$(document).ready(function(){

    // Control panel select
    var controlPanel = $('.control-panel');

    // Lamp module and Curtain Module both use SimpleSwitherModule because the logic is identical.
    // Initialize Lamp Module and attach handler.
    var lightLamp = SimpleSwitherModule({
        id: '#lamp-light',
        statusUrl: Routes.getLightStatusUrl,
        updateUrl: Routes.setLightStatusUrl,
        class: 'light-open'
    });
    lightLamp.init();
    controlPanel.find('.fa-lightbulb-o').click(lightLamp.toggle);

    // Initialize Curtain Module and attach handler.
    var curtain = SimpleSwitherModule({
        id: '#curtain',
        statusUrl: Routes.getCurtainStatusUrl,
        updateUrl: Routes.setCurtainStatusUrl,
        class: 'move-down'
    });
    curtain.init();
    controlPanel.find('.fa-moon-o').click(curtain.toggle);

    // Initialize Thermometer Module and attach handlers.
    ThermometerModule.init();
    controlPanel.find('.fa-chevron-circle-down').click(ThermometerModule.decreaseTemperature);
    controlPanel.find('.fa-chevron-circle-up').click(ThermometerModule.increaseTemperature);

    // Create Photo Frames Module and attach handler.
    controlPanel.find('.fa-photo').click(PhotosFramesModule.toggleSlideShow);

    // Water plant handler.
    controlPanel.find('.fa-leaf').click(function(){
        var cloud = $('#cloud');
        cloud.addClass('move');
        var animationDurationMs = parseInt(cloud.css('animation-duration')) * 1000;
        // Remove animation class after animation has finished in order to animate again next time when adding the class
        setTimeout(function(){
            cloud.removeClass('move');
        },animationDurationMs);
        // Notify server to water plant.
        $.post(Routes.waterPlantUrl , { water : true });
    });

});
