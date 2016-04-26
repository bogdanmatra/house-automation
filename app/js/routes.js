// Routes for communicating with the server.
// GET requests which get inital data are mocked with a JSON response ('mock-server' folder).
// POST requests which update data are blocked before reaching the server since the app is just for DEMO.
Routes = (function(){

    // Since this is a DEMO application there is NO mock for POST requests which are globally stopped.
    // The reason was not to generate 404 Errors in Browser Console.
    $.ajaxSetup({
        beforeSend: function(jqXHR, settings) {
            if(settings.type === 'POST'){
                jqXHR.abort();
            }
        }
    });

    return {
        getTemperatureUrl: 'mock-server/current-temperature.json',
        setTemperatureUrl: 'mock-server/temperature-update',
        getLightStatusUrl: 'mock-server/light-status.json',
        setLightStatusUrl: 'mock-server/light-update',
        getCurtainStatusUrl: 'mock-server/curtain-status.json',
        setCurtainStatusUrl: 'mock-server/curtain-update',
        getPhotosUrl: 'mock-server/photos.json',
        waterPlantUrl: 'mock-server/water-plant',
        addSomeBeerInTheFridgeUrl: 'mock-server/add-some-beer-in-the-fridge'
    };
})();
