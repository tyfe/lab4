
/**
 * Requests a new board state from the server's /data route.
 * 
 * @param cb {function} callback to call when the request comes back from the server.
 */
function getData(cb){
    $.get("/data", function(data, textStatus, xhr){
        console.log("Response for /data: "+textStatus);  

        // handle any errors here....

        // draw the board....
        cb(data);  

    }); 
}

/**
 * Draws the board to the #canvas element on the page. 
 *
 * You may find the following links helpful: 
 *  - https://api.jquery.com/
 *  - https://api.jquery.com/append/
 *  - http://www.tutorialspoint.com/jquery/
 *  - http://www.w3schools.com/jquery/ 
 *
 * @param state {object} - an object representing the state of the board.  
 */ 
function drawBoard(state){

    var canvas = $("#canvas"); 

    // Change the height and width of the board here...
    // everything else should adapt to an adjustable
    // height and width.
    var W = 2 * window.innerHeight / 3, H = W; 
    canvas.css("height", H); 
    canvas.css("width", W); 

    
    var windowWidth = window.innerWidth;

    // The actual SVG element to add to. 
    // we make a jQuery object out of this, so that 
    // we can manipulate it via calls to the jQuery API. 
    var svg = $(makeSVG(W, H));

    var board = makeRectangle(10,10,H-20,W-20,"chocolate");
    board.style.strokeWidth = 5;
    board.style.stroke = "black";
    svg.append(board);

    var innerBoard = makeRectangle(30, 30, H - 60, W - 60);
    innerBoard.style.fillOpacity = 0;
    innerBoard.style.strokeWidth = 5;
    innerBoard.style.stroke = "black";
    svg.append(innerBoard);

    for(var i = 1; i < 12; i++) {
        var vline = makeLine(30 + (i * (W - 60) / 12), 30, 30 + (i * (W - 60) / 12), W - 30, "black", 2);
        var hline = makeLine(30, 30 + (i * (W - 60) / 12), H - 30, 30 + (i * (W - 60) / 12), "black", 2);
        svg.append(vline);
        svg.append(hline);
    }
   
    
    console.log(state);




    // append the svg object to the canvas object.
    canvas.append(svg);

}

function init(){

    // do page load things here...

    console.log("Initalizing Page...."); 
    getData(drawBoard); 
}
