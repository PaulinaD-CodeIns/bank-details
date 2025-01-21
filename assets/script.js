window.onload = function() {
    console.log("Welcome to the Quiz!");
};

// Main body variables //
let startButton = document.getElementById('start-button');
let quizContainer = document.getElementById('quiz-container');
let questionsDiv = document.getElementById('questions');
let answerButtons = document.getElementById('answer-buttons');
let nextButton = document.getElementById('next-button');

let currentQuestionIndex = 0;
let score = 0;
let username = "";

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
    console.log("Game Started!"); // Debugging //

    let username;
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
    questionsDiv.classList.remove('hide');
    answerButtons.classList.remove('hide');
    nextButton.classList.remove('hide');

    shuffledQuestions = shuffleQuestions(questions);
    score = 0;
    currentQuestionIndex = 0;

    
    timeRemaining = 120;
    startTimer(); // Start the timer //

    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Start the timer when the quiz starts //
function startTimer() {
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
}

function displayTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerElement.textContent = `Time Remaining: ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Reset the timer //
function resetTimer() {
    clearInterval(timerInterval); // Stop the timer if it's running
    displayTime(timeRemaining); // Display the initial time (120 seconds)
}

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
    } else {
        clearInterval(timerInterval); // Stop the timer after the last question is answered
        endQuiz(); // Call endQuiz when the last question is answered
    }
}

// End of Quiz //
function endQuiz() {
    // Show the time taken for the quiz
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

    timeRemaining = 120; // Reset the timer to 2 minutes
    resetTimer(); // Reset the timer display
    startTimer(); // Start the timer 


    for (let i = 0; i < 4; i++) {
        const button = answerButtons.children[i];
        button.style.backgroundColor = '';
        button.disabled = false;
    }

    nextButton.classList.add('hide');
}
