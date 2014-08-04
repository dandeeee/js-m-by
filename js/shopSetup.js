simpleCart({
    // array representing the format and columns of the cart,
    // see the cart columns documentation
    cartColumns: [
        { attr: "title", label: "Название"},
        { attr: "size", label: "Размер"},
        { attr: "total", view: "currency", label: "Сумма" },
        { view: "remove", text: "x", label: false}

//        { attr: "price", view: "currency", label: "Цена"},
//        { view: "decrement", label: "&nbsp;", text: "–"},
//        { attr: "quantity", label: "Ед"},
//        { view: "increment", label: "&nbsp;", text: "+"}


    ],

    // "div" or "table" - builds the cart as a
    // table or collection of divs
    cartStyle: "div",

    // how simpleCart should checkout, see the
    // checkout reference for more info
    checkout: {
        type: "Email" ,
        email: "you@yours.com"
    },

    // set the currency, see the currency
    // reference for more info
    currency: "BYR",

    // collection of arbitrary data you may want to store
    // with the cart, such as customer info
    data: {},

    // set the cart langauge
    // (may be used for checkout)
    language: "english-us",

    // array of item fields that will not be
    // sent to checkout
    excludeFromCheckout: [0],

    // custom function to add shipping cost
    shippingCustom: null,

    // flat rate shipping option
    shippingFlatRate: 0,

    // added shipping based on this value
    // multiplied by the cart quantity
    shippingQuantityRate: 0,

    // added shipping based on this value
    // multiplied by the cart subtotal
    shippingTotalRate: 0,

    // tax rate applied to cart subtotal
    taxRate: 0,

    // true if tax should be applied to shipping
    taxShipping: false,

    // event callbacks
    beforeAdd			: beforeAddItem,
    afterAdd			: null,
    load				: null,
    beforeSave		: null,
    afterSave			: null,
    update			: null,
    ready			: highlightAllItems,
    checkoutSuccess	: null,
    checkoutFail		: null,
    beforeCheckout		: null,
    beforeRemove        : beforeRemoveItem
});

function beforeAddItem(item){
    if(item!=null){
        toggleItemInCart(item);
    }
}

function beforeRemoveItem(item){
    if(item!=null){
        if(item.quantity()>0) // iff last item to be removed
            toggleItemInCart(item);
    }
}

function toggleItemInCart(item){
    var chbx = $(".shopshelf-size-"+item.get("size")[0]+"-"+item.get("num"));
    $(chbx).toggleClass("highlited");
}

function addOrRemove(itemId, size){
    var item = {};
    item.num = itemId;
    item.size = size;
    item.title = itemsDB[itemId].title;
    item.price = itemsDB[itemId].price;

    var itemsInCart = simpleCart.find({"title" : item.title, "size" : item.size});
    if(itemsInCart.length == 0)
        simpleCart.add(item);
    else
        for(var i=0; i<itemsInCart.length; i++){
            itemsInCart[i].remove();
        }
}

function highlightAllItems(){
    if(simpleCart!=null){
        var items = simpleCart.items();
        for(var i=0; i<items.length; i++)
            toggleItemInCart(items[i]);
    }
}
