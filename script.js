$(document).ready(() =>{
  //The parameters

// Format: options = [  
//  MainTitle, 
//  Color-MainTitle, 
//  Size-MainTItle, 
//  YTitle, 
//  Color-YTitle, 
//  Size-YTitle,
//  XTitle, 
//  Color-XTitle, 
//  Size-XTitle, 
//  Color-Ylabel, 
//  Size-YLabel, 
//  Color-XLabel, 
//  Size-XLabel
//  YAxisSegmentSize, 
//  Color-Bar, 
//  Color-BottomBar, 
//  Color-TopBar, 
//  Color-ValueOfBar,
//  Size-ValueOfBar, 
//  Middle-PositionOfValueOfBar, 
//  SpacingBetweenBars, 
//  Height of chart,
//  Width of chart
//  ]

  (options = [
    "DefaultMainTitle", // Main Title (Default)
    "#1e90ff",          // Color-MainTitle
    "30px",             // Size-MainTitle
    "DefaultYTitle",    // Y-Title (Default)
    "#663399",          // Y-Title (Color)
    "25px",             // Y-Title (Font-size)
    "DefaultXTitle",    // X-Title (Default)
    "#006400",          // X-Title (Color)
    "25px",             // X-Title (Font-size)
    "#ff9a00",          // Y-Label (Color)
    "20px",             // Y-Label (Size)
    "#b904b8",          // X-Label (Color)
    "20px",             // X-Label (Font-Size)
    "5",               // Y-Axis Divisions or increment value
    "none",             // Bar (Color)
    "#00FA9A",          // Bottom Bar (Color)
    "#FFF000",          // Top Bar (Color)
    "#FF0000",          // Value of Bar (Color)
    "12px",             // Value of Bar (Font-Size)
    "middle",           // Value of Bar (Position)
    "20px",             // Space Between Bars
    "200",              // Height of entire Bar Chart (Dafault='auto')
    "200",              // Width of entire Bar Chart (Dafault='auto')
    "valDepend"         // Bar width dependent on the value of each bar (leave blank to have equal width)
  ]),
    //Format: data = [["Item1", Value1, Value2], ["Item2", Value1, Value2], ["Item3", Value1, Value2],]
    (data = [
      ["Item1", 20, 30],
      ["Item2", 28, 12],
      ["Item3", 36],
      ["Item4", 25],
      ["Item5", 30]
    ]),
    //The DOM Element where the entire bargrpah will be rendered
    (element = ".root");

  function drawBarChart(data, options, element){

    //The Functions
    function drawXYBox(element) {
      $(element).prepend("<div class=xyData></div>");
      $(".xyData").css({
        "height" : "auto",
        "width" : "auto",
        "float" : "left",
        "display" : "inline-block"
      });
    }

    function drawYLabel(element, options) {
      $(element).prepend("<div class=yLabel></div>");
      $(".yLabel").css({
        "display" : "inline-block",
        "float" : "left",
        "margin-top" : "-9.5px"
      });
      $(element).prepend('<div class=yTitle contenteditable=true>' + options[3] + '</div>');
      $(".yTitle").css({
        "display" : "inline-block",
        "float" : "left",
        "writing-mode" : "tb-rl",
        "text-align" : "center",
        "margin-right" : "10px",
        "height" : options[21],
        "color" : options[4],
        "font-size" : options[5]
      });
    }

    function drawXLabel(options, chartWidth, element){
      $(element).prepend("<div class=xTitle contenteditable=true>" + options[6] + "</div>");
      $(".xTitle").css({
        "text-align" : "center",
        "padding-left" : "60px",
        "width" : chartWidth,
        "margin-top" : "10px",
        "margin-bottom" : "20px",
        "color" : options[7],
        "font-size" : options[8]
      })
    }

    function drawMainTitle(options, chartWidth, element) {
      $(element).prepend("<div class=title contenteditable=true>" + options[0] + "</div>");
      $(".title").css({
        "width" : chartWidth,
        "padding-left" : "60px",
        "text-align" : "center",
        "color": options[1],
        "font-size" : options[2],
        "margin-bottom" : "15px"
      });      
    }

    //Functions to draw the BARS
    function drawBars(ID, maxVal, options, data) {
      //Append a container to the allData div for the bar being drawn
      $(".allData").append("<div class=data" + ID + "></div>");
      //Set the bar to be displayed inline-block as the bars must be side by side
      $(".data" + ID).css({
        "display" : "inline-block",
        "background-color" : options[14]
      });

      function makeBottomBar(ID, i, data, options){
        $(".dataBar" + ID + i).css({
          "border-top" : "1px solid black",
          "border-left" : "1px solid black",
          "border-right" : "1px solid black"
        })
        if(options[23] === "valDepend"){
          $(".dataBar" + ID + i).css({
            "width" : (data[ID][i]), //Width based on the numeric value of bar
          })
        }else{
          $(".dataBar" + ID + i).css({
            //Determine the width of each bar based on the width of the chart area
            "width": (options[22] / (data.length + 1)) 
          })
        }
        $(".dataBar" + ID + i).css({          
          "position" : "relative",
          "background-color" : options[15] // Change later in the options
        });

        // Getting the data points styled
        $(".dataPoint" + i).css({
          "position" : "absolute",
          "left" : "50%",
          "color" : options[17],
          "font-size" : options[18]
        });
      }

      function makeTopBar(ID, i, data, options){
        if(options[23] === "valDepend"){
          $(".dataBar" + ID + i).css({
            "width" : (data[ID][i]), //Width based on the numeric value of bar
          })
        }else{
          $(".dataBar" + ID + i).css({
            //Determine the width of each bar based on the width of the chart area
            "width": (options[22] / (data.length + 1)), 
          })
        }
        $(".dataBar" + ID + i).css({  
            "border" : "1px solid black",
            "position" : "relative",
            "background-color" : options[16] // Change later in the options
        });

        $(".dataPoint" + i).css({
            "position" : "absolute",
            "left" : "50%",
            "color" : options[17],
            "font-size" : options[18]
        });
      }
      
      //for each datapoint in the bar, draw the bar (data for a single bar must be sorted from lowest-highest)
      for (var i = 1; i < data[ID].length; i++) {
        $(".data" + ID).prepend("<div class=dataBar" + ID + i + "><div class=dataPoint" + i + ">" + data[ID][i] + "</div></div>");
        if(i % 2 !== 0){ // BOTTOM BAR MAKING FUNCTION RUNNING
          makeBottomBar(ID, i, data, options)
        }else{ // TOP BAR MAKING FUNCTION RUNNING
          makeTopBar(ID, i, data, options)
        }

        //Set the dataPoint to display at either the top, middle or bottom of the bar
        if (options[19] === "top") {
          $(".dataPoint" + i).css("top", "5%");
          $(".dataPoint" + i).css("transform", "translate(-50%, 0%)");
        } else if (options[19] === "middle") {
          $(".dataPoint" + i).css("top", "50%");
          $(".dataPoint" + i).css("transform", "translate(-50%, -50%)");
        } else {
          $(".dataPoint" + i).css("bottom", "0%");
          $(".dataPoint" + i).css("transform", "translate(-50%, -10%)");
        }
        //For multiple values, we calculate the remaining height needed to add above the currently drawn values to get the correct height of the bar
        var heightVal = (data[ID][i] / maxVal) * options[21];
        //console.log(heightVal + " outside");
        for (var j = 1; j < i; j++) {
          //heightVal = (((data[ID][j] / maxVal) * options[21]) - heightVal) * (-1);
          //console.log(heightVal);
        }
        $(".dataBar" + ID + i).css("height", heightVal);
      }
      $(".data" + ID).css("border-bottom", "1px solid black");
      //add the space between each bar
      $(".allData").append("<div class=barSpace></div>");
    } // END OF DRAW BARS FUNCTION

    //Function to create the bars using the data given
    function drawData(data, options) {
      $(".xyData").append("<div class=allData></div>");
      $(".allData").css("border-left", "1px solid black");
      
      //Find the max value contained in the data. This sets the container height.
      //TESTING
      if(!isNaN(data[0][2])){
        var maxVal = data[0][1] + data[0][2];
      }else{
        var maxVal = data[0][1];console.log(maxVal)
      }

      for(let i = 0; i<data.length; i++){
        var arr = [], sum = 0;
        for(let j=1; j<data[i].length; j++){
          arr.push(data[i][j])
        }
        if(arr.length > 1){
          sum = arr.reduce((total, current)=>(total+current));
        }else{
          sum = arr[0];
        }
        if(maxVal < sum){maxVal = sum}
      }

      //Get the largest y-axis value, which will be the closest multiple of 5 to the max value rounded up.
      var maxValAxis = Math.ceil(maxVal / 5) * 5;
      //calls the drawBars function for each bar that needs to be drawn
      for (var i = 0; i < data.length; i++) {
        drawBars(i, maxValAxis, options, data);
      }

      //Sets the spacing between the bars to the value input in the options parameter
      $(".barSpace").css({
        "width" : options[20],
        "display" : "inline-block",
        "border-bottom" : "1px solid black"
      });
      return maxValAxis;
    }

    //The function that draws the axis marks of the x-axis and y-axis
    function drawAxisMarks(data, options, maxValAxis) {

      $(".xyData").append("<div class=xLabel></div>");
      $(".xLabel").css("display", "flex");
      $(".xLabel").css("flex-wrap", "nowrap");
      
      //Each y-axis will have 10 axis-marks 
      var increment = parseInt(options[13]); // Can be changed using the options value
      var yAxisSegments = Math.ceil(maxAxisVal / increment);
      //Every odd value of i, we draw an axis mark with a label (ie] -10), every even value we just draw an axis mark (ie] -).
      for (var i = (yAxisSegments -1); i >= -1; i--) {console.log(maxValAxis)
        if (i % 2 != 0) { //i.e.- Odd value
          $(".yLabel").append("<div class=dashY" + i + ">" + maxValAxis + "-</div>");
          $(".dashY" + i).css("height", (options[21] / yAxisSegments));
        } else {
          $(".yLabel").append("<div class=dashY" + i + ">-</div>");
          $(".dashY" + i).css("height", (options[21] / yAxisSegments));
        }
        maxValAxis -= increment;
        $(".dashY" + i).css("text-align", "right");
      }
      

      //for each bar, draw an x-axis label
      for (var i = 0; i < data.length; i++) {
        $(".xLabel").append("<div class=tick" + i + ">" + data[i][0] + "</div>");
        $(".tick" + i).css({
          "display" : "inline-block",
          //"text-align" : "center",
          //Translate the x-axis labels so they are written vertically
          "writing-mode" : "tb-rl",
          "flex-grow" : "1",
          "top" : "50%",
          "padding-right" : "10px",
          "position" : "relative",
          "transform" : "translateX(-40%)",
        });
      }

      //Color of the labels and add a margin
      $(".xLabel").css({
        "margin" : "auto",
        "color" : options[11],
        "font-size" : options[12]
      });
      $(".yLabel").css({
        "color" : options[9],
        "font-size" : options[10]
      });
  }

  //EXECUTING THE drawBarChart FUNCTION when BEING RUN IN THE SCRIPT FILE

    drawXYBox(element);
    drawYLabel(element, options);
    var maxAxisVal = drawData(data, options);
    drawAxisMarks(data, options, maxAxisVal);
    var chartWidth = $(".xyData").width();
    drawXLabel(options, chartWidth, element);
    drawMainTitle(options, chartWidth, element);

    //THE CLICK EVENTS
    // Main title, X-Title and Y-Title editable on CLICK
    $(".title, .xTitle, .yTitle").click((event) => {
      if($(event.target).attr('class') === 'title'){
        var input = window.prompt("Enter name of chart", "");
        $(event.target).closest('div').text(input)
      }else if($(event.target).attr('class') === 'xTitle'){
        var input = window.prompt("Enter name for x-axis", "");
        $(event.target).closest('div').text(input)
      }else if($(event.target).attr('class') === 'yTitle'){
        var input = window.prompt("Enter value for y-axis", "");
        $(event.target).closest('div').text(input)
      }
    });

    //Changes color of individual xLabel colors ON CLICK
    $(".xLabel").click((event) => {
      var input = window.prompt("Enter a color", "");
      $(event.target).closest('div').css("color", input);
    });

    //Changes color of individual YLabel colors ON CLICK
    $(".yLabel").click((event) => {
      var input = window.prompt("Enter a color", "");
      $(event.target).closest('div').css("color", input);
    });

}

//RUNNING THE drawBarChartFunction
drawBarChart(data, options, element)


})