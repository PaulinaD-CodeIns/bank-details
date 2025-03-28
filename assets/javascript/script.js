// Main body variables //
let startButton = document.getElementById('start-button');
let quizContainer = document.getElementById('quiz-container');
let questionsDiv = document.getElementById('questions');
let answerButtons = document.getElementById('answer-buttons');
let nextButton = document.getElementById('next-button');

let currentQuestionIndex = 0;
let score = 0;
let username = "";

const usernameBox = document.getElementById('username-box');
const timerBox = document.getElementById('timer');

// Timer variables //
let timerElement = document.getElementById('timer');
let timerInterval;
let timeRemaining = 0;

startButton.addEventListener('click', StartQuiz);
nextButton.addEventListener('click', SetNextQuestion);

// Random shuffle of the questions before quiz start //
const questions = [
    { question: "At Santander, our ultimate goal is to make…", options: ["Our customers laugh", "Our customers better happen", "The bank more money", "It to the end of the day"], correctAnswer: "Our customers better happen" },
    { question: "Which current account does not come with a cheque book?", options: ["Everyday", "Edge Student", "Basic", "Choice"], correctAnswer: "Basic" },
    { question: "When is the 0% foreign conversion fee applied after opening or transferring to the Santander Edge or Santander Edge Up current account?", options: ["Immediately after opening the account", "1 working day after opening or transferring", "3 working days after opening or transferring", "7 working days after opening or transferring"], correctAnswer: "3 working days after opening or transferring" },
    { question: "With the Everyday No Balance Transfer Fee Credit Card, up to how many additional cardholders can you have?", options: ["1 additional cardholder", "Up to 3", "Up to 5", "None"], correctAnswer: "Up to 3" },
    { question: "What is the Junior ISA limit for the 2025/26 tax year, and when can deposits be made?", options: ["£8,000, from 1 April 2025", "£9,000, from 6 April 2025", "£10,000, from 6 April 2025", "£9,000, from 1 May 2026"], correctAnswer: "£9,000, from 6 April 2025" },
    { question: "What is the maximum APR Santander could offer you on any loan amount?", options: ["19.9%", "24.9%", "29.9%", "39.9%"], correctAnswer: "29.9%" },
    { question: "How much less is the online price for Santander travel insurance compared to the telephone price for Santander customers?", options: ["10%", "20%", "30%", "40%"], correctAnswer: "30%" },
    { question: "What is the range of purchase value for which you can claim a refund from Santander under Section 75 of the Consumer Credit Act?", options: ["£1 - £500", "£50 - £2,000", "£100 - £30,000", "£500 - £20,000"], correctAnswer: "£100 - £30,000" },
    { question: "On 26th of April, Janet is making her 3rd withdrawal from the Limited Access Saver. When will her rate go back up to 1.80%?", options: ["In 5 days", "In 31 days", "Whenever her settlement period begins", "In 14 days"], correctAnswer: "In 5 days" },
    { question: "How long is your unique code valid from the date of issue, and can it be re-issued once expired?", options: ["30 days, yes, it can be re-issued", "60 days, no, it cannot be re-issued", "90 days, yes, it can be re-issued", "60 days, yes, it can be re-issued"], correctAnswer: "60 days, no, it cannot be re-issued" }
];


// Shuffled random questions quiz start //
let shuffledQuestions = [];

