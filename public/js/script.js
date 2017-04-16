$(document).ready(function(){
    $('.menu-burger').click(function () {
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $('.mobile-menu').removeClass('active');
            ///$('body').css('overflow', 'visibility');
        }else{
            $(this).addClass('active');
            $('.mobile-menu').addClass('active');
            //$('body').css('overflow', 'hidden');
        }
    });
    $(document).click( function(event){
        if( $(event.target).closest(".menu-burger").length )
            return;
        $(".mobile-menu, .menu-burger").removeClass('active');
        event.stopPropagation();
    });
    $(document).scroll(function ()
    {
        var position = $(this).scrollTop();
        if (position > 50)
        {
            $('body').addClass('header-scroll');
        }
        else
        {
            $('body').removeClass('header-scroll');
        }
    });
});
