//Control panel setup afer document is ready.
$(document).ready(function(){

    // Control panel selected and all module actions will be attached to control button click handlers
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

    // Water plant handler.
    controlPanel.find('.fa-leaf').click(function(){
        var cloud = $('#cloud');
        var moveClass = 'move';
        // Restart CSS3 animation by cloning element and then removing origial element
        // Multiple options discussed at: https://css-tricks.com/restart-css-animation/
        var clonedCloud = cloud.clone(true);
        cloud.before(clonedCloud);
        cloud.remove();
        clonedCloud.addClass(moveClass);
        // Notify server to water plant.
        $.post(Routes.waterPlantUrl , { water : true });
    });

    // PhotoFramesModule attach handler.
    controlPanel.find('.fa-photo').click(function(){
        // Making sure party stops before slideshow start.
        PartyModule.stopParty();
        PhotosFramesModule.toggleSlideShow();
    });

    // PartyModule attach handler.
    controlPanel.find('.fa-birthday-cake').click(function(){
        // Making sure slideshow stops before party start.
        PhotosFramesModule.stopSlideShow();
        PartyModule.toggleParty()
    });

    //Control buttons sound added
    controlPanel.find('.fa').click(function(){
        $('#control-sound').get(0).play();
    });

});
