function initItems(itemsList) {
    var itemsJSON = itemsList;

    for(var i=0; i<itemsJSON.length; i++){

        var item = itemsJSON[i];
        item.next = (i+1)%itemsJSON.length;
        item.prev = (itemsJSON.length-1+i)%itemsJSON.length;

        var main = $("#main");
        var node = createGridNode(i,item);
        main.append(node);
    }

    createGallery(itemsList);
}

function createGridNode(id, item){
    var node =
        '<div class="g-i">' +
        '   <a class="grid-item-link" href="#itemsgallery" data-transition="fade" data-position="window" onclick="saveParam(\'id\','+id+');">' +
        '       <div class="hover-block"></div>' +
        '   </a>' +
        '   <img src="' + item.small_pic + '" alt="' + item.title + '">' +
            createInfoButton(id) +
            createGalleryShopShelf(id, item) +
        '</div>';
    return node;
}

function createGallery(itemsList) {
    var itemsJSON = itemsList;

    var body = $("body");

    var bodyNode =
        '<div data-role="page" id="itemsgallery">' +
        '<div data-role="header" class="menu"></div>'+
        '<div data-role="content">'+
            '<a class="arrow-left" href="#"></a>'+
            '<a class="arrow-right" href="#"></a>'+
            '<a class="link-close" href="#mua_page"></a>'+
            '<div class="swiper-container">' +
            '<div class="swiper-wrapper">';
            for(var i=0; i<itemsJSON.length; i++){
                var item = itemsJSON[i];
                item.next = (i+1)%itemsJSON.length;
                item.prev = (itemsJSON.length-1+i)%itemsJSON.length;
                var node = '';
                node += createGalleryNode(i,item);
                bodyNode += node;
            }

    bodyNode +=
            '</div>'  +
            '</div>'   +

            '<div class="pagination"></div>'+
            '</div>'+

        '</div>'+
        '</div>';

        body.append(bodyNode);
}


function createGalleryNode(id, item){
    var pos = "window";
    var trans = "fade";

    var node ="";

    node +=
        '<div class="swiper-slide">' +
            '<img src="' + item.mid_pic + '" alt="' + item.title + '" id="pic_' + id + '" next_page="'+ item.next +'" prev_page="'+ item.prev +'">' +
            '<a href="#" zoom="' + id + '" id="zoom_btn" title="Увеличить" class="link-zoom" data-icon="search" data-rel="dialog"' + '" data-position-to="' +pos+ '">&nbsp;</a>' +
            createInfoButton(id) +
            createGalleryShopShelf(id, item);

    node += '</div>';

    return node;
}

function createGalleryShopShelf(id, item){
    var node = "";
    node +=
        '<div class="shop-shelf transp-gray simpleCart_shelfItem">'+
            '<span class="item_number" style="display: none;">'+id+'</span>' +
            '<ul>' +
                '<li>'+
                    '<p class="shopshelf-left">' +
                        '<span class="shopshelf-title info-btn" info="'+id+'">' + item.title + '</span>' +
                        '<span class="shopshelf-price">' + simpleCart.toCurrency(item.price)  + '</span>' +
                    '</p>' +
                '</li>' +
                '<li>' +
                    '<p class="shopshelf-right">Выберите размер:<br>' +
                    createSizesSelector(id) +
                    '</p>'+
                '</li>' +
            '</ul>' +
        '</div>'; // shop-shelf

    return node;
}

function createInfoButton(itemId) {
    return applyTemplate('<a href="#" info="{id}" title="Подробнее" class="info-btn link-info" data-icon="search" data-rel="dialog" data-position-to="window">?</a>',{id : itemId});
}

function createSizesSelector(itemId) {
    var html =
        '<span id="shopshelf-size-S-{id}" class="shopshelf-size shopshelf-size-S-{id}" itemSize="Small" itemId="{id}">S</span>'+
        '<span id="shopshelf-size-M-{id}" class="shopshelf-size shopshelf-size-M-{id}" itemSize="Medium" itemId="{id}">M</span>'+
        '<span id="shopshelf-size-L-{id}" class="shopshelf-size shopshelf-size-L-{id}" itemSize="Large" itemId="{id}">L</span>';

    return applyTemplate(html, {id : itemId} );
}

