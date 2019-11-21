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

  drawXYBox(200, 200, element);
  drawYLabel(element, options);
  drawXLabel(options, element);
  drawMainTitle(data, options, element);
});
