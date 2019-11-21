$(document).ready(() =>{
  //The parameters

//   Format: 
// [MainTitle, Color-MainTitle, Size-MainTItle, YTitle, Color-YTitle, Size-YTitle
// XTitle, Color-XTutle, Size-XTitle, Color-Ylabel, Size-YLabel, Color-XLabel, Size-XLabel
// YAxisSegmentSize, Color-Bar, Color-BottomBar, Color-TopBar, Color-ValueOfBar,
// Size-ValueOfBar, Middle-PositionOfValueOfBar, SpacingBetweenBars, Height and Width of chart]


  options = ["DefaultMainTitle", "#1e90ff", "30px", "DefaultYTitle", "#663399", "25px", "DefaultXTitle", "#006400", "25px",
  "#ff9a00", "20px", "#b904b8", "20px", 
  "10", "none", "#00FA9A", "#FFF000", "#FF0000", "20px", "middle", "20px", 
  "200" , "200"], 

  data = [["apples", 5, 20],["oranges", 9, 18],["banana", 7],["avacado", 27, 30],["misc.", 10]],
  element = ".barGraph";
  
  //console.log(options)

  //The Functions
  function drawXYBox(height, width, element) {
      $(element).prepend("<div class=xyData></div>");
      //$(".xyData").css("border-left", "1px solid black");
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

  function drawXLabel(options, element){
      $(element).prepend("<div class=xTitle contenteditable=true>" + options[6] + "</div>");
      $(".xTitle").css({
        //"text-align" : "center",
        "padding-left" : "100px",
        "width" : "100%",
        "margin-top" : "10px",
        "margin-bottom" : "20px",
        "color" : options[7],
        "font-size" : options[8]
      });
  }

  function drawMainTitle(data, options, element) {
      $(element).prepend("<div class=title contenteditable=true>" + options[0] + "</div>");
      $(".title").css({
        "width" : "100%",
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
    
    //for each datapoint in the bar, draw the bar (data for a single bar must be sorted from lowest-highest)
    for (var i = 1; i < data[ID].length; i++) {
      $(".data" + ID).prepend("<div class=dataBar" + ID + i + "><div class=dataPoint" + i + ">" + data[ID][i] + "</div></div>");
      if(i % 2 !== 0){ //Coloring the BOTTOM BAR
          $(".dataBar" + ID + i).css({
          "border-top" : "1px solid black",
          "border-left" : "1px solid black",
          "border-right" : "1px solid black",
          "width": (options[22] / (data.length + 1)), //Determine the width of each bar based on the width of the chart area
          "position" : "relative",
          "background-color" : options[15] // Change later in the options
        });
        $(".dataPoint" + i).css({
          "position" : "absolute",
          "left" : "50%",
          "color" : options[17],
          "font-size" : options[18]
        });
      }else{ //Coloring the TOP BAR
        $(".dataBar" + ID + i).css({
          "border-top" : "1px solid black",
          "border-left" : "1px solid black",
          "border-right" : "1px solid black",
          "width": (options[22] / (data.length + 1)), //Determine the width of each bar based on the width of the chart area
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
        heightVal = (((data[ID][j] / maxVal) * options[21]) - heightVal) * (-1);
        //console.log(heightVal);
      }
      $(".dataBar" + ID + i).css("height", heightVal);
    }
    $(".data" + ID).css("border-bottom", "1px solid black");
    //add the space between each bar
    $(".allData").append("<div class=barSpace></div>");
}

//Function to create the bars using the data given
  function drawData(data, options) {
    $(".xyData").append("<div class=allData></div>");
    $(".allData").css("border-left", "1px solid black");
    
    //Find the max value contained in the data. This sets the container height.
    var maxVal = data[0][1];
    for (var i = 0; i < data.length; i++) {
      for (var j = 1; j < data[i].length; j++) {
        if (maxVal < data[i][j]) maxVal = data[i][j];
      }
    }

    //Get the largest y-axis value, which will be the closest multiple of 5 to the max value rounded up.
    var maxValAxis = Math.ceil(maxVal / 5) * 5;
    //calls the drawBars function for each bar that needs to be drawn in the data param
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
      var yAxisSegments = parseInt(options[13]); // Can be changed using the options value
      var increment = maxValAxis / yAxisSegments;

      //Every odd value of i, we draw an axis mark with a label (ie] -10), every even value we just draw an axis mark (ie] -).
      for (var i = (yAxisSegments - 1); i >= -1; i--) {
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
          "text-align" : "center",
          //Translate the x-axis labels so they are written vertically
          "writing-mode" : "tb-rl",
          "flex-grow" : "1",
          "top" : "50%",
          "position" : "relative",
          "transform" : "translateX(-40%)"
        });
      }

      //set the color of the labels and add a margin for aesthetic
      $(".xLabel").css({
        "margin-top" : "5px",
        "color" : options[11],
        "font-size" : options[12]
      });
      $(".yLabel").css({
        "color" : options[9],
        "font-size" : options[10]
      });
  }

  
  drawXYBox(200, 200, element);
  drawYLabel(element, options);
  drawXLabel(options, element)
  drawMainTitle(data, options, element)
  var maxAxisVal = drawData(data, options);
  drawAxisMarks(data, options, maxAxisVal)

})
