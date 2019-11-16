$(document).ready(() =>{
    //The parameters
    options = ["DefaultMainTitle", "DefaultYTitle", "DefaultXTitle", "bottom", "#1e90ff", "#0f487f", "#000000", "#000000", "20px", "10px", "200", "200"],

    data = [["apples", 5, 20],["oranges", 9, 18],["banana", 7],["avacado", 27, 30],["misc.", 10]],
    element = ".barGraph";
    
    console.log(options)

    //The Functions
    function drawXYBox(height, width, element) {
        $(element).prepend("<div class=xyData></div>");
        //$(".xyData").css("border-left", "1px solid black");
        $(".xyData").css("height", "auto");
        $(".xyData").css("width", "auto");
        $(".xyData").css("float", "left");
        $(".xyData").css("display", "inline-block");
    }

    function drawYLabel(element, options) {
        $(element).prepend("<div class=yLabel></div>");
        $(".yLabel").css("display", "inline-block");
        $(".yLabel").css("float", "left");
        $(".yLabel").css("margin-top", "-9.5px");
        $(element).prepend('<div class=yTitle contenteditable=true>' + options[1] + '</div>');
        $(".yTitle").css("display", "inline-block");
        $(".yTitle").css("float", "left");
        $(".yTitle").css("writing-mode", "tb-rl");
        $(".yTitle").css("text-align", "center");
        $(".yTitle").css("margin-right", "10px");
        $(".yTitle").css("height", options[10]);
  
    }

    function drawXLabel(options, element){
        $(".xyData").append("<div class=xTitle contenteditable=true>" + options[2] + "</div>");
        $(".xTitle").css("text-align", "center");
        $(".xTitle").css("width", options[11]);
        $(".xTitle").css("margin-top", "10px");
    }

    function drawMainTitle(data, options, element) {
        $(element).prepend("<div class=title contenteditable=true>" + options[0] + "</div>");
        $(".title").css("width", "100%");
        $(".title").css("text-align", "center");
        $(".title").css("font-size", options[8]);
        $(".title").css("color", options[4]);
        $(".title").css("margin-bottom", "15px");
        
    }
    
    drawXYBox(200, 200, element);
    drawYLabel(element, options);
    drawXLabel(options, element)
    drawMainTitle(data, options, element)
    //$(element).prepend("<div class=xyData></div>")
    //$('.xyData').append('Hi')

})
