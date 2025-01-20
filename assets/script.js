window.onload = function() {
    console.log("Welcome to the Quiz!");
};


let startButton = document.getElementById('start-button');
let quizContainer = document.getElementById('quiz-container');
let questions = document.getElementById('questions');
let answerButtons = document.getElementById('answer-buttons');
let nextButton = document.getElementById('next-button');

    startButton.addEventListener('click', StartQuiz);


function StartQuiz() {
    console.log("Game Started!");
    let username 
    do {
        username = prompt("Welcome to the Quiz! Please enter your username:");
        
        if (username === null) {
            alert("You must enter a username to continue, sorry!");
        }
    } while (!username || username.trim() === "");
    
    console.log("Username: " + username);
    localStorage.setItem("username", username);
    


    startButton.classList.add('hide');
    quizContainer.classList.remove('hide');
    questions.classList.remove('hide');
    answerButtons.classList.remove('hide');
    nextButton.classList.remove('hide');

    SetNextQuestion();
}

function SetNextQuestion() {

}

function selectAnswer() {

}