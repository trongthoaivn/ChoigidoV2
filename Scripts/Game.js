var hub = $.connection.serverHub;
var player_name;
var playeris;
var Fen;
var searchParams = new URLSearchParams(window.location.search);
var param = searchParams.get('Id');

//Kiểm tra rời phòng xóa phòng
window.onbeforeunload = function () {
    deleteBoard();
    hub.server.alertLeaveBoard(param, "Đối thủ đã rời phòng!!!");
};

$(document).ready(function () {
    $('#timewhite').timeTo(1);
    $('#timeblack').timeTo(1); 
    $('#timewhite').timeTo("stop");
    $('#timeblack').timeTo("stop");
    //popup lên thông báo nhập tên
    var person = prompt("Hãy nhập tên của bạn", "");
    if (person == "") {
        alert("Bạn hãy nhập tên nào")
        person = prompt("Hãy nhập tên của bạn", "");
    }

    player_name = person;

    //Cập nhật tên vào room
    UpdateRoom(param, person);

    //Kết nối socket
    console.log(hub)
    $.connection.hub.start().done(function () {
        hub.server.joinRoom(param, person);
        make_board();
        draw_pieces();
        $("#turn").text(turn);
        $("#kayle").text("Waiting for player 2 ");
        $("#Create_Board").attr("disabled", true);
        $("#play").attr("disabled", true);
    });

    //Thông báo có người kết nối
    hub.client.addChatMessage = function (name) {
        //cái này là khi có ng kết nối sẽ load lại bàn cờ th
        loadRoom(param);

        //lấy thông báo (vd: 123 joined)
        sendMessage(name, "");
        setTimeout(function () { 
            if (!($('#BlackId').text() == "")) {
                $("#play").attr("disabled", false);
                $("#Create_Board").attr("disabled", false);
                $("#kayle").text("Press Start Game !");
            }
        }, 3000);
    };

    //Lấy tn qua lại, cái này là nhắn tin
    hub.client.getMessage = function (message) {
        sendMessage(message, 'aaa');
    }
    // lấy thông tin nước đi từ đối thủ

    hub.client.make_move = function (ol, ne) {
        make_move(ol, ne);
        var audio = new Audio("/Content/Video/Move.mp3");
        audio.play();
    }
    // set luot di
    hub.client.get_turn = function (msg) {
        $("#turn").text(msg);
        turn = msg;
        $('#time' + msg).timeTo(1);
        msg = (msg == "white") ? "black" : "white";
        $('#time' + msg).timeTo("stop");
        
        
    }

    //move Log
    hub.client.getFen = function (ol, ne, fen) {
        Fen = fen;
        createLog(ol, ne, fen);
    }

    //kayle  noi
    hub.client.getKayleSpeech = function (msg) {
        if (msg == playeris) {
            $("#kayle").text("Your turn !");
        } else $("#kayle").text("Opponent's turn !");
    }

    hub.client.setUpdateBoard = function (fen) {
        Clear_board();
        draw_pieces(fen);
        if (turn == "white") {
            set_drag("w");
            $("#turn").text("white");
        }
        else {
            set_drag("b");
            $("#turn").text("black");
        } 
        if (turn == playeris) {
            $("#kayle").text("Your turn !");
        } else $("#kayle").text("Opponent's turn !");
    }

    hub.client.getAlertLeave = function (msg) {
        $.confirm({
            title: 'Notification',
            content: 'Enemy surrender!!! you won. ',
            buttons: {
                Accept: {
                    text: 'Accept',
                    btnClass: 'btn-green',
                    action: function () {
                        window.location.href = "/Game/Lobby";
                    }
                },
            }
        });
    }

    hub.client.getloadGame = function (fen) {
        console.log(fen)
        Clear_board();
        draw_pieces(fen);
    }

    // request undo
    hub.client.getReply = function (msg, fen) {
        if (fen == "") {
            $.alert({
                title: 'Reply for request undo',
                content: 'Rejected',
            });
        } else
            $.confirm({
            title: 'Notification',
            content: 'The opponent asked to be undo ' + msg,
            buttons: {
                Accept: {
                    text: 'Accept',
                    btnClass: 'btn-green',
                    action: function () {
                        hub.server.sendUpdateBoard(param, fen);
                    }
                },
                Ignore: {
                    text: 'Rejected',
                    btnClass: 'btn-red',
                    action: function () {
                        hub.server.sendRequest(param, msg, "");
                    }
                }
            }
        });
    }
    // Won & exit & delete room
    hub.client.setWin = function (name) {
        var audio = new Audio("/Content/Video/win.mp3");
        audio.play();
        $.confirm({
            title: 'Congratulations !',
            content: name + ' won  !',
            buttons: {
                Accept: {
                    text: 'Ok',
                    btnClass: 'btn-green',
                    action: function () {
                        $.ajax({
                            type: "GET",
                            /*dataType: "json",*/
                            url: "../api/DeleteRoom",
                            data: { 'Id': param},
                            success: function (data) {
                                window.location.href = "/Game/Lobby";
                            },
                            error: function (error) {
                                jsonValue = jQuery.parseJSON(error.responseText);
                                alert("error" + error.responseText);
                            }
                        });
                    }
                },
            }
        });
       
    }

    // play để bắt đầu
    $("#play").click(function () {
        if (player_name == $('#WhiteId').text()) {
            set_drag("w");
            playeris = "white";
            $('#time' + turn).timeTo(1);
            $("#kayle").text("Your turn fisrt !");
            // hub.server.set_turn(param,"w")

        } else
        if (player_name == $('#BlackId').text()){
            set_drag("b");
            playeris = "black";
            $("#kayle").text("Opponent's turn !");
        }
    });


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
        sendMessage(msg, "self")
        hub.server.sendMessage(param, person, msg);
    })

    //Bắt sự kiện save game
    $("#save").click(function () {
        $.alert({
            title: 'Notification',
            content: 'Copy the Fen below to save the game: ' + Fen,
            with:800
        });
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
            document.getElementById("Idr").innerHTML = data.RoomID;
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

// ui.js cũ


const k = new pieces("k", "b", "/Content/Image/black_king.svg", "");
const q = new pieces("q", "b", "/Content/Image/black_queen.svg", "");
const b = new pieces("b", "b", "/Content/Image/black_bishop.svg", "");
const n = new pieces("n", "b", "/Content/Image/black_knight.svg", "");
const r = new pieces("r", "b", "/Content/Image/black_rook.svg", "");
const p = new pieces("p", "b", "/Content/Image/black_pawn.svg", "");
const K = new pieces("K", "w", "/Content/Image/white_king.svg", "");
const Q = new pieces("Q", "w", "/Content/Image/white_queen.svg", "");
const B = new pieces("B", "w", "/Content/Image/white_bishop.svg", "");
const N = new pieces("N", "w", "/Content/Image/white_knight.svg", "");
const R = new pieces("R", "w", "/Content/Image/white_rook.svg", "");
const P = new pieces("P", "w", "/Content/Image/white_pawn.svg", "");

const List_pieces = [k, q, b, n, r, p, K, Q, B, N, R, P]
var turn ="white" ;
//tạo bàn cờ theo fen
function Create_lick() {
    var str = $("#Fen").val(); console.log(str)
    hub.server.setloadGame(param, str);
}
// thực hiện nuóc đi theo socket
function make_move(oldp, newp) {
    var img = $('#' + oldp + '').find('img');
    var imgne = $('#' + newp + '').find('img');
    imgne.remove();
    $('#' + newp + '').append(img)
}
//tạo chuõi fen ở hiện tại
function fen_generate() {
    var fen = "";
    for (let x = 1; x <= 8; x++) {
        for (let y = 1; y <= 8; y++) {
            var cn= $('#' + x + '' + y + '').find('img').attr("class")
            if (cn != null) {
                fen += cn.split(" ")[0];
            } else fen += "*"
        }
        fen += "/"
        var str = "********";
        for (let i = 8; i >= 1; i--) {
            while (fen.indexOf(str) != -1) {
                fen = fen.replace(str, i);
            }
            str = str.slice(0, -1)
        }
    }
    let color = (turn == "white") ? "w" : "b";
    fen = fen.slice(0, -1) + " " + color;
    return fen;
}
//clear board
function Clear_board() {
    $('.b').remove();
    $('.w').remove();
}
// tạo quân cờ
function draw_pieces(Fen) {
    var def = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"; //Fen mặc định
    if (Fen == undefined || Fen === "") {
        Fen = def;
    }
    var Arr = new Array();
    Arr = Fen.split(" ");
    var board = Arr[0];
    var turn_player = Arr[1];
    turn = (turn_player == "w") ? "white" : "black";
    console.log(turn)
    var Row = board.split("/");
    var Fen_compile = []
    for (let i = 0; i < 8; i++) {
        Fen_compile.push(new Array());
        for (let j = 0; j < 8; j++) {
            var str = Row[i][j];
            var so = Number.parseInt(str);
            if (so != undefined) {
                for (let n = 0; n < so; n++) {
                    Fen_compile[i].push("*");
                }
            }
            if (str != undefined && Number.isNaN(Number.parseInt(str))) {
                Fen_compile[i].push(str);
            }
        };
    }

    function draw() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                List_pieces.forEach(element => {
                    if (element.name == Fen_compile[i][j]) {
                        $('#' + Number.parseInt(i + 1) + '' + Number.parseInt(j + 1) + '').append('<img  width = "50" src = "' + element.image + '" class ="' + element.name + ' ' + element.color + '">');
                    }
                });
            }
        }
    }
    draw();
}
// tạo bàn cờ

