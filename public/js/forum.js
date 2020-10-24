$(document).ready(function(){
    $('#example').collapsible({xoffset:'-10',yoffset:'5',defaulthide: false});
    });
    $.fn.collapsible = function(options) {
        var defaults = {defaulthide: true, symbolhide: '-', symbolshow: '+', imagehide: null, imageshow: null, xoffset: '-15', yoffset: '0'};
        var opts = $.extend(defaults, options); var o = $.meta ? $.extend({}, opts, $$.data()) : opts; var obj = $(this);
        if(o.imageshow) o.symbolshow = '![]('+o.imageshow+')';
        if(o.imagehide) o.symbolhide = '![]('+o.imagehide+')';
        var startsymbol = o.symbolshow;
        $('li', obj).each(function(index) {
            if($('>ul, >ol',this).size() > 0){
                if(o.defaulthide) $('>ul, >ol',this).hide(); else startsymbol = o.symbolhide;
                $(this).prepend('['+startsymbol+']()').css('position','relative');
            }
        });
        $('.jcollapsible', obj).click(function(){
            var parent = $(this).parent();
            $('>ul, >ol',parent).toggle();
            $(this).html($(this).html() == o.symbolshow ? o.symbolhide : o.symbolshow);
            return false;
        });
    };