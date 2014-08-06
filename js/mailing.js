function gatherShopDataAsString(){
    var data = "";
    if(simpleCart.items().length==0)
        return "";
    var i=0;
    simpleCart.each(function (item) {
        i++;
        var total = (item.quantity()>1) ? " (итого: " + simpleCart.toCurrency(item.total()) + ")" : "";

        data += i + ". " + item.get("title") + " (" + item.get("size")+ "): " + " " + item.quantity() + "шт " + simpleCart.toCurrency(item.price()) + total + "<br>";
    });
    data += "<hr>";
    data += "Общий итог: <strong>" + simpleCart.toCurrency(simpleCart.grandTotal()) + "</strong><br>";
    return data;
}

function gatherUserData() {
    var frm = document.user_data;
    var name, phone, mail, other;
    if(frm!=null){
        name = frm.elements['user_name'].value;
        phone = frm.elements['user_phone'].value;
        mail = frm.elements['user_mail'].value;
        other = frm.elements['user_other'].value;
    }

    localStorage.setItem("userName", name);
    localStorage.setItem("userPhone", phone);
    localStorage.setItem("userMail", mail);
    localStorage.setItem("userOther", other);

    return { "name" : name, "phone" : phone, "mail" : mail, "other" : other }
}

function userDataToString(data){
    var str = "";

    if(data.name!="") str += "Имя: " + data.name + "<br>";
    if(data.phone!="") str += "Тел: " + data.phone + "<br>";
    if(data.mail!="") str += "E-mail: " + data.mail + "<br>";
    if(data.other!="") str += "Other: " + data.other + "<br>";

    return str;
}


function processData() {

    var userData = gatherUserData();
    var shopData = gatherShopDataAsString();

    if(userData.name == "" || (userData.phone=="" && userData.mail=="" && userData.other=="") )
        throw new Error("MUA: No user data");
    else if(shopData!="") {
        sendOrderMail(userDataToString(userData) + "<hr>" + shopData, "muashop.by@gmail.com'");

        if(userData.mail!="")
            sendConfirmationMailToUser(userData, shopData, userData.mail);
    }
}

function sendOrderMail(content, mailTo) {
    sendMail(content, mailTo, sendOrderCallBack);
}

function sendConfirmationMailToUser(userData, content, mailTo) {
    var str = "Здравствуйте, " + userData.name + "!<br><br>" + "Вы только что сделали следующую заявку в магазине muashop.by <br><br>";
    str +=  content ;
    str += "<br>" + "Пожалуйста, дождитесь когда мы свяжемся с вами для её подтверждения.";
    str += "<br><br>" + "С уважением, <br>MUA<br>http://muashop.by<br>http://vk.com/muashop";
    sendMail(str, mailTo);
}

function sendMail(content, mailTo, callBack) {
    $.ajax({
        type: "POST",
        url: "https://mandrillapp.com/api/1.0/messages/send.json",
        data: {
            'key': 'q5m-17tGhHoYATouRzxK6A',
            'message': {
                'from_email': 'muashop.by@gmail.com',
                'to': [
                    {
                        'email': mailTo,  // muashop@gmail.com
                        'name': 'MUA',
                        'type': 'to'
                    }
                    // ,
                    // {
                    //     'email': 'daniel.dedkov@gmail.com',
                    //     'name': 'ANOTHER RECIPIENT NAME (OPTIONAL)',
                    //     'type': 'to'
                    // }
                ],
                'autotext': 'true',
                'subject': 'Заказ в магазине www.muashop.by',
                'html': content
            }
        }
    }).done(function (response) {
//        console.log(response.toString()); // if you're into that sorta thing
        if(callBack!=null)
            callBack();
    });
}

function sendOrderCallBack(){
    var str = "<h1>Спасибо!</h1><h3>";
    if(localStorage.getItem("userMail")!=""){
        str += 'Мы выслали копию письма с заявкой на ваш ящик <span style="color: #0e48f5;"><u> ' + localStorage.getItem("userMail") + '</u></span>. ';
    }
    str += "Пожалуйста подождите, пока менеджер с вами свяжется.</h3>";
    $("#order_summary").html(str);
    simpleCart.empty();
}