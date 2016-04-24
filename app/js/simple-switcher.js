SimpleSwitherModule = function(config){
    var element = $(config.id);
    return {
        init: function(){
            $.get( config.statusUrl , function(status) {
                if(status.open){
                    element.addClass(config.class);
                }
            });
        },
        toggle: function(){
            element.toggleClass(config.class);
            $.post(config.updateUrl, { status: element.hasClass(config.class)});
        }
    }
};
