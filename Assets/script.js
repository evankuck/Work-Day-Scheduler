/* GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with time blocks for standard business hours
WHEN I view the time blocks for that day
THEN each time block is color-coded to indicate whether it is in the past, present, or future
WHEN I click into a time block
THEN I can enter an event
WHEN I click the save button for that time block
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist */
console.log("hello world")
// alt shift a 
const currentDateTime = moment().format('dddd MMMM Do YYYY')

// GIVEN I am using a daily planner to create a schedule

// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
$("#currentDay").text(currentDateTime);
 // jquery finding an element with an id of currentDay, then changeing the text with text method, passing in moment() method call empty, which means now in the format provided.



// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours
function createBlocks () {
    const container = $("#blockContainer")
    const currentHour = moment().hours()
    for(let i = 9; i <= 17; i++) {
        console.log(i)
        const parentDiv = $("<div>").addClass("row time-block").attr("id", i)
        const timeDiv = $("<div>").addClass("col-1 hour pt-2").text(i)
        const textArea = $("<textarea>").addClass("col-10 plan")
        // WHEN I view the time blocks for that day
        // THEN each time block is color-coded to indicate whether it is in the past, present, or future
        if(currentHour > i) {
            textArea.addClass("past") //color red
        } else if (currentHour < i) {
            textArea.addClass("future") // color gray
        } else {
            textArea.addClass("present") // color green
        }
        // WHEN I refresh the page
        // THEN the saved events persist
        const text = localStorage.getItem(i) // store text into a variable to be populated into a text area
        textArea.val(text) // textarea uses value instead of text
        const icon = $("<i>").addClass("fas fa-save")
        const button = $("<button>").addClass("col-1 saveBtn").html(icon) // note we should add an event listener before creating the block :)
        button.on("click", saveTextToLocalStorage)

        parentDiv.append(timeDiv ,textArea, button)
        container.append(parentDiv)
    }
    
}
createBlocks()



// WHEN I click into a time block
// THEN I can enter an event

// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
function saveTextToLocalStorage (event) {
    event.preventDefault()
    const element = $(this);
    const hour = $(this).parent().attr("id")
    const value = element.prev().val() // text in the time block textarea
    localStorage.setItem(hour, value)

}

