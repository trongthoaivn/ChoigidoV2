$(document).ready(function (e) {
    var searchParams = new URLSearchParams(window.location.search);
    var param = searchParams.get('Id');
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "../api/GetRoomInf",
        data: { 'Id': param },
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


})