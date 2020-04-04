//hold questions and answers
//questions are from tutorialspoint.com
var questions = [
    {
        text: "What is a full-stack?",
        answers: [
            { text: "1. HTML", correct: false },
            { text: "2 .Back-end and Front-end", correct: true },
            { text: "3. CSS", correct: false },
            { text: "4. JavaScipt", correct: false },

        ]

    },
    {
        text: "What is CSS ?",
        answers: [
            { text: "1. Component Style Sheet", correct: false },
            { text: "2. Current Style Sheet", correct: false },
            { text: "3. Cascading Style Sheet", correct: true },
            { text: "4. Charactes Style Sheet", correct: false },

        ]
    },
    {
        text: "What does HTML stands for?",
        answers: [
            { text: "1. Hyper Text Markup Language", correct: true },
            { text: "2. Home Text Markup Language", correct: false },
            { text: "3. Hyperlinks Text Markup Language", correct: false },
            { text: "4. Hyper Tool Markup Language", correct: false },

        ]
    },
    {
        text: "What is the coorect HTML tag for largest heading?",
        answers: [
            { text: "1. H6", correct: false },
            { text: "2. H1", correct: true },
            { text: "3. Heading", correct: false },
            { text: "4. Head", correct: false },

        ]

    },
    {
        text: "How to get the type of arguments passed to a fucntion?",
        answers: [
            { text: "1. using typeof operator", correct: true },
            { text: "2. using getType function", correct: false },
            { text: "3. Both of the above", correct: false },
            { text: "4. none of the above", correct: false },

        ]

    },
    {
        text: "Which of the following function of String object returns the character at the specified index",
        answers: [
            { text: "1. charIndexAt", correct: false },
            { text: "2. charAt", correct: true },
            { text: "3. indexof", correct: false },
            { text: "4. none of the above", correct: false },

        ]
    },
    {
        text: "Which of the following type of variable is visible only within a function where it is defined?",
        answers: [
            { text: "1. local variable", correct: true },
            { text: "2. global variable", correct: false },
            { text: "3. both of above", correct: false },
            { text: "4. None of above", correct: false },

        ]
    },
    {
        text: "Which built-in method sorts the elements of an array?",
        answers: [
            { text: "1. changeOrder(order)", correct: false },
            { text: "2. sort()", correct: true },
            { text: "3. order()", correct: false },
            { text: "4. None of the above", correct: false },

        ]
    },
    {
        text: "Which of the following function of String object returns a string representing the specified object?",
        answers: [
            { text: "1. toLocaleUpperCase()", correct: false },
            { text: "2. substring()", correct: false },
            { text: "3. toUpperCase()", correct: false },
            { text: "4. toString()", correct: true },

        ]
    }
    ,
    {
        text: "Which of the following property is used to add or subtract space between the letters that make up a word?",
        answers: [
            { text: "1. word-spacing", correct: false },
            { text: "2. direction", correct: false },
            { text: "3. letter-spacing", correct: true },
            { text: "4. color", correct: false },

        ]
    }
];

//varibles to get hold of the nodes
var scoreEl = document.getElementById("high-score"); //for score
var timerEl = document.getElementById("timer")       //for timer
var welcomeEl = document.getElementById("welcome");      // div for main display excluding timer and score
var gameDisplayEl = document.getElementById("game");
var finalScoreEl = document.getElementById("finalScore");
var selectedAnswerEl = document.getElementById("selectedAnswer");
//var messageEl = document.getElementById("message-container");
//initial setup
var time = 60;
var gameTimer;
var currentQuestionIndex = 0;
var score = 0;
setUp();
//Display startGame
function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    hideWelcomeScreen();
    showGameScreen();
    hideFinalScoreScreen();
    Timer();
    listQuestion();
}
//========================================welcomecome screen============================
function createH2El() {
    var h2El = document.createElement("h2");
    h2El.textContent = "Welcome to code quiz game";
    // displayEl.appendChild(h2El);
    return h2El;
}
function createInfoParagraph() {
    var pEl = document.createElement("p");         //info of game
    pEl.textContent = "The game has 10 questions and you have 60 seconds to complete the game. If the wrong answers is selected you will loose 5 secs of the clock. The game when the clock runs out or the there are no more question.Click START button to play the game. Have fun!";
    //displayEl.appendChild(pEl);
    return pEl;
}
function createStartBtn() {
    var btnEl = document.createElement("button")   //to start the game
    btnEl.setAttribute("id", "start");
    //text contents of the corresponding tags
    btnEl.textContent = "START";
    //inside-box (h2, p and start button)  
    btnEl.addEventListener("click", startGame);
    //btnEl.addEventListener("click", Timer);
    // displayEl.appendChild(btnEl);
    return btnEl;
}
function createWelcomeScreen() {

    var welcomeScreen = document.createElement("div");
    var welcomeHeader = createH2El();
    var infoPara = createInfoParagraph();
    var startBtn = createStartBtn();
    welcomeScreen.appendChild(welcomeHeader)
    welcomeScreen.appendChild(infoPara)
    welcomeScreen.appendChild(startBtn)
    return welcomeScreen;
}

