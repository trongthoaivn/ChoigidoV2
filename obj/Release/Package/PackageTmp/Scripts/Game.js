$(document).ready(function () {
    var hub = $.connection.serverHub;
    console.log(hub)
    $.connection.hub.start().done(function () {
        hub.server.joinRoom($("#RoomId").val(), $("#BlackId").val());
    });
    console.log(hub.client.player)
   //  = function (message) {
     //   console.log(message)
       // $("#WhiteId").text(message);
    //}
});
function chat (name, msg) {
    generate_message(msg, "")
}