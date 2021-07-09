$(document).ready(function () {
    var INDEX = 0;
    message_submit();
    //popup lên thông báo nhập tên
    var person = prompt("Hãy nhập tên của bạn", "");
    if (person == "") {
        alert("Bạn hãy nhập tên nào")
        person = prompt("Hãy nhập tên của bạn", "");
    }

    var searchParams = new URLSearchParams(window.location.search);
    var param = searchParams.get('Id');

    //Load thông tin phòng lên
    loadRoom(param);

    //Cập nhật tên vào room
    UpdateRoom(param, person);

    //Kết nối socket
    var hub = $.connection.serverHub;
    console.log(hub)
    $.connection.hub.start().done(function () {
        hub.server.joinRoom(param, person);
    });
    console.log(hub.client.player)

    //Mở hộp tn lên
    $(document).delegate(".chat-btn", "click", function () {
        var value = $(this).attr("chat-value");
        var name = $(this).html();
        $("#chat-input").attr("disabled", false);
        generate_message(name, 'self');
    })

    $("#chat-circle").click(function () {
        $("#chat-circle").toggle('scale');
        $(".chat-box").toggle('scale');
    })

    $(".chat-box-toggle").click(function () {
        $("#chat-circle").toggle('scale');
        $(".chat-box").toggle('scale');
    })
});
function chat (name, msg) {
    generate_message(msg, "")
}

function UpdateRoom(param, player) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "../api/UpdateRoom",
        data: {
            'Id': param,
            'Player': player
        },
        success: function (data) {
            document.getElementById("RoomId").innerHTML = data.RoomID;
            document.getElementById("BlackId").innerHTML = data.BlackId;
            document.getElementById("WhiteId").innerHTML = data.WhiteId;
        },
    });
}

function loadRoom(room) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "../api/GetRoomInf",
        data: { 'Id': room },
        success: function (data) {
            document.getElementById("RoomId").innerHTML = data.RoomID;
            document.getElementById("BlackId").innerHTML = data.BlackId;
            document.getElementById("WhiteId").innerHTML = data.WhiteId;
        },
        error: function (error) {
            jsonValue = jQuery.parseJSON(error.responseText);
            alert("error" + error.responseText);
        }
    });
}

function message_submit(){
    $("#chat-submit").click(function (e) {
        e.preventDefault();
        var msg = $("#chat-input").val();
        if (msg.trim() == '') {
            return false;
        }
        sendMessage(msg, 'self');
    })
}

function sendMessage(msg, type) {
    INDEX++;
    var str = "";
    str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + "\">";
    str += "          <span class=\"msg-avatar\">";
    str += "            <img src=\"https:\/\/image.crisp.im\/avatar\/operator\/196af8cc-f6ad-4ef7-afd1-c45d5231387c\/240\/?1483361727745\">";
    str += "          <\/span>";
    str += "          <div class=\"cm-msg-text\">";
    str += msg;
    str += "          <\/div>";
    str += "        <\/div>";
    $(".chat-logs").append(str);
    $("#cm-msg-" + INDEX).hide().fadeIn(300);
    if (type == 'self') {
        $("#chat-input").val('');
    }
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
}