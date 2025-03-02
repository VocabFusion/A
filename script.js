// Vocabulary Quiz Questions
const vocabularyQuestions = [
    {
        question: "What is the synonym of 'happy'?",
        options: ['sad', 'joyful', 'angry', 'bored'],
        correctAnswer: 'joyful',
    },
    {
        question: "What is the antonym of 'love'?",
        options: ['hate', 'adore', 'enjoy', 'cherish'],
        correctAnswer: 'hate',
    },
    {
        question: "What is the synonym of 'quick'?",
        options: ['slow', 'fast', 'lazy', 'quiet'],
        correctAnswer: 'fast',
    },
    {
        question: "What is the antonym of 'strong'?",
        options: ['weak', 'powerful', 'mighty', 'heavy'],
        correctAnswer: 'weak',
    },
    // Add more questions as needed
];

// Prefix/Suffix Quiz Questions
const prefixSuffixQuestions = [
    {
        question: "What does the prefix 're-' mean?",
        options: ['again', 'before', 'after', 'under'],
        correctAnswer: 'again',
    },
    {
        question: "What does the suffix '-ly' mean?",
        options: ['in a manner', 'full of', 'not', 'having'],
        correctAnswer: 'in a manner',
    },
    {
        question: "What does the prefix 'un-' mean?",
        options: ['before', 'not', 'again', 'under'],
        correctAnswer: 'not',
    },
    {
        question: "What does the suffix '-able' mean?",
        options: ['able to', 'not', 'without', 'before'],
        correctAnswer: 'able to',
    },
    // Add more questions as needed
];

// Flashcard Questions
const flashcards = [
    { question: "What is the synonym of 'fast'?", answer: "quick" },
    { question: "What is the antonym of 'cold'?", answer: "hot" },
    { question: "What does the prefix 'pre-' mean?", answer: "before" },
    { question: "What does the suffix '-ful' mean?", answer: "full of" },
    // Add more flashcards as needed
];

let currentQuestionIndex = 0;
let currentFlashcardIndex = 0;
let correctAnswersCount = 0;
let currentQuiz = 'vocabulary'; // Tracks which quiz is currently active

// Switch between activities (vocabulary, prefix-suffix, and flashcards)
function switchActivity(activity) {
    currentQuiz = activity;
    currentQuestionIndex = 0;
    currentFlashcardIndex = 0;
    correctAnswersCount = 0;
    document.getElementById('feedback').textContent = '';
    
    // Hide the activity selection buttons
    document.getElementById('activity-buttons').style.display = 'none';
    
    // Show the appropriate quiz or flashcards container
    if (activity === 'vocabulary') {
        document.getElementById('question-container').style.display = 'block';
        document.getElementById('next-button').style.display = 'inline-block';
        loadQuestion(vocabularyQuestions);
    } else if (activity === 'prefix-suffix') {
        document.getElementById('question-container').style.display = 'block';
        document.getElementById('next-button').style.display = 'inline-block';
        loadQuestion(prefixSuffixQuestions);
    } else if (activity === 'flashcards') {
        document.getElementById('flashcards-container').style.display = 'block';
        loadFlashcard();
    }
}

// Load a new question for the selected quiz
function loadQuestion(questions) {
    const question = questions[currentQuestionIndex];
    const questionContainer = document.getElementById('question');
    const answerContainer = document.getElementById('answer-container');
    const feedback = document.getElementById('feedback');
    
    questionContainer.textContent = question.question;
    answerContainer.innerHTML = '';

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = function() {
            checkAnswer(option, questions);
        };
        answerContainer.appendChild(button);
    });

    feedback.textContent = ''; // Reset feedback
}

// Check the selected answer
function checkAnswer(selectedOption, questions) {
    const question = questions[currentQuestionIndex];
    const feedback = document.getElementById('feedback');

    if (selectedOption === question.correctAnswer) {
        correctAnswersCount++;
        feedback.textContent = 'Correct! Great job.';
        feedback.style.color = '#28a745';
    } else {
        feedback.textContent = `Wrong! The correct answer was "${question.correctAnswer}".`;
        feedback.style.color = '#d9534f';
    }

    // Disable further answer selections for this question
    const buttons = document.querySelectorAll('#answer-container button');
    buttons.forEach(button => button.disabled = true);
}

// Move to the next question
function nextQuestion() {
    const questions = currentQuiz === 'vocabulary' ? vocabularyQuestions : prefixSuffixQuestions;

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion(questions);
    } else {
        showScore();
    }
}

// Show score after all questions are completed
function showScore() {
    const feedback = document.getElementById('feedback');
    feedback.textContent = `You answered ${correctAnswersCount} out of ${currentQuiz === 'vocabulary' ? vocabularyQuestions.length : prefixSuffixQuestions.length} questions correctly!`;
    feedback.style.color = '#007bff';
    
    // Hide the question and answer section
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('next-button').style.display = 'none';
    
    // Show the activity buttons again after the quiz is finished
    document.getElementById('activity-buttons').style.display = 'block';
}

// Flashcard Functions
function loadFlashcard() {
    const flashcard = flashcards[currentFlashcardIndex];
    const flashcardContent = document.getElementById('flashcard-content');
    const feedback = document.getElementById('flashcard-feedback');
    
    flashcardContent.textContent = flashcard.question;
    document.getElementById('submit-answer').style.display = 'inline-block';
    document.getElementById('next-card-button').style.display = 'none';
    feedback.textContent = ''; // Reset feedback
}

function submitFlashcardAnswer() {
    const flashcard = flashcards[currentFlashcardIndex];
    const userAnswer = document.getElementById('flashcard-answer').value.trim().toLowerCase();
    const feedback = document.getElementById('flashcard-feedback');

    if (userAnswer === flashcard.answer.toLowerCase()) {
        feedback.textContent = "Correct! Great job!";
        feedback.style.color = '#28a745';
        correctAnswersCount++;
    } else {
        feedback.textContent = `Wrong! The correct answer was "${flashcard.answer}".`;
        feedback.style.color = '#d9534f';
    }

    document.getElementById('submit-answer').style.display = 'none';
    document.getElementById('next-card-button').style.display = 'inline-block';
}

// Move to the next flashcard
function nextFlashcard() {
    currentFlashcardIndex++;
    document.getElementById('flashcard-answer').value = ''; // Reset the input field

    if (currentFlashcardIndex < flashcards.length) {
        loadFlashcard();
    } else {
        showFlashcardScore();
    }
}

function showFlashcardScore() {
    const flashcardContent = document.getElementById('flashcard-content');
    flashcardContent.textContent = `You have completed the flashcards!`;
    document.getElementById('submit-answer').style.display = 'none';
    document.getElementById('next-card-button').style.display = 'none';
    document.getElementById('activity-buttons').style.display = 'block';
}

// Initialize with the vocabulary quiz
switchActivity('vocabulary');
