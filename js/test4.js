const questions = [
    {
        question: "Найди корень: √36 = ?",
        answers: [
            "4",
            "5",
            "6",
            "7"
        ],
        correct: 2,
        explanation: "√36 = 6, потому что 6 × 6 = 36."
    },
    {
        question: "Найди корень: √64 = ?",
        answers: [
            "7",
            "8",
            "9",
            "10"
        ],
        correct: 1,
        explanation: "√64 = 8, потому что 8 × 8 = 64."
    },
    {
        question: "Найди корень: √169 = ?",
        answers: [
            "11",
            "12",
            "13",
            "14"
        ],
        correct: 2,
        explanation: "√169 = 13, потому что 13 × 13 = 169."
    },
    {
        question: "Задача: Квадратный участок имеет площадь 81 м². Чему равна длина его стороны?",
        answers: [
            "7 м",
            "8 м",
            "9 м",
            "10 м"
        ],
        correct: 2,
        explanation: "Для квадратного участка длина стороны равна корню из площади. √81 = 9 м."
    },
    {
        question: "Вычисли: √25 = ?",
        answers: [
            "4",
            "5",
            "6",
            "7"
        ],
        correct: 1,
        explanation: "√25 = 5, потому что 5 × 5 = 25."
    },
    {
        question: "Вычисли: √144 = ?",
        answers: [
            "10",
            "11",
            "12",
            "13"
        ],
        correct: 2,
        explanation: "√144 = 12, потому что 12 × 12 = 144."
    },
    {
        question: "Вычисли: √30 ≈ ? (Укажи два ближайших целых числа)",
        answers: [
            "4 и 5",
            "5 и 6",
            "6 и 7",
            "7 и 8"
        ],
        correct: 1,
        explanation: "√25 = 5 и √36 = 6. Так как 30 находится между 25 и 36, √30 находится между 5 и 6. (Точное значение ≈ 5.477)."
    }
];

const questionsContainer = document.getElementById('questions-container');
const submitBtn = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const answersFeedback = document.getElementById('answers-feedback');

// Создаем вопросы на странице
function createQuestions() {
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.dataset.index = index;

        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.innerHTML = `${index + 1}. ${q.question}`;
        questionDiv.appendChild(questionText);

        const answersDiv = document.createElement('div');
        answersDiv.className = 'answers';

        q.answers.forEach((answer, answerIndex) => {
            const answerBtn = document.createElement('button');
            answerBtn.className = 'answer-btn';
            answerBtn.innerHTML = answer;
            answerBtn.dataset.answerIndex = answerIndex;

            answerBtn.addEventListener('click', function () {
                // Удаляем выделение у всех кнопок этого вопроса
                const allBtns = this.parentElement.querySelectorAll('.answer-btn');
                allBtns.forEach(btn => btn.classList.remove('selected'));

                // Выделяем выбранную кнопку
                this.classList.add('selected');

                // Сохраняем ответ
                questions[index].userAnswer = answerIndex;
            });

            answersDiv.appendChild(answerBtn);
        });

        questionDiv.appendChild(answersDiv);
        questionsContainer.appendChild(questionDiv);
    });

    totalQuestionsElement.textContent = questions.length;
}

// Проверка результатов
function checkAnswers() {
    let correctCount = 0;
    let feedbackHTML = '';

    questions.forEach((q, index) => {
        const isCorrect = q.userAnswer === q.correct;
        if (isCorrect) correctCount++;

        feedbackHTML += `
                    <div class="question-feedback" style="margin-bottom: 20px; text-align: left;">
                        <p><strong>Вопрос ${index + 1}:</strong> ${q.question}</p>
                        <p>Ваш ответ: <span style="color: ${isCorrect ? '#27ae60' : '#e74c3c'}">${q.answers[q.userAnswer] || 'Нет ответа'}</span></p>
                        ${!isCorrect ? `<p class="correct-answer">Правильный ответ: ${q.answers[q.correct]}</p>` : ''}
                        <p>${q.explanation}</p>
                    </div>
                `;
    });

    scoreElement.textContent = correctCount;
    answersFeedback.innerHTML = feedbackHTML;
    resultContainer.style.display = 'block';

    // Прокручиваем к результатам
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}

// Инициализация теста
createQuestions();

// Обработчик кнопки проверки
submitBtn.addEventListener('click', checkAnswers);

// Рендеринг математических формул
document.addEventListener('DOMContentLoaded', function () {
    if (typeof renderMathInElement === 'function') {
        renderMathInElement(document.body, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '\\(', right: '\\)', display: false },
                { left: '\\[', right: '\\]', display: true }
            ],
            throwOnError: false
        });
    }
});