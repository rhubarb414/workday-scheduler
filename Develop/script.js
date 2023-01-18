//create node list of all time-block elements
var timeBlockEls = document.querySelectorAll(".time-block");
//format allTasks object so we can add tasks and save to local storage
var allTasks = {
  "hour-8": "",
  "hour-9": "",
  "hour-10": "",
  "hour-11": "",
  "hour-12": "",
  "hour-13": "",
  "hour-14": "",
  "hour-15": "",
  "hour-16": "",
  "hour-17": "",
};

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var todayEl = document.getElementById("currentDay");

  // listens for click on saveBtn and stores user input in local storage
  function clickHandler(timeBlock) {
    //add click listener to time block
    timeBlock.addEventListener("click", function (event) {
      var task = this.querySelector(".description").value; //assign task the input in the time block's text area
      var clickTarget = event.target;
      var currentTimeBlock = this.id; //hour value of time-block

      //check if save button or hover pseudo element is clicked
      if (
        clickTarget.className === "btn saveBtn col-2 col-md-1" ||
        clickTarget.className === "fas fa-save"
      ) {
        //add new task to allTasks object
        allTasks[currentTimeBlock] = task.trim();

        //store updated allTasks in local storage
        localStorage.setItem("allTasks", JSON.stringify(allTasks));
      }
    });
  }

  //Adds listener to run clickHandler() on each timeblock
  timeBlockEls.forEach(clickHandler);

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function colorState(timeBlock) {
    //take timeBlock ID and strip the "hour-"
    //leaving just the numeric hour value. Ex. "hour-11" --> "11"
    var hour = timeBlock.id.replace("hour-", "");

    //compare hour to current IRL hour and apply corresponding colors to time-blocks
    if (hour < dayjs().hour()) {
      timeBlock.classList.add("past");
    } else if (hour === dayjs().hour()) {
      timeBlock.classList.add("present");
    } else {
      timeBlock.classList.add("future");
    }
  }
  //run colorState() for each timeBlock
  timeBlockEls.forEach(colorState);

  // Gets any user input that was saved in localStorage and sets
  // the values of the corresponding textarea elements.
  function getSavedTasks() {
    //get allTasks obj from local Stage
    var savedTasks = JSON.parse(localStorage.getItem("allTasks"));

    //Don't overwrite preformatted allTasks obj with null if nothing in local storage
    if (savedTasks !== null) {
      //otherwise update allTasks with local storage values
      allTasks = savedTasks;
    }

    //display savedTasks in corresponding time blocks
    for (var timeBlock in allTasks) {
      // select <textarea> child of current time-block div
      var textArea = $(`#${timeBlock}`).children("textarea");
      //update textarea with savedTask
      textArea.text(allTasks[timeBlock]);
    }
  }
  getSavedTasks();

  //Displays the current date in the header of the page.

  todayEl.textContent = `Today is ${dayjs().format("dddd, MMM DD")}.`;
});
