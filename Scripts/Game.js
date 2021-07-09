$(document).ready(function () {
    //popup lên thông báo nhập tên
    var person = prompt("Hãy nhập tên của bạn", "");
    if (person == "") {
        alert("Bạn hãy nhập tên nào")
        person = prompt("Hãy nhập tên của bạn", "");
    }

    var searchParams = new URLSearchParams(window.location.search);
    var param = searchParams.get('Id');

    //Cập nhật tên vào room
    UpdateRoom(param, person);

    //Kết nối socket
    var hub = $.connection.serverHub;
    console.log(hub)
    $.connection.hub.start().done(function () {
        hub.server.joinRoom(param, person);
    });

    //Thông báo có người kết nối
    hub.client.addChatMessage = function (name) {
        //cái này là khi có ng kết nối sẽ load lại bàn cờ th
        loadRoom(param);
        //lấy thông báo (vd: 123 joined)
        sendMessage(name, 'self');
    };

    //Lấy tn qua lại, cái này là nhắn tin
    hub.client.getMessage = function (message) {
        sendMessage(message, 'aaa');
    }

    //Mở hộp tn lên
    $(document).delegate(".chat-btn", "click", function () {
        var value = $(this).attr("chat-value");
        var name = $(this).html();
        $("#chat-input").attr("disabled", false);
        sendMessage(name, 'self');
    })

    $("#chat-circle").click(function () {
        $("#chat-circle").toggle('scale');
        $(".chat-box").toggle('scale');
    })

    $(".chat-box-toggle").click(function () {
        $("#chat-circle").toggle('scale');
        $(".chat-box").toggle('scale');
    })

    //bắt sự kiện nhấn nút gửi tn và gửi đi
    $("#chat-submit").click(function (e) {
        e.preventDefault();
        var msg = $("#chat-input").val();
        if (msg.trim() == '') {
            return false;
        }
        hub.server.sendMessage(param, msg);
    })
});
function chat(name, msg) {
    sendMessage(msg, "self")
}

function UpdateRoom(room, player) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "../api/UpdateRoom",
        data: {
            'Id': room,
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

var INDEX = 0;
function sendMessage(msg, type) {
    INDEX++;
    var str = "";
    str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + "\">";
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