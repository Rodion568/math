const questions = [
    {
        question: "Вычисли:<br>а) 45 – 23 = ?",
        answers: [
            "21",
            "22",
            "23",
            "24"
        ],
        correct: 1,
        explanation: "45 - 23 = 22."
    },
    {
        question: "Вычисли:<br>б) 100 – 37 = ?",
        answers: [
            "53",
            "63",
            "73",
            "67"
        ],
        correct: 1,
        explanation: "100 - 37 = 63."
    },
    {
        question: "Заполни таблицу квадратов: Что является квадратом числа 3?",
        answers: [
            "6",
            "9",
            "12",
            "16"
        ],
        correct: 1,
        explanation: "Квадрат числа 3 равен 3 * 3 = 9."
    },
    {
        question: "Заполни таблицу квадратов: Что является квадратом числа 5?",
        answers: [
            "10",
            "15",
            "20",
            "25"
        ],
        correct: 3,
        explanation: "Квадрат числа 5 равен 5 * 5 = 25."
    },
    {
        question: "Реши пример: 12 × 3 = ?",
        answers: [
            "24",
            "36",
            "48",
            "15"
        ],
        correct: 1,
        explanation: "12 * 3 = 36."
    },
    {
        question: "Реши пример: 5 × 8 = ?",
        answers: [
            "30",
            "35",
            "40",
            "45"
        ],
        correct: 2,
        explanation: "5 * 8 = 40."
    },
    {
        question: "Найди корень из полного квадрата: √16 = ?",
        answers: [
            "2",
            "3",
            "4",
            "8"
        ],
        correct: 2,
        explanation: "Корень из 16 равен 4, потому что 4 * 4 = 16."
    },
    {
        question: "Найди корень из полного квадрата: √25 = ?",
        answers: [
            "3",
            "4",
            "5",
            "10"
        ],
        correct: 2,
        explanation: "Корень из 25 равен 5, потому что 5 * 5 = 25."
    },
    {
        question: "Вычисли: 63 – 28 = ?",
        answers: [
            "25",
            "35",
            "45",
            "33"
        ],
        correct: 1,
        explanation: "63 - 28 = 35."
    },
    {
        question: "Задача: В классе 15 парт. Убрали 7 парт. Сколько парт осталось?",
        answers: [
            "6 парт",
            "7 парт",
            "8 парт",
            "9 парт"
        ],
        correct: 2,
        explanation: "15 - 7 = 8 парт осталось."
    },
    {
        question: "Вставь пропущенное число: 3² + ? = 13",
        answers: [
            "2",
            "3",
            "4",
            "5"
        ],
        correct: 2,
        explanation: "3² = 9. Чтобы получить 13, нужно добавить 4 (9 + 4 = 13)."
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