const questions = [
    {
        question: "Вычисли: 14 × 12 = ?",
        answers: [
            "154",
            "168",
            "172",
            "180"
        ],
        correct: 1,
        explanation: "14 × 12 = 168."
    },
    {
        question: "Вычисли: 25 × 18 = ?",
        answers: [
            "350",
            "400",
            "425",
            "450"
        ],
        correct: 3,
        explanation: "25 × 18 = 450."
    },
    {
        question: "Задача: В классе 15 рядов по 12 парт. Сколько всего парт?",
        answers: [
            "150 парт",
            "160 парт",
            "170 парт",
            "180 парт"
        ],
        correct: 3,
        explanation: "Чтобы найти общее количество парт, нужно умножить количество рядов на количество парт в каждом ряду: 15 × 12 = 180 парт."
    },
    {
        question: "Вычисли: 13 × 14 = ?",
        answers: [
            "172",
            "182",
            "196",
            "208"
        ],
        correct: 1,
        explanation: "13 × 14 = 182."
    },
    {
        question: "Вычисли: 22 × 19 = ?",
        answers: [
            "398",
            "408",
            "418",
            "428"
        ],
        correct: 2,
        explanation: "22 × 19 = 418."
    },
    {
        question: "Вычисли: 35 × 24 = ?",
        answers: [
            "740",
            "800",
            "840",
            "900"
        ],
        correct: 2,
        explanation: "35 × 24 = 840."
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