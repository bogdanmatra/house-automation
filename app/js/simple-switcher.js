// SimpleSwitherModule defines the behaviour of a simple boolean switcher.
// Data is pulled from the server initially then the click handler toggles between the 2 states
// and sends the update to the server
SimpleSwitherModule = function(config){
    var element = $(config.id);
    return {
        init: function(){
            // Get initial value from server
            $.get( config.statusUrl , function(status) {
                if(status.open){
                    element.addClass(config.class);
                }
            });
        },
        toggle: function(){
            // Toggle states and send update
            element.toggleClass(config.class);
            $.post(config.updateUrl, { status: element.hasClass(config.class)});
        }
    }
};
