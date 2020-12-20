const question = document.querySelector('#question');
const qSound=document.querySelector('#Qsound');
const choices = Array.from(document.querySelectorAll('.choice-img'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions =[
    {
        "question": "What is green?",
        "qSound":"Sources/QuestionAudio/q1.mp3",
        "choice1": "Sources/q1/1.png",
        "choice2": "Sources/q1/2.png",
        "choice3": "Sources/q1/3.png",
        "answer": 2
    },
    {
        "question":
            "What is yellow?",
            "qSound":"Sources/QuestionAudio/q2.mp3",
        "choice1": "Sources/q2/1.png",
        "choice2": "Sources/q2/2.png",
        "choice3": "Sources/q2/3.png",
        "answer": 1
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = questions.length

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    qSound.src = currentQuestion.qSound;

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.src = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
            document.getElementById('CorrectS').play();
        }
        else{
            document.getElementById('WrongS').play();
        }

        selectedChoice.parentElement.querySelector('.'+classToApply).style.display= 'block';
        
        //selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.querySelector('.'+classToApply).style.display= 'none';
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()