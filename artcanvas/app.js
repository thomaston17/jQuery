var $colorPalette = $(".select-color ul");
var $canvas = $("#canvas");
var ctx = $canvas[0].getContext("2d");
var mouseDown = false;
var canvasClicked = false;

// Adds selected class to chosen color
$colorPalette.on("click", "li", function() {
  selectColor($(this));
});

// Removes class from siblings, adds class to chosen
function selectColor(e) {
  e.siblings().removeClass("selected");
  e.addClass("selected");
}

// Toggles and animates hidden panel
$(".new-color-btn").click("click", function() {
  togglePanel();
});

// Allows animation to toggle
function togglePanel() {
  renewElement($(".anim-wrap"));
  var $animated = $(".anim-wrap");
  var shown = $animated.hasClass('on');
  $animated.toggleClass('on', !shown).toggleClass('off', shown);
}

// Allows animation to play more than once
function renewElement(e) {
  var newElement = e.clone(true);
  e.remove();
  $(".new-color").append(newElement);
}

// Changes the color preview to the user defined color
$(".rgb-sliders input").change(function() {
  $(".color-preview").css("background", currentColor());
})

// Returns the RGB from the defined slider values
function currentColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  var color = "rgb(" + r + "," + g + "," + b + ")";

  return color;
}

// Appends new color onto color selection menu
$(".add-color-btn").on("click", function() {
  var $newColor = $("<li></li>").hide();
  $newColor.css("background", currentColor());
  $colorPalette.append($newColor);
  selectColor($newColor);
  $newColor.animate({ width: 'toggle' }, 200);
  togglePanel();
});

// Allows user to draw onto canvas
$canvas.mousedown(function(e) {
  lastEvent = e;
  mouseDown = true;
  removeLogo();
}).mousemove(function(e) {
  if (mouseDown) {
    ctx.beginPath();
    ctx.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = $(".selected").css("background-color");
    ctx.lineWidth = $("#line-size").val();
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.stroke();
    lastEvent = e;
  }
}).mouseup(function() {
  mouseDown = false;
}).mouseleave(function() {
  $canvas.mouseup();
});

// Removes the logo background when user starts to draw
function removeLogo() {
  if (!canvasClicked) {
    var bg = $("canvas").css("background-image");
    var bgs = bg.split(',');
    bgs.splice(0, 1);
    $("canvas").css("background-image", bgs.concat());
    $("canvas").css("background-repeat", "repeat");
    canvasClicked = true;
  }
}