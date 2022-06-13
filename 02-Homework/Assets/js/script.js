let questions = [
    {
    question: "Which of the following applies to JavaScript?",
    answer: "Javascript is single-threaded",
   choices: [
      "Javascript is multi-threaded",
      "Javascript has only 3 data types",
      "Javascript is single-threaded",
      "Javascript is related to Java"
    ]
  },
  {
    question: "What does DOM stand for?",
    answer: "Document Object Model",
   choices: [
      "Data Object Model",
      "Document Object Model",
      "Data Omission Module",
      "Dancing On Margaritas"
    ]
  },
  {
    question: "Which of the following is true?",
    answer: "All of the above",
   choices: [
      "(2 === 2)",
      "(2 == '2')",
      "(2 !== 3)",
      "All of the above"
    ]
  },
  {
    question: "Which is NOT a falsy value?",
    answer: "1",
   choices: [
      "Undefined",
      "NaN",
      "Null",
      "1"
    ]
  },
  {
    question: "Which is NOT a data type",
    answer: "Assign",
   choices: [
      "String",
      "Assign",
      "Number",
      "Boolean"
    ]
  },
  {
    question: "What will be logged to the console? function calculator (a,b){return  a % b}console.log(calculator(4,2))",
    answer: "0",
   choices: [
      "2",
      "0",
      "8",
      "1"
    ]
  },
  {
    question: "Which of the following is NOT a logical operator?",
    answer: ">",
   choices: [
      "!",
      "&&",
      ">",
      "||"
    ]
  },
  {
    question: "Which of the following is not a Comparison Operator?",
    answer: "=!",
   choices: [
      "==",
      ">=",
      "=!",
      "==="
    ]
  },
  {
    question: "What is JavaScript's relation to Java",
    answer: "Absolutely not related",
   choices: [
      "Java is JavaScript's previous name",
      "Absolutely not related",
      "Java is where JavaScript was made",
      "¯\_(ツ)_/¯"
    ]
  },
 
]


// set variables to html elements
var questionDiv = document.getElementById("question_div");
var questionTitle = document.getElementById("question_title");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var ansCheck = document.getElementById("check_ans");
var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start_quiz_btn");
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("time_left");
var timesUp = document.getElementById("times_up");
var highScoreSection = document.getElementById("highscore_card");
var finalScore = document.getElementById("final_score");
var summary = document.getElementById("summary");
var SubmitBtn = document.getElementById("submit_btn");
var initialInput = document.getElementById("initials_input");
var returnBtn = document.getElementById("return_btn");
var clearHighScoreBtn = document.getElementById("clear_highscore"); 
var viewHighScore = document.getElementById("vie_highscore");
var listOfHighScores = document.getElementById("highscore_list");

// set value variables
var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;
var totalTime = 151;



//start quiz function
function newQuiz() {
    questionIndex = 0;
    totalTime = 150;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    startDiv.style.display = "none";
    questionDiv.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    },1000);

    showQuiz();
};



// show first set of questions
function showQuiz() {
    nextQuestion();
}
//next question function
function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}

// //show if answer is correct or not
function checkAnswer(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    ansCheck.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        // correct answer, add 1 score to final score
        correctAns++;
        ansCheck.textContent = "Correct!";
    } else {
        // wrong answer, deduct 20 second from timer
        totalTime -= 20;
        timeLeft.textContent = totalTime;
        ansCheck.textContent = "Incorrect! The correct answer is: " + questions[questionIndex].answer;
    }

    questionIndex++;
    // repeat with the rest of questions 
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        // when questions are finished.
        gameOver();
    }
}

function chooseA() { checkAnswer(0); }
function chooseB() { checkAnswer(1); }
function chooseC() { checkAnswer(2); }
function chooseD() { checkAnswer(3); }

// when all questions are answered or timer reaches 0, game over
function gameOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";

    // show final score
    finalScore.textContent = correctAns;
}

// enter initial and store highscore in local storage
function storeHighScores(event) {
    event.preventDefault();

    // stop function is initial is blank
    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   

    // store scores into local storage
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    // stringify array in order to store in local
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    // show current highscores
    showHighScores();
}

// function to show high scores
var i = 0;
function showHighScores() {

    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    // check if there is any in local storage
    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}


startQuizBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

SubmitBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
});

returnBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});