function shuffleQuestions(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

// Start of the Quiz //
function StartQuiz() {

    //Collectes username//
    let username;
    do {
        username = prompt("Welcome to the Quiz! Please enter your branch name:");
        
        if (username === null) {
            alert("You must enter your branch name, sorry!");
        }
    } while (!username || username.trim() === "");

    localStorage.setItem("username", username);
    document.getElementById('username-box').textContent = username;

    // Change visability of elements //
    startButton.classList.add('hide');
    quizContainer.classList.remove('hide');
    questionsDiv.classList.remove('hide');
    answerButtons.classList.remove('hide');
    nextButton.classList.remove('hide');
    usernameBox.classList.remove('hide');
    timerBox.classList.remove('hide');

    shuffledQuestions = shuffleQuestions(questions);
    score = 0;
    currentQuestionIndex = 0;

    // Start the timer //
    timeRemaining = 300;
    startTimer();

    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Timer functions //
function startTimer() {
    try {
        timerInterval = setInterval(function() {
            if (timeRemaining <= 0) {
                clearInterval(timerInterval); 
                alert("Time's up! The quiz has ended.");
                endQuiz(); 
            } else {
                timeRemaining--;
                displayTime(timeRemaining); 
            }
        }, 1000);
    } catch (err) {
        console.error("Error in starting timer: ", err);
        alert("An error occurred while starting the timer. Please try again.");
    }
}


function displayTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerElement.textContent = `Time Remaining: ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Reset the timer //
function resetTimer() {
    clearInterval(timerInterval); // Stop the timer if it's running
    displayTime(timeRemaining);
}

// If Start/ Next button available, keydown becomes available //
document.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        if (!startButton.classList.contains('hide')) {
            startButton.click();
        }
        else if (!nextButton.classList.contains('hide')) {
            nextButton.click();
        }
    }
});

// Shows the shuffled question //
function showQuestion(questionObj) {
    questionsDiv.textContent = questionObj.question;

    const shuffledOptions = shuffleQuestions([...questionObj.options]);

    for (let i = 0; i < 4; i++) {
        const button = answerButtons.children[i];
        button.textContent = shuffledOptions[i];
        button.onclick = () => selectAnswer(shuffledOptions[i], questionObj.correctAnswer, button);
    }
}

// Checks the selected answer and increments the score //
function selectAnswer(selectedAnswer, correctAnswer, button) {
    if (selectedAnswer === correctAnswer) {
        button.style.backgroundColor = 'green';  // Correct answer
        score++;
    } else {
        button.style.backgroundColor = 'red';    // Incorrect answer
        for (let i = 0; i < 4; i++) {
            if (answerButtons.children[i].textContent === correctAnswer) {
                answerButtons.children[i].style.backgroundColor = 'green';
            }
        }
    }

    //Disable other buttons once answer selected //
    for (let i = 0; i < 4; i++) {
        answerButtons.children[i].disabled = true;
    }

    nextButton.classList.remove('hide');
}

// Sets the next question from shuffled questions //
function SetNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
        nextButton.classList.add('hide');
        showQuestion(shuffledQuestions[currentQuestionIndex]);

        for (let i = 0; i < 4; i++) {
            answerButtons.children[i].style.backgroundColor = '';
            answerButtons.children[i].disabled = false;
        }
    } else { // If no more questions, stop timer & end quiz //
        clearInterval(timerInterval); 
        endQuiz();
    }
}

// End of Quiz //
function endQuiz() {
    // Show the username, score & time taken for the quiz
    const finalUsername = localStorage.getItem('username');
    alert(`Congratulations ${finalUsername} team! Your score is ${score} out of ${questions.length}! Time taken: ${Math.floor((120 - timeRemaining) / 60)} minutes and ${(120 - timeRemaining) % 60} seconds.`);

    
    clearInterval(timerInterval); // Timer stops

    // Reset and hide all the elements for a fresh start
    startButton.classList.remove('hide');
    startButton.innerHTML = "Restart";
    quizContainer.classList.add('hide');
    questionsDiv.classList.add('hide');
    answerButtons.classList.add('hide');
    nextButton.classList.add('hide');
    
    questionsDiv.textContent = '';
}

// Restart of the Quiz //
startButton.addEventListener('click', RestartQuiz);

function RestartQuiz() {
    shuffledQuestions = shuffleQuestions(questions); // Re-shuffle the questions on restart to play again
    score = 0;
    currentQuestionIndex = 0;
    showQuestion(shuffledQuestions[currentQuestionIndex]);

    // Resets the timer //
    timeRemaining = 120;
    resetTimer(); 
    startTimer(); 


    for (let i = 0; i < 4; i++) {
        const button = answerButtons.children[i];
        button.style.backgroundColor = '';
        button.disabled = false;
    }

    nextButton.classList.add('hide');
}