//================================timer for the game=========================
function Timer() {
    gameTimer = setInterval(function () {
        timerEl.textContent = "Time Left: " + time;
        time--;
        if (time < 1) {
            endGame();
        }
    }, 1000);
}
//list question function
function listQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
        return endGame();
    }
    var questionDiv = createQuestion(currentQuestion);
    gameDisplayEl.appendChild(questionDiv);
   // checkAnswer();
}
//============================crate Question=========================
function createQuestion(currentQuestion) {
    var divQuestion = document.createElement("div");
    divQuestion.setAttribute("id", "question");
    var questionHead = document.createElement("h2");
    questionHead.setAttribute("id", "question-head");
    questionHead.textContent = currentQuestion.text;
    divQuestion.appendChild(questionHead);
    var answerList = document.createElement("div");
    answerList.setAttribute("id", "ans-list");
    for (var i = 0; i < currentQuestion.answers.length; i++) {
        var btn = document.createElement("button");
        btn.setAttribute("id", "btn" + [i]);
        btn.textContent = btn.textContent + currentQuestion.answers[i].text;
        if (currentQuestion.answers[i].correct) {
            btn.setAttribute("class", "true");
        }
        answerList.appendChild(btn);
    }
    divQuestion.appendChild(answerList);
    divQuestion.addEventListener("click", function (event) {
        event.preventDefault();

        checkAnswer(event.target);

        if (currentQuestionIndex < questions.length) {
            currentQuestionIndex++;
            clearGamePanel();            
            listQuestion();
            
        } else {
            finalScoreDisp();
        }
    });
    return divQuestion;
}
//=================clearGamPanel==================

function clearGamePanel() {
    gameDisplayEl.innerHTML = "";

}
//check the answer
function checkAnswer(target) {
   // gameDisplayEl.appendChild(selectedAnswerEl);
    if (target.hasAttribute("class", "true")) {
        // alert("CORRECT!");
        selectedAnswerEl.innerHTML = "Correct!"
        score++;
        // scoreEl.textContent = "Score: " + score;
    }
    else {
        //alert("WRONG!")
        selectedAnswerEl
            .innerHTML = "Wrong!";
        time -= 5;
    }
    setTimeout(()=>{
        selectedAnswerEl.innerHTML = "";
    },1000);
}

//end game function
function endGame() {
    clearInterval(gameTimer);
    finalScore();
}

//to display final score
function finalScore() {
    //alert(scoreEl.textContent);
    showFinalScoreScreen();
    hideGameScreen();
    hideWelcomeScreen();
    var doneDiv = document.createElement("div");
    var allDone = document.createElement("h2");
    allDone.textContent = "ALL DONE!"
    var finalScoreDisp = document.createElement("p");
    finalScoreDisp.textContent = "Your final score: " + score;
    var formSubmit = document.createElement("form");
    formSubmit.setAttribute("method", "POST");
    var inputNameField = document.createElement("label");
    inputNameField.textContent = "Your Initial:"
    var inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    var submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    doneDiv.appendChild(allDone);
    doneDiv.appendChild(finalScoreDisp);
    formSubmit.appendChild(inputNameField);
    formSubmit.appendChild(inputName);
    formSubmit.appendChild(submitBtn);
    doneDiv.appendChild(formSubmit);
    finalScoreEl.appendChild(doneDiv)
    submitBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var lastuserScore = inputName.value + " - " + score;
        localStorage.setItem("user", JSON.stringify(inputName.value + "-" + score));
        finalScoreEl.innerHTML = "";
        var highScoreDiv = document.createElement("div");
        highScoreDiv.setAttribute("id", "high-score");
        highScore = document.createElement("h2");
        highScore.textContent = "High Scores";
        highScoreDiv.appendChild(highScore);
        var scoreList = document.createElement("label");
        //set new submission
        var lastuser = JSON.parse(localStorage.getItem("user"));
        highScoreDiv.appendChild(scoreList);
        scoreList.textContent = lastuser;
        var goBackBtn = document.createElement("button");
        goBackBtn.textContent = "Go Back";
        var clearScore = document.createElement("button");
        clearScore.textContent = "Clear highscores";
        clearScore.addEventListener("click", function (e) {
            e.preventDefault();
            scoreList.textContent = "";
            showFinalScoreScreen();
        });
        goBackBtn.addEventListener("click", function (e) {
            e.preventDefault();
            clearGamePanel();
            hideFinalScoreScreen();
            showWelcomeScreen();
        });
        scoreEl.addEventListener("click", function (e) {
            e.preventDefault();
            scoreList.textContent = lastuser;
        });
        highScoreDiv.appendChild(goBackBtn);
        highScoreDiv.appendChild(clearScore);
        finalScoreEl.appendChild(highScoreDiv);

    });
}
scoreEl.addEventListener("click", function () {
    var lastuser = JSON.parse(localStorage.getItem("user"));
    scoreEl.textContent = lastuser;
})
function showWelcomeScreen() {
    welcomeEl.style.display = "block";
}
function hideWelcomeScreen() {
    welcomeEl.style.display = "none";
}
function showGameScreen() {
    gameDisplayEl.style.display = "block";
}
function hideGameScreen() {
    gameDisplayEl.style.display = "none";
}
function hideFinalScoreScreen() {
    finalScoreEl.style.display = "none";
}
function showFinalScoreScreen() {
    finalScoreEl.style.display = "block";
}

function setUp() {
    var welcomeScreen = createWelcomeScreen();
    welcomeEl.appendChild(welcomeScreen);
    hideGameScreen();
    hideFinalScoreScreen();
}


