
var timeDif = 12;
var startTime = 9;
var endTime = 18;
var currentHour = moment().hour();
var changeHour = currentHour - 12;
var aboveClassChange;
var belowClassChange;
var savedText = '';
var date = moment().format("dddd, MMM Do");


var checkToday = localStorage.getItem("today");

if (checkToday !== date) {
    localStorage.clear();
    localStorage.setItem("today", date);
}


$(document).ready(function () {

    $("#currentDay").append(date);


    // create new block element for each our 9-5 
    for (let index = startTime; index < endTime; index++) {

        var changeTime = index - 12;

        if (changeTime > changeHour) {
            aboveClassChange = 'future';
        }
        else if (changeTime < changeHour) {
            aboveClassChange = 'past';
        }
        else {
            aboveClassChange = 'present';
        }

        if (index > currentHour) {
            belowClassChange = 'future';
        }
        else if (index < currentHour) {
            belowClassChange = 'past';
        }
        else {
            belowClassChange = 'present';
        }

        if (index > 12) {
            var dynamicElements = (`<div id="hour-${index}" class="row time-block"><div class="col-md-1 hour">${changeTime}PM</div><textarea id="toSave${index}" class="col-md-10 description${index} ${aboveClassChange}"></textarea><button class="btn saveBtn${index} col-md-1"><i class="fas fa-save"></i></button></div>`)

            $(".container").append(dynamicElements)

            var load = JSON.parse(localStorage.getItem(`schedule${index}`))
            $(`#toSave${index}`).append(load)

            

            $(`.saveBtn${index}`).on("click", function() {

                localStorage.setItem(`schedule${index}`, JSON.stringify($(`#toSave${index}`).val()))
            })
        }

        else if (index == 12) {
            var dynamicElementsNoon = (`<div id="hour-${index}" class="row time-block"><div class="col-md-1 hour">${index}PM</div><textarea id="toSave${index}" class="col-md-10 description ${belowClassChange}"></textarea><button class="btn saveBtn${index} col-md-1"><i class="fas fa-save"></i></button></div>`)
        
            $(".container").append(dynamicElementsNoon)

            var loadNoon = JSON.parse(localStorage.getItem(`scheduleNoon${index}`))
            $(`#toSave${index}`).append(loadNoon)

            

            $(`.saveBtn${index}`).on("click", function() {

                localStorage.setItem(`scheduleNoon${index}`, JSON.stringify($(`#toSave${index}`).val()))
            })
        
        }

        else {
            var dynamicElementsDay = (`<div id="hour-${index}" class="row time-block"><div class="col-md-1 hour">${index}AM</div><textarea id="toSave${index}" class="col-md-10 description ${belowClassChange}"></textarea><button class="btn saveBtn${index} col-md-1"><i class="fas fa-save"></i></button></div>`)

            $(".container").append(dynamicElementsDay)

            var loadDay = JSON.parse(localStorage.getItem(`scheduleDay${index}`))

            $(`#toSave${index}`).append(loadDay)
            
            

            $(`.saveBtn${index}`).on("click", function() {

                localStorage.setItem(`scheduleDay${index}`, JSON.stringify($(`#toSave${index}`).val()))
            })
        }
        
    }
    
})









