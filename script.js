// Shows what the current hour is to determine color of textarea 
var currentHour = moment().hour();

// Business hour are from 9am-5pm
var startTime = 9;
var endTime = 18;

// Initialize variables to use later 
var timeChanger;
var time;

// Current date 
var date = moment().format("dddd, MMM Do");

// Date stored in localstorage 
var checkToday = localStorage.getItem("today");

// If the day changed then clear data from previous day and store the current date 
if (checkToday !== date) {
    localStorage.clear();
    localStorage.setItem("today", date);
}


$(document).ready(function () {

    // Displays the date at the top of the screen 
    $("#currentDay").append(date);


    // create new block element for each our 9-5 
    for (let index = startTime; index < endTime; index++) {

        // Changed 24-hour clock to 12-hour clock 
        var changeTime = index - 12;

        // Compares the loop iteration to the current hour to determine the textarea color 
        if (index > currentHour) {
            ClassChange = 'future';
        }
        else if (index < currentHour) {
            ClassChange = 'past';
        }
        else {
            ClassChange = 'present';
        }

        // Changes the time from 24-hour to 12-hour and changes it to PM
        if (index >= 12) {
            timeChanger = changeTime;
            time = "PM"

            // Sets time to 12 otherwise it would be zero 
            if (index == 12) {
                timeChanger = 12
            }
        }

        // Displays all AM hours 
        else {
            timeChanger = index;
            time = "AM"
        }

        // Creates an HTML row and places the hour display, textarea, and save button within it
        var dynamicElements = (`<div id="hour-${index}" class="row time-block"><div class="col-md-1 hour">${timeChanger}${time}</div><textarea id="toSave${index}" class="col-md-10 description${index} ${ClassChange}"></textarea><button class="btn saveBtn${index} col-md-1"><i class="fas fa-save"></i></button></div>`)

        // Appends dynamically created elements to the page 
        $(".container").append(dynamicElements)

        // Gets previously saved textarea data
        var load = JSON.parse(localStorage.getItem(`schedule${index}`))

        // Appends saved data to its respective textarea
        $(`#toSave${index}`).append(load)

        // Creates an onclick event that saves the data within its textarea. It's differentiated by its index number 
        $(`.saveBtn${index}`).on("click", function() {

            localStorage.setItem(`schedule${index}`, JSON.stringify($(`#toSave${index}`).val()))
        })
        }    
})