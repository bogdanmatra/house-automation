$(document).ready(function(){

    var controlPanel = $('.control-panel');

    controlPanel.find('.fa-lightbulb-o').click(function(){
        $('#lamp-light').toggleClass('light-open');
    });

    controlPanel.find('.fa-photo').click(function(){
        console.log('Photos logic');
    });

    controlPanel.find('.fa-leaf').click(function(){
        $('#cloud').toggleClass('move');
    });

    controlPanel.find('.fa-moon-o').click(function(){
        $('#curtain').toggleClass('move-down');
    });


    var thermometer = ThermometerModule();
    thermometer.init();
    controlPanel.find('.fa-chevron-circle-down').click(thermometer.decreaseTemperature);
    controlPanel.find('.fa-chevron-circle-up').click(thermometer.increaseTemperature);

});