function createItemInfoPopup(id, item){
    var node =
        '<div data-role="popup" id="info-popup" data-overlay-theme="b" class="item-info-popup" data-history="false">' +
            '<a href="#" data-rel="back" class="info-close">x</a>'+
            '<div class="info-header"><h1>' + item.title + '</h1></div>' +
            '<div class="info-content">' +
                '<p class="fabric"><strong>Состав: </strong>'+item.fabric +'</p>'+
                '<p class="descr">'+item.description +'</p>'+
                '<div class="sizes">' +
                    '<strong>Размеры:</strong>'+
                    '<ul>'+
                        '<li><strong>S, Small:</strong> 64см талия, 92см бедра</li>'+
                        '<li><strong>M, Medium:</strong> 68см талия, 96см бедра</li>'+
                        '<li><strong>L, Large:</strong> 72см талия, 100см бедра</li>'+
                    '</ul>'+
                '</div>'+
            '</div>' +
            '<div class="info-footer">' +
                '<p class="price">' + simpleCart.toCurrency(item.price) +'</p>'+
                '<hr>' +
                '<h1>MUA</h1>' +
            '</div>' +
        '</div>';
    return node;
}


function createZoomed(id, item){
    var node =
        '<div data-role="page" id="zoomedView" class="item-zoommed">' +
            '<img src="' + item.big_pic + '" alt="' + item.title + '">' +
            '<a href="#itemsgallery" class="link-close-zoommed" data-role="button" data-icon="back" data-theme="b" data-iconpos="left">Назад</a>' +
        '</div>';
    return node;

//    alert(JSON.stringify(weatherData.response.weather[0].icon));
//    var mapPage    =   $('<div>').attr({'id':'map','data-role':'page'}).appendTo('body');
//    var mapHeader  = $('<div>').attr({'data-role':'header', 'data-theme' : 'b','id':'map-header'}).appendTo(mapPage);
//    $('<h3>').html(weatherData.response.name + ' weather').appendTo(mapHeader);
//    $('<a>').attr({'href':'#index', 'class' : 'ui-btn-righ'}).html('Back').appendTo(mapHeader);
//    var mapContent = $('<div>').attr({'data-role':'content'}).appendTo(mapPage);
//    $('<div>').attr({'id':'map_canvas', 'style':'height:100%'}).appendTo(mapContent);
//    $.mobile.changePage( "#map", { transition: "slide"});
}


function inflateMenu() {
    var html = "";
    html +=
        '<div class="logo">'+
            '<ul>' +
                '<li><a href="#about">О нас</a></li>'+
                '<li><a href="#">Как заказать</a></li>'+
                '<li><h1><a href="#mua_page">MUA</a></h1></li>'+
                '<li><a href="#">Контакты</a></li>'+
                '<li><a href="#cart">Заявка : </a><strong><span class="simpleCart_quantity cart-quantity">0</span></strong></li>'+
            '</ul>' +
        '</div>';

    $(".menu").append(html)
}

function inflateFooter(){
    var html = "";
    html +='';

    $(".footer").append(html);
}

//function createCartContent(){
//    var html = "";
//    var itemTemplate =
//        '<ul class="cart-row odd" id="cartItem_SCI-2">' +
//            '<li class="item-title">{title}</li>' +
//            '<li class="item-remove">' +
//                '<a href="javascript:;" class="simpleCart_remove ui-link">x</a>' +
//            '</li>' +
//            '<li class="item-size">{size}</li>' +
//            '<li class="item-decrement">' +
//                '<a href="javascript:;" class="simpleCart_decrement ui-link">–</a>' +
//            '</li>' +
//            '<li class="item-quantity">{quo}</li>' +
//            '<li class="item-increment">' +
//                '<a href="javascript:;" class="simpleCart_increment ui-link">+</a>' +
//            '</li>' +
//            '<li class="item-total">{price}</li>' +
//        '</ul>';
//
//    if(simpleCart){
//        var items = simpleCart.items();
//        for(var i=0; i<items.length; i++){
//            var item = items[i];
//            html += applyTemplate(itemTemplate,{ title : item.get("title"), size : item.get("size"), price : simpleCart.toCurrency(item.get("price")), quo : item.quantity() });
//        }
//    }
//    return html;
//}
