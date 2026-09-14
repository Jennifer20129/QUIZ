const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyperlinks Text Mark Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },
    {
        question: "Which language is used to style a webpage?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "JavaScript", correct: false },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "Which language makes webpages interactive?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: true },
            { text: "SQL", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Creative Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Computer Style System", correct: false },
            { text: "Colorful Style Sheets", correct: false }
        ]
    },
    {
        question: "What does DOM stand for?",
        answers: [
            { text: "Document Object Model", correct: true },
            { text: "Data Object Management", correct: false },
            { text: "Display Output Method", correct: false },
            { text: "Digital Ordering Module", correct: false }
        ]
    },
    {
        question: "Which symbol is used for CSS class selectors?",
        answers: [
            { text: "#", correct: false },
            { text: ".", correct: true },
            { text: "*", correct: false },
            { text: "&", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to link an external CSS file?",
        answers: [
            { text: "<style>", correct: false },
            { text: "<script>", correct: false },
            { text: "<link>", correct: true },
            { text: "<css>", correct: false }
        ]
    },
    {
        question: "What does the 'flex' value do when set on the CSS 'display' property?",
        answers: [
            { text: "Makes text bold", correct: false },
            { text: "Enables flexible box layout for children", correct: true },
            { text: "Hides the element", correct: false },
            { text: "Adds a border", correct: false }
        ]
    },
    {
        question: "Which method adds an event listener in JavaScript?",
        answers: [
            { text: "addEventListener()", correct: true },
            { text: "attachEvent()", correct: false },
            { text: "bindEvent()", correct: false },
            { text: "onEvent()", correct: false }
        ]
    },
    {
        question: "What does 'responsive design' refer to?",
        answers: [
            { text: "A website that loads quickly", correct: false },
            { text: "A website that adapts to different screen sizes", correct: true },
            { text: "A website with animations", correct: false },
            { text: "A website with a chatbot", correct: false }
        ]
    },
    {
        question: "Which CSS property controls the space between an element's border and its content?",
        answers: [
            { text: "margin", correct: false },
            { text: "padding", correct: true },
            { text: "spacing", correct: false },
            { text: "gap", correct: false }
        ]
    },
    {
        question: "What is the correct file extension for JavaScript files?",
        answers: [
            { text: ".java", correct: false },
            { text: ".js", correct: true },
            { text: ".jsx", correct: false },
            { text: ".javas", correct: false }
        ]
    },
    {
        question: "Which HTML attribute specifies an alternate text for an image?",
        answers: [
            { text: "title", correct: false },
            { text: "alt", correct: true },
            { text: "src", correct: false },
            { text: "desc", correct: false }
        ]
    },
    {
        question: "What does 'API' stand for?",
        answers: [
            { text: "Application Programming Interface", correct: true },
            { text: "Automated Program Instruction", correct: false },
            { text: "Applied Programming Index", correct: false },
            { text: "Advanced Protocol Integration", correct: false }
        ]
    },
    {
        question:'which is not a non-primitive data type in JavaScript?',
        answers:[
        { text:'null',correct:false},
        { text:'set',correct:true},
        { text:'undefined',correct:false},
        { text:'function',correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerBar = document.getElementById("timer-bar");
const timerText = document.getElementById("timer-text");

const TIME_PER_QUESTION = 15; // seconds

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = TIME_PER_QUESTION;
let timerInterval = null;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";

    showQuestion();
}


function showQuestion() {

    resetState();

    let currentQuestion = questions[currentQuestionIndex];

    questionElement.innerHTML =
        `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");

        button.textContent = answer.text;

        button.classList.add("answer-btn");

        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });

    startTimer();
}


function resetState() {

    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function startTimer() {
    clearInterval(timerInterval);

    timeLeft = TIME_PER_QUESTION;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}


function updateTimerDisplay() {
    const percent = (timeLeft / TIME_PER_QUESTION) * 100;
    timerBar.style.width = `${percent}%`;
    timerText.textContent = timeLeft;

    timerBar.classList.remove("warning", "danger");
    if (timeLeft <= 5) {
        timerBar.classList.add("danger");
    } else if (timeLeft <= 8) {
        timerBar.classList.add("warning");
    }
}


function handleTimeout() {
    // Reveal the correct answer and disable all buttons, no points awarded
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}


function selectAnswer(e) {

    clearInterval(timerInterval);

    const selectedButton = e.target;

    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    nextButton.style.display = "block";
}


function showScore() {

    clearInterval(timerInterval);
    resetState();

    questionElement.innerHTML =
        `You scored ${score} out of ${questions.length}! 🎉`;

    nextButton.innerHTML = "Play Again";

    nextButton.style.display = "block";
}


function handleNextButton() {

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {

        showQuestion();

    } else {

        showScore();
    }
}


nextButton.addEventListener("click", () => {

    if (currentQuestionIndex < questions.length) {

        handleNextButton();

    } else {

        startQuiz();
    }
});


startQuiz();