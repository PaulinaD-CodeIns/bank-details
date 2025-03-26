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
    { question: "Who was the first pharaoh of Egypt?", options: ["Narmer", "Tutankhamun", "Cleopatra", "Ramses II"], correctAnswer: "Narmer" },
    { question: "What is the capital of ancient Egypt?", options: ["Alexandria", "Cairo", "Thebes", "Memphis"], correctAnswer: "Thebes" },
    { question: "Which pyramid is the largest?", options: ["Pyramid of Djoser", "Great Pyramid of Giza", "Pyramid of Khafre", "Pyramid of Amenemhat II"], correctAnswer: "Great Pyramid of Giza" },
    { question: "What did Egyptians use to write?", options: ["Hieroglyphs", "Latin", "Greek", "Sanskrit"], correctAnswer: "Hieroglyphs" },
    { question: "Which goddess was associated with motherhood and fertility?", options: ["Isis", "Hathor", "Bastet", "Sekhmet"], correctAnswer: "Isis" },
    { question: "What was the main purpose of the pyramids?", options: ["Tombs", "Temples", "Storage", "Palaces"], correctAnswer: "Tombs" },
    { question: "Who is known as the Sun God?", options: ["Osiris", "Horus", "Ra", "Set"], correctAnswer: "Ra" },
    { question: "Which Pharaoh's tomb was discovered in 1922?", options: ["Ramses II", "Tutankhamun", "Cleopatra", "Akhenaten"], correctAnswer: "Tutankhamun" },
    { question: "What river was central to the development of Egypt?", options: ["Amazon", "Yangtze", "Nile", "Ganges"], correctAnswer: "Nile" },
    { question: "What is the name of the ancient Egyptian sunken city discovered underwater?", options: ["Heracleion", "Atlantis", "Giza", "Amarna"], correctAnswer: "Heracleion" }
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
    timeRemaining = 120;
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
    alert(`Congratulations ${finalUsername}! Your score is ${score} out of ${questions.length}! Time taken: ${Math.floor((120 - timeRemaining) / 60)} minutes and ${(120 - timeRemaining) % 60} seconds.`);

    
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
