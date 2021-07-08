function check_position(category , position){
    //  gán vị trí
        var x = position.x;
        var y = position.y;
    //tìm hình ảnh trong ô
        var img = $('#'+x+y+'').find('img').attr("class");
        if(img != undefined){ //
           var cate_img = img.split(" ")[0];
            if(check_category(cate_img) == category)
                return 0;// có hình ảnh và cùng loại
            else return 1;// có hình ảnh và khác loại
        } else{
            if($('#'+x+y+'').attr("id") == undefined){
                return 2; //ô nằm ngoài bàn
            }else return 3; //ô nằm trong bàn
        };
}

function check_category(category){
    if(category !=undefined){
        if (category == category.toUpperCase()) {
            return true;
            //black
        }
        if (category == category.toLowerCase()){
            return false;
            //white
        }   
    }    
    return undefined;
}


function get_moves(img, position){

    var accept_position = new Array();
    var x = Number.parseInt(position.x);
    var y = Number.parseInt(position.y);
    if(img.name == "k"){
        console.log("bk:"+position.x+position.y)
        var default_position = new Array();
        //default accept_position
        default_position.push(
            new Position(x+1,y+1), 
            new Position(x-1,y-1),
            new Position(x-1,y+1), 
            new Position(x+1,y-1),
            new Position(x,y-1),
            new Position(x,y+1),
            new Position(x+1,y),
            new Position(x-1,y),
            );
        // check accept_position
        default_position.forEach( e =>{
            if(check_position(false,e) == 1 ||check_position(false,e) == 3 ) 
                accept_position.push(e);
        });
            
        return accept_position;
    }
    if(img.name == "q"){
        console.log("bq:"+position.x+position.y)
        get_moves(r,position).forEach(e => { 
            accept_position.push(e);
        });
        get_moves(b,position).forEach(e => {
            accept_position.push(e);
        });
        return accept_position;

    }
    if(img.name == "b"){
        console.log("bb:"+position.x+position.y)
        //default accept_position
        var ylp= y;
        var yrp= y;

        //x ->1
        for(let xp = x-1; xp >=1 ; xp-- ){
            ylp--;
            if(check_position(false,new Position(xp ,ylp)) == 3 || check_position(false,new Position(xp ,ylp)) == 1){
                accept_position.push(new Position(xp ,ylp));
                
            }
            if(check_position(false,new Position(xp ,ylp)) == 1||check_position(false,new Position(xp ,ylp)) == 0){
                    ylp=100;
                }
            yrp++;
            if(check_position(false,new Position(xp ,yrp)) == 3 || check_position(false,new Position(xp ,yrp)) == 1){
                accept_position.push(new Position(xp ,yrp));
                
            }if(check_position(false,new Position(xp ,yrp)) == 1||check_position(false,new Position(xp ,yrp)) == 0 ){
                    yrp=100;
                   // break;
                }
        }
        ylp= y;
        yrp= y;
        //x ->8
        for(let xp = x+1; xp <=8 ; xp++ ){
            ylp--;
            if(check_position(false,new Position(xp ,ylp)) == 3 || check_position(false,new Position(xp ,ylp)) == 1){
                accept_position.push(new Position(xp ,ylp));
                
            }
            if(check_position(false,new Position(xp ,ylp)) == 1||check_position(false,new Position(xp ,ylp)) == 0){
                    ylp=100;
            }
            yrp++;
            if(check_position(false,new Position(xp ,yrp)) == 3 || check_position(false,new Position(xp ,yrp)) == 1){
                accept_position.push(new Position(xp ,yrp));
                
            }
            if(check_position(false,new Position(xp ,yrp)) == 1||check_position(false,new Position(xp ,yrp)) == 0){
                    yrp=100;
                }
        }

        return accept_position;
    }
    if(img.name == "n"){
        console.log("bn:"+position.x+position.y)
        var default_position = new Array();
        //default accept_position
        default_position.push(
            new Position(x+2,y+1),
            new Position(x+2,y-1),
            new Position(x-2,y+1),
            new Position(x-2,y-1),
            new Position(x+1,y+2),
            new Position(x-1,y+2),
            new Position(x+1,y-2),
            new Position(x-1,y-2),
        );
          // check accept_position
          default_position.forEach( e =>{
            if(check_position(false,e) == 1 ||check_position(false,e) == 3 ) 
                accept_position.push(e);
        });
            
        return accept_position;

    }
    if(img.name == "r"){
        console.log("br:"+position.x+position.y)
        //default accept_position
        // 1->x
        for(let i = x-1 ; i>=1 ; i--){
            if(check_position(false,new Position(i ,y)) == 3 || check_position(false,new Position(i ,y)) == 1){
                accept_position.push(new Position(i ,y));
                console.log(check_position(false,new Position(i ,y)))
            }
            //đụng quân cờ thì dừng for
            if(check_position(false,new Position(i ,y)) == 0 || check_position(false,new Position(i ,y)) == 1)
                break;
            
        }
        //x->8
        for(let i = x+1 ; i<=8 ; i++){
            if(check_position(false,new Position(i ,y)) == 3 || check_position(false,new Position(i ,y)) == 1){
                
                accept_position.push(new Position(i ,y));
                
            }
            //đụng quân cờ thì dừng for
            if(check_position(false,new Position(i ,y)) == 0 || check_position(false,new Position(i ,y)) == 1)
                break;
        }
        //1->y
        for(let i = y-1 ; i>=1 ; i--){
            if(check_position(false,new Position(x ,i)) == 3 || check_position(false,new Position(x ,i)) == 1){
                
                accept_position.push(new Position(x ,i));
                
            }
            //đụng quân cờ thì dừng for
            if(check_position(false,new Position(x ,i)) == 0 || check_position(false,new Position(x ,i)) == 1)
                break;
        }
        //y->8
        for(let i = y+1 ; i<=8 ; i++){
            if(check_position(false,new Position(x ,i)) == 3 || check_position(false,new Position(x ,i)) == 1){
  
                accept_position.push(new Position(x ,i));
                
            }
            //đụng quân cờ thì dừng for
            if(check_position(false,new Position(x ,i)) == 0 || check_position(false,new Position(x ,i)) == 1)
                break;
        }
        return accept_position;
    }
    if(img.name == "p"){
        console.log("bp:"+position.x+position.y)
        var default_position = new Array();
        //default accept_position
        if(x == 2){
            if(!(check_position(false,new Position(x+1 ,y)) == 0 || check_position(false,new Position(x+1 ,y)) == 1))
            default_position.push(
            new Position(x+2,y),
            new Position(x+1,y)
            );
        } else
        default_position.push(new Position(x+1,y))
        // block thẳng
        default_position.forEach( e =>{
            if(check_position(false,e) == 3){
                accept_position.push(e);
            }
        });
        default_position = [];
        default_position.push(
            new Position(x+1,y+1),
            new Position(x+1,y-1)
        );
        // ăn xéo
        default_position.forEach( e =>{
            if(check_position(false,e) == 1){
                accept_position.push(e);
            }
        });
        return accept_position;

    }
    if(img.name == "K"){
        console.log("WK:"+position.x+position.y)
        var default_position = new Array();
        //default accept_position
        default_position.push(
            new Position(x+1,y+1), 
            new Position(x-1,y-1),
            new Position(x-1,y+1), 
            new Position(x+1,y-1),
            new Position(x,y-1),
            new Position(x,y+1),
            new Position(x+1,y),
            new Position(x-1,y),
            );
        // check accept_position
        default_position.forEach( e =>{
            if(check_position(true,e)) 
                accept_position.push(e);
        });
            
        return accept_position;
    }
    if(img.name == "Q"){
        console.log("WQ:"+position.x+position.y)
        get_moves(R,position).forEach(e => { 
            accept_position.push(e);
        });
        get_moves(B,position).forEach(e => {
            accept_position.push(e);
        });
        return accept_position;
    }
    if(img.name == "B"){
        console.log("WB:"+position.x+position.y)
        var ylp= y;
        var yrp= y;

        //x ->1
        for(let xp = x-1; xp >=1 ; xp-- ){
            ylp--;

            if(check_position(true,new Position(xp ,ylp)) == 3 || check_position(true,new Position(xp ,ylp)) == 1){
                accept_position.push(new Position(xp ,ylp));
                
            }
            if(check_position(true,new Position(xp ,ylp)) == 1||check_position(true,new Position(xp ,ylp)) == 0){
                    ylp=100;
                }
            yrp++;
          
            if(check_position(true,new Position(xp ,yrp)) == 3 || check_position(true,new Position(xp ,yrp)) == 1){
                accept_position.push(new Position(xp ,yrp));
                
            }if(check_position(true,new Position(xp ,yrp)) == 1||check_position(true,new Position(xp ,yrp)) == 0 ){
                    yrp=100;
                   // break;
                }
        }
        ylp= y;
        yrp= y;
        //x ->8
        for(let xp = x+1; xp <=8 ; xp++ ){
            ylp--;
            if(check_position(true,new Position(xp ,ylp)) == 3 || check_position(true,new Position(xp ,ylp)) == 1){
                accept_position.push(new Position(xp ,ylp));
                
            }
            if(check_position(true,new Position(xp ,ylp)) == 1||check_position(true,new Position(xp ,ylp)) == 0){
                    ylp=100;
            }
            yrp++;
            if(check_position(true,new Position(xp ,yrp)) == 3 || check_position(true,new Position(xp ,yrp)) == 1){
                accept_position.push(new Position(xp ,yrp));
                
            }
            if(check_position(true,new Position(xp ,yrp)) == 1||check_position(true,new Position(xp ,yrp)) == 0){
                    yrp=100;
                }
        }

        return accept_position;
    }
    if(img.name == "N"){
        console.log("WN:"+position.x+position.y)
        var default_position = new Array();
        //default accept_position
        default_position.push(
            new Position(x+2,y+1),
            new Position(x+2,y-1),
            new Position(x-2,y+1),
            new Position(x-2,y-1),
            new Position(x+1,y+2),
            new Position(x-1,y+2),
            new Position(x+1,y-2),
            new Position(x-1,y-2),
        );
          // check accept_position
          default_position.forEach( e =>{
            if(check_position(true,e) == 1 ||check_position(true,e) == 3 ) 
                accept_position.push(e);
        });
            
        return accept_position;
    }
    if(img.name == "R"){
        console.log("WR:"+position.x+position.y)
        //default accept_position
        // 1->x
        for(let i = x-1 ; i>=1 ; i--){
            if(check_position(true,new Position(i ,y)) == 3 || check_position(true,new Position(i ,y)) == 1){

                accept_position.push(new Position(i ,y));
                console.log(check_position(false,new Position(i ,y)))
                
            }
            //đụng quân cờ thì dừng for
            if(check_position(true,new Position(i ,y)) == 0 || check_position(true,new Position(i ,y)) == 1)
                break;
            
        }
        //x->8
        for(let i = x+1 ; i<=8 ; i++){
            if(check_position(true,new Position(i ,y)) == 3 || check_position(true,new Position(i ,y)) == 1){
               
                accept_position.push(new Position(i ,y));
                
            }
            //đụng quân cờ thì dừng for
            if(check_position(true,new Position(i ,y)) == 0 || check_position(true,new Position(i ,y)) == 1)
                break;
        }
        //1->y
        for(let i = y-1 ; i>=1 ; i--){
            if(check_position(true,new Position(x ,i)) == 3 || check_position(true,new Position(x ,i)) == 1){
       
                accept_position.push(new Position(x ,i));
                
            }
            //đụng quân cờ thì dừng for
            if(check_position(true,new Position(x ,i)) == 0 || check_position(true,new Position(x ,i)) == 1)
                break;
        }
        //y->8
        for(let i = y+1 ; i<=8 ; i++){
            if(check_position(true,new Position(x ,i)) == 3 || check_position(true,new Position(x ,i)) == 1){

                accept_position.push(new Position(x ,i));
                
            }
            //đụng quân cờ thì dừng for
            if(check_position(true,new Position(x ,i)) == 0 || check_position(true,new Position(x ,i)) == 1)
                break;
        }
        return accept_position;
    }
    if(img.name == "P"){
        console.log("WP:"+position.x+position.y)
        var default_position = new Array();
        //default accept_position
        if(x == 7){
            if(!(check_position(true,new Position(x-1 ,y)) == 0 || check_position(true,new Position(x-1 ,y)) == 1))
            default_position.push(
            new Position(x-2,y),
            new Position(x-1,y)
            );
        } else
        default_position.push(new Position(x-1,y))
        // block thẳng
        default_position.forEach( e =>{
            if(check_position(true,e) == 3){
                accept_position.push(e);
            }
        });
        default_position = [];
        default_position.push(
            new Position(x-1,y+1),
            new Position(x-1,y-1)
        );
        // ăn xéo
        default_position.forEach( e =>{
            if(check_position(true,e) == 1){
                accept_position.push(e);
            }
        });
        return accept_position;

    }
}
    