function make_board() {
    var div = $("#board");
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    for (y = 1; y <= 8; ++y) {
        var tr = document.createElement("tr");

        for (x = 1; x <= 8; ++x) {
            var td = document.createElement("td");
            td.style.width = 70 + "px";
            td.style.height = 70 + "px";
            td.id = y + "" + x
            td.style.backgroundColor = ((y ^ x) & 1) ? "#bf8661" : "#f6d8b5";
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    table.append(tbody);
    $(div).append(table);
}

function get_Pieces(ui) {
    var chess = ui.className.split(" ")
    var pieces;
    List_pieces.find(function (e) {
        if (e.name == chess[0]) {
            pieces = e;
            return true;
        }
        return false;
    })
    return pieces;
}

function set_drag(id) {
    $('.' + id + '').draggable({
        containment: "tbody",
        revert: 'invalid',
        start: function (ev, ui) {
            let img = ui.helper.context;
            let p = new pieces();
            let position = new Position($(img).parent().attr("id")[0], $(img).parent().attr("id")[1]);
            p = get_Pieces(img);
            let accept_position = [];
            if ($("#turn").text() == playeris) accept_position = get_moves(p, position);
            console.log(accept_position)
            accept_position.forEach(e => {
                let x = e.x;
                let y = e.y;
                set_drop(x + "" + y);
                $('#' + x + "" + y + '').css({ "border": "3px solid yellow" });
            });
        },
        stop: function (ev, ui) {
            $("td").droppable({
                disabled: true
            });
            $("td").css({ "border": "" });
        }
    });
}

function set_drop(id) {
    $('#' + id + '').droppable({
        accept: 'img',
        disabled: false,
        drop: function (ev, ui) {
            var dropped = ui.draggable;
            var droppedOn = $(this);
            var ol = $(dropped).parent().attr("id");
            var ne = $(droppedOn).attr("id")
            var audio = new Audio("/Content/Video/Move.mp3");
            audio.play();
            hub.server.send_move(param, ol, ne)
            won($(droppedOn).find('img'));
            $(droppedOn).find('img').remove();
            $(dropped).detach().css({ top: 0, left: 0 }).appendTo(droppedOn);
            $("td").droppable({
                disabled: true
            });
            $("td").css({ "border": "" });
            $('#time' + turn).timeTo(1);
            $('#time' + turn).timeTo("stop");
            turn = (turn == "white") ? "black" : "white";
            $('#time' + turn).timeTo(1);
            $("#turn").text(turn);
            hub.server.set_turn(param, turn)
            hub.server.sendFen(param, ol, ne, fen_generate());
            hub.server.setKayleSpeech(param,turn)
        }
    });
}
var init = 1;
function createLog(ol, ne, fen) {
    $('#move-table').append(' <button type="button" style="text-align:center" id="' + fen + '" class="Log' + init + ' list-group-item ">' + init + ' : ' + ol + ' => ' + ne + ' </button>');
    $('.Log' + init).click(function () {
        hub.server.sendRequest(param, $(this).text(), $(this).attr("id"));
        $.alert({
            title: 'Notification',
            content: 'Sent request!',
        });
    });
    init++;
}

function won(element) {
    if (element.attr("class") != undefined) {
        if (element.attr("class").split(" ")[0] == "K" || element.attr("class").split(" ")[0] == "k") {
            hub.server.sendWinMsg(param, player_name)
        }
    }
}

function deleteBoard() {
    $.ajax({
        type: "GET",
        /*dataType: "json",*/
        url: "../api/DeleteRoom",
        data: { 'Id': param },
        success: function (data) {
            window.location.href = "/Game/Lobby";
        },
        error: function (error) {
            jsonValue = jQuery.parseJSON(error.responseText);
            alert("error" + error.responseText);
        }
    });
}
