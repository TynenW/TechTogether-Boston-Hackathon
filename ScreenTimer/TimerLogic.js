//As soon as the webpage is open, time is being counted.
var minsBtwnBreak=1; 
function markPresent() {
  window.markDate = new Date();
  $(document).ready(function() {
    $("div.absent").toggleClass("present");
  });
  updateClock();
}

//Counts the time according to the date opened, with benchmark of 1000.
function updateClock() {
  var currDate = new Date();
  var diff = currDate - markDate;
  document.getElementById("timer").innerHTML = format(diff / 1000);
  document.getElementById("breakTimer").innerHTML = breakCalc(diff / 1000);
  setTimeout(function() {
    updateClock()
  }, 1000);
}

//Math conversion from seconds to minutes to hours.
function format(seconds) {
  var numhours = parseInt(Math.floor(((seconds % 31536000) % 86400) / 3600), 10);
  var numminutes = parseInt(Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), 10);
  var numseconds = parseInt((((seconds % 31536000) % 86400) % 3600) % 60, 10);
  return ((numhours < 10) ? "0" + numhours : numhours) +
    ":" + ((numminutes < 10) ? "0" + numminutes : numminutes) +
    ":" + ((numseconds < 10) ? "0" + numseconds : numseconds);
}

//calculate when your next break from your computer is
function breakCalc(sec){
  //The mins and secs users been on page for
  var numminutes = parseInt(Math.floor((((sec % 31536000) % 86400) % 3600) / 60), 10);
  var numseconds = parseInt((((sec % 31536000) % 86400) % 3600) % 60, 10); 
  var nextBreakMins=minsBtwnBreak-numminutes-1;
  var nextBreakSec=60-numseconds;
  if (nextBreakMins === -1 ){
  //(nextBreakSec <= 59){
    minsBtwnBreak=minsBtwnBreak*2;
    popup();
    }
  return ((nextBreakMins < 10) ? "0" + nextBreakMins : nextBreakMins) +
    ":" + ((nextBreakSec < 10) ? "0" + nextBreakSec : nextBreakSec);
}

//breakPopUp
/*https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal*/
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var breakEvent = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closePopUp")[0];

// When the user clicks the button, open the modal 
function popup(){
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

markPresent();
