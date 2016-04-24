ThermometerModule = function(){

    var currentTemperature = 0;
    var maxTemperature = 50;

    var thermometer = $('#thermometer');

    var updateDOMTemperature = function(temperature){
        var totalHeight = parseInt(thermometer.css('height')) - parseInt(thermometer.find('.quicksilver').css('bottom'));
        var pixels = temperature * parseInt(totalHeight) / maxTemperature;
        thermometer.find('.temperature-digits span').text(temperature);
        thermometer.find('.quicksilver').css('height', pixels);
    };

    var sendUpdateToServer = function(newTemperature){
        $.post( "mock-server/temperature-update", { newTemperature: newTemperature});
    }

    var increaseTemperature = function(){
        if(currentTemperature < maxTemperature){
            currentTemperature++;
            updateDOMTemperature(currentTemperature);
            sendUpdateToServer(currentTemperature);
        }
    }

    var decreaseTemperature = function(){
        if(currentTemperature > 0){
            currentTemperature--;
            updateDOMTemperature(currentTemperature);
            sendUpdateToServer(currentTemperature);
        }
    }

    var init = function(){
        $.get( "mock-server/current-temperature.json", function(data) {
            currentTemperature = data.temperature;
            updateDOMTemperature(data.temperature);
        });
    };

    return {
        init : init,
        increaseTemperature: increaseTemperature,
        decreaseTemperature: decreaseTemperature
    };
}
