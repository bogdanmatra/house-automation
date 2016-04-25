// SimpleSwitherModule defines the behaviour of a simple boolean switcher.
// Data is pulled from the server initially then the click handler toggles between the 2 states and sends the update to the server.
// Communication with the server is optional (Parameters: config.statusUrl, config.updateUrl).
SimpleSwitherModule = function(config){
    if (!(config && config.id &&  config.class)){
        throw new Error('Not a valid config object passed. Must have at least id and class properties.');
    }
    var switchedElement = $(config.id);

    var init = function(){
        // Get initial value from server.
        if(config.statusUrl){
            $.get( config.statusUrl , function(status) {
                if(status.open){
                    switchedElement.addClass(config.class);
                }
            });
        }
    };

    var toggle = function(){
        // Toggle states and send update.
        switchedElement.toggleClass(config.class);
        // Trigger update to server if necessary.
        if(config.updateUrl){
            $.post(config.updateUrl, { status: switchedElement.hasClass(config.class)});
        }
    }

    return {
        init: init,
        toggle: toggle
    }
};
