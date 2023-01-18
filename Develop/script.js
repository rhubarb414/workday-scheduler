// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var timeBlockEls = document.querySelectorAll(".time-block");
var saveBtns = document.getElementsByClassName("saveBtn"); // delete?
var allTasks = {
  "hour-8": "",
  "hour-9": "",
  "hour-10": "",
  "hour-11": "",
  "hour-12": "",
  "hour-1": "",
  "hour-2": "",
  "hour-3": "",
  "hour-4": "",
  "hour-5": "",
};

$(function () {
  var todayEl = document.getElementById("currentDay");

  var agenda = {};
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  timeBlockEls.forEach(clickHandler);

  function clickHandler(timeBlock) {
    //add click listener to time block
    timeBlock.addEventListener("click", function (event) {
      var task = this.querySelector(".description").value; //assign task the input in the time block's text area
      var clickTarget = event.target;
      var currentTimeBlock = this.id;
      console.log("currentTimeBlock = " + currentTimeBlock);

      console.log(`${this.id}`); //hour value of time-block
      //check if save button or save button hover is clicked
      if (
        clickTarget.className === "btn saveBtn col-2 col-md-1" ||
        clickTarget.className === "fas fa-save"
      ) {
        console.log(`Button area clicked!`);
        console.log("task description = " + task);
        //add new task to allTasks object
        allTasks[currentTimeBlock] = task.trim();
        localStorage.setItem("allTasks", JSON.stringify(allTasks));
      }
    });
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  todayEl.textContent = `Today is ${dayjs().format("dddd, MMM DD")}.`;
});
