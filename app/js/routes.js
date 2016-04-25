// Routes for communicating with the server.
// GET requests which get inital data are mocked with a JSON response ('mock-server' folder).
// POST requests which update data are blocked before reaching the server since the app is just for demo.
Routes = (function(){

    // No mock for POST requests which are globally stopped
    // in order not to show 404 errors in console.
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
        waterPlantUrl: 'mock-server/water-plant'
    };
})();
