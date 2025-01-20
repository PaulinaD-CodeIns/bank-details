window.onload = function() {
    console.log("Welcome!");
};

const startButton = document.getElementById('start-button');
startButton.addEventListener('onclick', StartQuiz); 
    
function StartQuiz() {
    console.log('Game Started');
    startButton.classList.add('hide');
}


function SetNextQuestion() {

}

function selectAnswer() {

}