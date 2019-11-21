$(document).ready(() => {
  //The parameters
  (options = [
    "DefaultMainTitle",
    "DefaultYTitle",
    "DefaultXTitle",
    "middle",
    "#1e90ff",
    "#0f487f",
    "#000000",
    "#000000",
    "20px",
    "10px",
    "200",
    "200"
  ]),
    (data = [
      ["apples", 5, 20],
      ["oranges", 9, 18],
      ["banana", 7],
      ["avacado", 27, 30],
      ["misc.", 10]
    ]),
    (element = ".barGraph");

  console.log(options);

  //The Functions
  function drawXYBox(height, width, element) {
    $(element).prepend("<div class=xyData></div>");
    $(".xyData").css({
      height: "auto",
      width: "auto",
      float: "left",
      display: "inline-block"
    });
  }

  function drawYLabel(element, options) {
    $(element).prepend("<div class=yLabel></div>");
    $(".yLabel").css({
      display: "inline-block",
      float: "left",
      "margin-top": "-9px"
    });
    $(element).prepend(
      "<div class=yTitle contenteditable=true>" + options[1] + "</div>"
    );
    $(".yTitle").css({
      display: "100%",
      float: "10px",
      "writing-mode": "tb-rl",
      "text-align": "center",
      "margin-right": "10px",
      height: options[10]
    });
  }

  function drawXLabel(options, element) {
    $(element).prepend(
      "<div class=xTitle contenteditable=true>" + options[2] + "</div>"
    );
    $(".xTitle").css({
      width: "100%",
      "margin-top": "10px",
      "margin-bottom": "20px",
      "padding-left": "100px"
    });
  }

  function drawMainTitle(data, options, element) {
    $(element).prepend(
      "<div class=title contenteditable=true>" + options[0] + "</div>"
    );
    $(".title").css({
      width: "100%",
      "text-align": "center",
      "margin-bottom": "15px",
      "font-size": options[8],
      color: options[4]
    });
  }

  //Functions to draw the BARS
  function drawBars(ID, maxVal, options, data) {
    //Append a container to the allData div for the bar being drawn
    $(".allData").append("<div class=data" + ID + "></div>");
    //Set the bar to be displayed inline-block as the bars must be side by side
    $(".data" + ID).css("display", "inline-block");
    
    //for each datapoint in the bar, draw the bar (data for a single bar must be sorted from lowest-highest)
    for (var i = 1; i < data[ID].length; i++) {
      $(".data" + ID).prepend("<div class=dataBar" + ID + i + "><div class=dataPoint" + i + ">" + data[ID][i] + "</div></div>");
      if(i % 2 !== 0){ //Coloring the BOTTOM BAR
          $(".dataBar" + ID + i).css({
          "border-top" : "1px solid " + options[5],
          "border-left" : "1px solid " + options[5],
          "border-right" : "1px solid " + options[5],
          "width": (options[11] / (data.length + 1)), //Determine the width of each bar based on the width of the chart area
          "position" : "relative",
          "background-color" : "#FFF000" // Change later in the options
        });
        $(".dataPoint" + i).css({
          "position" : "absolute",
          "left" : "50%",
          "color" : options[6]
        });
      }else{ //Coloring the TOP BAR
        $(".dataBar" + ID + i).css({
          "border-top" : "1px solid " + options[5],
          "border-left" : "1px solid " + options[5],
          "border-right" : "1px solid " + options[5],
          "width": (options[11] / (data.length + 1)), //Determine the width of each bar based on the width of the chart area
          "position" : "relative",
          "background-color" : "#663399" // Change later in the options
        });
        $(".dataPoint" + i).css({
          "position" : "absolute",
          "left" : "50%",
          "color" : options[6]
        });
      }

      //Set the dataPoint to display at either the top, middle or bottom of the bar
      if (options[3] === "top") {
        $(".dataPoint" + i).css("top", "5%");
        $(".dataPoint" + i).css("transform", "translate(-50%, 0%)");
      } else if (options[3] === "middle") {
        $(".dataPoint" + i).css("top", "50%");
        $(".dataPoint" + i).css("transform", "translate(-50%, -50%)");
      } else {
        $(".dataPoint" + i).css("bottom", "0%");
        $(".dataPoint" + i).css("transform", "translate(-50%, -10%)");
      }
      //For multiple values, we calculate the remaining height needed to add above the currently drawn values to get the correct height of the bar
      var heightVal = (data[ID][i] / maxVal) * options[10];
      //console.log(heightVal + " outside");
      for (var j = 1; j < i; j++) {
        heightVal = (((data[ID][j] / maxVal) * options[10]) - heightVal) * (-1);
        //console.log(heightVal);
      }
      $(".dataBar" + ID + i).css("height", heightVal);
    }
    $(".data" + ID).css("border-bottom", "1px solid " + options[7]);
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
      "width" : options[9],
      "display" : "inline-block",
      "border-bottom" : "1px solid " + options[7]
    });
    return maxValAxis;
  }

  drawXYBox(200, 200, element);
  drawYLabel(element, options);
  drawXLabel(options, element);
  drawMainTitle(data, options, element);
  var maxAxisVal = drawData(data, options); //Draws the bars and returns the max value of the axis

});
