// Thermometer module gets the temperature from the server and displays it in the thermometer widget.
// The component can display temperatures on a scale 0-35.
ThermometerModule = (function(){

    var currentTemperature = 0;
    var minTemperature = 0;
    var maxTemperature = 35;
    var thermometer = $('#thermometer');

    // Updates UI components translating values in 0-35 interval to thermoemter pixels and also displays it in digits.
    var updateDOMTemperature = function(temperature){
        var totalHeight = parseInt(thermometer.css('height')) - parseInt(thermometer.find('.quicksilver').css('bottom'));
        var pixels = temperature * parseInt(totalHeight) / maxTemperature;
        thermometer.find('.quicksilver').css('height', pixels);
        thermometer.find('.temperature-digits span').text(temperature);
    };

    var sendUpdateToServer = function(newTemperature){
        $.post( Routes.setTemperatureUrl , { newTemperature: newTemperature});
    }

    var increaseTemperature = function(){
        if(currentTemperature < maxTemperature){
            currentTemperature++;
            updateDOMTemperature(currentTemperature);
            sendUpdateToServer(currentTemperature);
        }
    }

    var decreaseTemperature = function(){
        if(currentTemperature > minTemperature){
            currentTemperature--;
            updateDOMTemperature(currentTemperature);
            sendUpdateToServer(currentTemperature);
        }
    }

    var init = function(){
        // Gets inital value from server.
        $.get( Routes.getTemperatureUrl , function(data) {
            currentTemperature = data.temperature;
            updateDOMTemperature(data.temperature);
        });
    };

    return {
        init : init,
        increaseTemperature: increaseTemperature,
        decreaseTemperature: decreaseTemperature
    };
})();
