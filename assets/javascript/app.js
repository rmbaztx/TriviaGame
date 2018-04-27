//init variables
var numberCorrect = 0;
var numberIncorrect = 0;
var timeLeft = 30;
var qAndAArray = [];
var qNum = 0;
var userSelection = []; // we will use the same index for the player's selection for each question as we do for the question library

var inventory = [{
    q:"Is the Earth round?", 
    a:["Yes","No","Maybe"],
    correctAns:0
},
{
    q:"What is the capitol of Texas?",
    a:["Galveston","Waco","Austin"],
    correctAns:2
},
{   q:"Who was the first performer at Woodstock in 1969?",
    a:["The Who","Crosby, Stills, and Nash","Richie Havens"],
    correctAns:2
},
{
    q:"Who was president when the U.S. dropped two atomic bombs on Japan?",
    a:["Roosevelt","Truman","Eisenhower"],
    correct:1
},
{
    q:"Which musical group has won the most Grammy awards?",
    a:["The Beatles","U2","Nirvana"],
    correctAns:1
},
];
    
//Make sure HTML is ready
$(document).ready(function(){

//Enhancement idea: where can I get the Jeopardy theme?

//Enhancement idea: Add many more q & a sets, then choose a random question 
//and set of answers from Q & A Array
//qNum = Math.floor[Math.random()*2];
//Hide done button until start button is clicked
$("#doneButton").hide();

//START GAME
//WATCH START BUTTON - type submit - start game function?
$("#startButton").on("click",startGame);

function startGame() {
    $("#startButton").hide();
    $("#doneButton").show();
    for (var i = 0;i < inventory.length;i++) {
        var qaRow = $("<div>");
        qaRow.attr("name", i);
        qaRow.text(inventory[i].q);
        qaRow.append($("<br>")).append($("<br>"));
        for (var j = 0;j < inventory[i].a.length;j++) {
            var answerChoices = $("<input type='radio' id='" + i + j +"' name='" + i + "'> <label for='" + i + j +"'>" + inventory[i].a[j] + "</label>"); 
            qaRow.append(answerChoices);
        }
        $("#question").append(qaRow).append($("<br>"));
    }
//set timeout instead
setTimeout(finishGame,timeLeft*1000);
setInterval(function(){
    timeLeft--;
    $("#timer").text("Time Left: " + timeLeft);
},1000);    
}
 
//PRINT THE QUESTIONS

//Create a row of radio buttons for each possible answer to the question
for (var j = 0;j < inventory[0].a.length;j++) {
    console.log("Answer " + j + "=" + inventory[0].a[j]);
   
//CREATE RADIO BUTTONS for each answer option
//create a div to hold radio buttons for each question
//place an integer (j) into the radio button to make it easier to compare //player-chosen answer to correctAns
    var answerDiv = $("<div class='container'>");
    var answerText = inventory[0].a[j];
    console.log("answerText = " + answerText);
    var answerButton = $("<label class='radio-inline'><input type='radio' name='optradio'>Austin</label>");
    console.log("answerButton = " + answerButton);
    //assign answer # (j) to button's val
   // $("#opt-radio").val() = j; //what is the correct name to use?
    //answerOne.attr(val , j);
//var test = $("<p>").text(answerOne);
 //   answerDiv.append(answerOne);    
}

//Repeat row creation as many times as the # of questions we want to ask

//Watch for player's one-and-only selection on each question -- is there an 
//element in jQuery or Bootstrap that already has this functionality? -- see Bootstrap
//(player can change their selection up until the clock runs out or they click "Done")

//If clock runs out or player clicks "Done", 
    //finishGame

//UPDATE SCORES 
    function finishGame() {
        $("#doneButton").hide();
        for (i = 0;i < inventory.length;i++) {
            for (j = 0;j < inventory[i].a.length;j++) {
                if ($("#" + i + j).is(":checked")) { //  -- find selected button of row [i]
                    if (j === inventory[i].correctAns) {
                        numberCorrect++;
                    }
                    else {
                        numberIncorrect++;
                    }    
                }
            }
        }
        // 
//Display #correct, #incorrect
    var results = $("#question");
    $("#timer").hide();
    results.empty();
    results.append("Number of correct answers: " + numberCorrect + "<br>");
    results.append("Number of incorrect answers: " + numberIncorrect);
    //$("#startButton").show();  //this seemed to cause problems I'll look into later
    }

//--DONE BUTTON-- 
    $("#doneButton").on("click",finishGame);      
});