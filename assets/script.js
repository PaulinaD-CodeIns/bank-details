window.onload = function() {
    console.log("Welcome to the Quiz!");
};


let startButton = document.getElementById('start-button');
let quizContainer = document.getElementById('quiz-container');
let questionsDiv = document.getElementById('questions');
let answerButtons = document.getElementById('answer-buttons');
let nextButton = document.getElementById('next-button');

let currentQuestionIndex = 0;
let score = 0;
let username = "";


startButton.addEventListener('click', StartQuiz);
nextButton.addEventListener('click', SetNextQuestion);

//Random shuffle of the questions before quiz start//

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

function shuffleQuestions(questions) {
    shuffledQuestions = [...questions];
    return questions.sort(() => Math.random() - 0.5);
}


// Start of the Quiz //
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
    questionsDiv.classList.remove('hide');
    answerButtons.classList.remove('hide');
    nextButton.classList.remove('hide');

    const shuffledQuestions = shuffleQuestions(questions);
    score = 0;
    currentQuestionIndex = 0;
    
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

//Shows the shuffled question //
function showQuestion(questionObj) {
    questionsDiv.textContent = questionObj.question;
    
    
    const shuffledOptions = shuffleQuestions(questionObj.options);
    for (let i = 0; i < 4; i++) {
        const button = answerButtons.children[i];
        button.textContent = shuffledOptions[i];
        button.onclick = () => selectAnswer(shuffledOptions[i], questionObj.correctAnswer, button);
    }
}


//Checks the selected answer and increments the score //
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


// Sets next question from shuffled cards //
function SetNextQuestion() {
   
    
    currentQuestionIndex++;


    if (currentQuestionIndex < shuffledQuestions.length) {
        nextButton.classList.add('hide'); 
        showQuestion(shuffledQuestions[currentQuestionIndex]);

        
        for (let i = 0; i < 4; i++) {
            answerButtons.children[i].style.backgroundColor = ''; 
            answerButtons.children[i].disabled = false;
        }
    } else { // Displays username and results and allows for the option to restart the quiz //

        const finalUsername = localStorage.getItem('username');
        alert(`Congratulations ${finalUsername}! Your score is ${score} out of ${questions.length}!`);

        startButton.classList.remove('hide');
        startButton.innerHTML = "Restart";
        quizContainer.classList.add('hide');
        questionsDiv.classList.add('hide');
        answerButtons.classList.add('hide');
        nextButton.classList.add('hide');
        
        questionsDiv.textContent = '';

    }
}

startButton.addEventListener('click', RestartQuiz);

function RestartQuiz() {
    for (let i = 0; i < 4; i++) {
            const button = answerButtons.children[i];
            button.style.backgroundColor = '';
            button.disabled = false;
        }
    }

    


