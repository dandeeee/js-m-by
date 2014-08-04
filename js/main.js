
// PAGE CONTROLLERS

$(document).ready(function() {

    if(typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
    } else {
        // Sorry! No Web Storage support..
        alert("Извините, но вы пользуетесь неактуальной версией браузера сайт может неправильно работать.");
    }

});

$(document).delegate("#mua_page", "pagebeforecreate", function() {
    initItems(itemsDB);
    inflateMenu();
    inflateFooter();
});

$(document).delegate('#submit_data', 'pagebeforecreate', function () {
    $("#order_summary").html(gatherShopDataAsString());
    document.user_data['user_name'].value = localStorage.getItem("userName");
    document.user_data['user_phone'].value = localStorage.getItem("userPhone");
    document.user_data['user_mail'].value = localStorage.getItem("userMail");
    document.user_data['user_other'].value = localStorage.getItem("userOther");
});

$(document).delegate('#itemsgallery', 'pageshow', function(){
    var id = getParam("id",null);
    removeParam("id");
    initSwiper(id);
});

$(document).delegate('#itemsgallery', 'pagebeforeshow', function(){
    var id = getParam("id",null);
    slideSwiper(id);
});

//$(document).delegate("#cart",'pagebeforeshow', function() {
//    var html = createCartContent();
//    $(".cart-items").append(html);
//});

$(document).delegate('#info-popup', 'pagehide', function(){
    $(this).remove();
});

$(document).delegate('#zoomedView', 'pagehide', function(){
    $(this).remove();
});

// END PAGE CONTROLLERS






// HANDLERS

$(document).on('click', '#zoom_btn', function(){
    var id = $(this).attr("zoom");
    if(id >= 0) {
        $.mobile.loading('show', {theme:"a", text:"Один момент...", textonly: false, textVisible: true});
        var page = createZoomed(id, itemsDB[id]);
        $('body').append(page);
        $.mobile.changePage( "#zoomedView", { transition: "slide"});
        $.mobile.loading('hide');
    }

});

$(document).on('click', '.shopshelf-size', function(){
    addOrRemove($(this).attr("itemId"),$(this).attr("itemSize"));
});

$(document).on('click', '.info-btn', function() {
    var id = $(this).attr("info");
    if (id >= 0) {
        var page = createItemInfoPopup(id, itemsDB[id]);
        $('body').append(page);
        var pop = $("#info-popup");
        if (pop) {
            pop.bind({
                popupafterclose: function (event, ui) {
                    $(this).remove();
                }
            });
            pop.popup({ transition: 'slideup' });
            pop.popup('open');
        }
    }
});

// END HANDLERS



// UTILS

gallerySwiper = null;
function initSwiper(slide){
    if(gallerySwiper==null)
        gallerySwiper = new Swiper('.swiper-container',{
//            pagination: '.pagination',
            loop:true,
            grabCursor: true
//            paginationClickable: true
        });

    $(".swiper-slide").css("visibility","visible");

    if(getParam("windowResized", false)){
        gallerySwiper.resizeFix(true);
        removeParam("windowResized");
    }

    $('.swiper-slide img').on('click', function(e){
        e.preventDefault();
        gallerySwiper.swipeNext();
    });

    $('.arrow-left').on('click', function(e){
        e.preventDefault();
        gallerySwiper.swipePrev();
    });

    $('.arrow-right').on('click', function(e){
        e.preventDefault();
        gallerySwiper.swipeNext();
    });

    if(slide!=null)
        slideSwiper(slide);
}

function slideSwiper(slide){
    if(gallerySwiper!=null && slide!= null)
        gallerySwiper.swipeTo(slide, 0, null);
}

paramMap=[];
function saveParam(key, val){
    paramMap[key] = val;
}

function getParam(key, dflt){
    if(paramMap[key]){
        return paramMap[key];
    } else
        return dflt;
}

function removeParam(key){
//    if(paramMap[key])
//        paramMap[key] = null;
}

function applyTemplate(tpl,o) {
    for(var key in o) {
        if(o.hasOwnProperty(key))// prevent iteration on any prototype inherited methods
            tpl = tpl.replaceAll("{" + key + "}", o[key]);
    }
    return tpl;
}

String.prototype.replaceAll = function(str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}

$(window).resize(function() {
    saveParam("windowResized", true);
});

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

// END UTILS

