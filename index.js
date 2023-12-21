const questions = [
    {
        question :"Which is the largest animal in the world ?",
        answers: [
            {Text:"Shark", correct:false},
            {Text:"Elephant", correct:false},
            {Text:"Blue Whale", correct:true},
            {Text:"Giraffe", correct:false},
        ]
    },
    {
        question :"Which is the largest Continent in the world ?",
        answers: [
            {Text:"Europe", correct:false},
            {Text:"Asia", correct:true},
            {Text:"Oceania", correct:false},
            {Text:"North America", correct:false},
        ]
    },
    {
        question :"Which is the smallest Continent in the world ?",
        answers: [
            {Text:"Europe", correct:false},
            {Text:"Asia", correct:false},
            {Text:"Oceania", correct:true},
            {Text:"North America", correct:false},
        ]
    },
    {
        question :"Which is the largest Economy in the world ?",
        answers: [
            {Text:"India", correct:false},
            {Text:"China", correct:false},
            {Text:"America", correct:true},
            {Text:"Germany", correct:false},
        ]
    },
    {
        question :"Which is the largest Democracy in the world ?",
        answers: [
            {Text:"India", correct:true},
            {Text:"China", correct:false},
            {Text:"America", correct:false},
            {Text:"England", correct:false},
        ]
    },
    {
        question :"Which is the largest Country in the world ?",
        answers: [
            {Text:"America", correct:false},
            {Text:"China", correct:false},
            {Text:"Russia", correct:true},
            {Text:"Canada", correct:false},
        ]
    },
    {
        question :"Which is the smallest Country in the world ?",
        answers: [
            {Text:"Nepal", correct:false},
            {Text:"Vatican-City", correct:true},
            {Text:"Sweden", correct:false},
            {Text:"Singapore", correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

console.log(answerButtons.children);

function startQuiz(){
    currentQuestionIndex =0;
    score =0;
    nextButton.innerHTML ="Next";
    showQuestion();
}

function showQuestion(){
    resetState(); //  to reset previous question and answer;
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;   // currentQuestion.question : gives only question from currentquestion object

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Attempt again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex ++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();