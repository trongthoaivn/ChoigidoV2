

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

const List_pieces =[k, q, b, n, r, p, K, Q, B, N, R, P]
var color;

$(document).ready(function () {
    make_board();
});

function Create_lick(){
    var Fen = $("#Fen").val();
    Clear_board();
    draw_pieces(Fen);
    set_drag('w');
    
}

function Clear_board(){
    $('img').remove();
}

function draw_pieces(Fen) {
    var def = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"; //Fen mặc định
    if (Fen == undefined || Fen === "") {
        Fen = def;
    }
    var Arr = new Array();
    Arr = Fen.split(" ");
    var board = Arr[0];
    var turn_player = Arr[1];
    color = turn_player;
    var Round = Arr[4];
    var turn = Arr[5];
    var Row = board.split("/");
    var Fen_compile = []
    for (let i = 0; i < 8; i++) {
        Fen_compile.push(new Array());
        for (let j = 0; j < 8; j++) {
            var str = Row[i][j];
            var so = Number.parseInt(str);
            if(so != undefined){
                for(let n=0 ;n<so;n++){
                    Fen_compile[i].push("*");
                }
            }
            if( str != undefined && Number.isNaN(Number.parseInt(str)) ){
                Fen_compile[i].push(str);
            }           
        };
    }
    
    function draw(){
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++){
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

function get_Pieces(ui){
    var chess = ui.className.split(" ")
    var pieces;
    List_pieces.find(function(e){
        if(e.name==chess[0]) {
            pieces = e;
            return true;
        }
        return false;
    })
    return pieces;
}

function set_drag(id){
    $('.'+id+'').draggable({
        containment: "tbody",
        revert: 'invalid',
        start:function(ev, ui){
            let img = ui.helper.context;
            let p = new pieces();
           // console.log($(img).parent());
            let position = new Position($(img).parent().attr("id")[0],$(img).parent().attr("id")[1]);
            p = get_Pieces(img);
            let accept_position = get_moves(p,position)
            console.log(accept_position)
            accept_position.forEach(e =>{
                let x = e.x;
                let y = e.y;
                set_drop(x+""+y);    
                $('#'+x+""+y+'').css({"border": "3px solid yellow"});           
            });
        },
        stop:function(ev, ui){
            $("td").droppable({
                disabled: true
            });
            $("td").css({"border" :""});
        }
    });
}

function set_drop(id){
    $('#'+id+'').droppable({
        accept: 'img',
        disabled :false,
        drop: function(ev, ui) {
            var dropped = ui.draggable;
            var droppedOn = $(this);
            $(droppedOn).find('img').remove();
            $(dropped).detach().css({top: 0, left: 0}).appendTo(droppedOn);
            $("td").droppable({
                disabled: true
            });
            $("td").css({"border" :""});
        }
        
    });
}
