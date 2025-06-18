const questions = [
    {
        question: "Вычисли с заёмом: 503 – 267 = ?",
        answers: [
            "234",
            "235",
            "236",
            "246"
        ],
        correct: 2,
        explanation: "503 - 267 = 236."
    },
    {
        question: "Вычисли с заёмом: 842 – 359 = ?",
        answers: [
            "481",
            "482",
            "483",
            "493"
        ],
        correct: 2,
        explanation: "842 - 359 = 483."
    },
    {
        question: "Возведи в квадрат: 12² = ?",
        answers: [
            "124",
            "134",
            "144",
            "154"
        ],
        correct: 2,
        explanation: "12² = 12 × 12 = 144."
    },
    {
        question: "Возведи в квадрат: 15² = ?",
        answers: [
            "215",
            "220",
            "225",
            "235"
        ],
        correct: 2,
        explanation: "15² = 15 × 15 = 225."
    },
    {
        question: "Умножь двузначные числа: 13 × 14 = ?",
        answers: [
            "172",
            "182",
            "192",
            "162"
        ],
        correct: 1,
        explanation: "13 × 14 = 182."
    },
    {
        question: "Умножь двузначные числа: 25 × 11 = ?",
        answers: [
            "265",
            "275",
            "285",
            "255"
        ],
        correct: 1,
        explanation: "25 × 11 = 275."
    },
    {
        question: "Найди корень: √144 = ?",
        answers: [
            "11",
            "12",
            "13",
            "14"
        ],
        correct: 1,
        explanation: "Корень из 144 равен 12, потому что 12 × 12 = 144."
    },
    {
        question: "Найди корень: √81 = ?",
        answers: [
            "7",
            "8",
            "9",
            "10"
        ],
        correct: 2,
        explanation: "Корень из 81 равен 9, потому что 9 × 9 = 81."
    },
    {
        question: "Задача: Участок земли имеет площадь 169 м². Чему равна длина его стороны, если участок квадратный?",
        answers: [
            "12 м",
            "13 м",
            "14 м",
            "15 м"
        ],
        correct: 1,
        explanation: "Для квадратного участка, длина стороны равна корню из площади. √169 = 13 м."
    },
    {
        question: "Вычисли приближённо: √50 ≈ ? (Укажи два ближайших целых числа)",
        answers: [
            "6 и 7",
            "7 и 8",
            "8 и 9",
            "9 и 10"
        ],
        correct: 1,
        explanation: "7² = 49, 8² = 64. Так как 50 находится между 49 и 64, √50 находится между 7 и 8."
    },
    {
        question: "Восстанови пример: ? × 12 = 144",
        answers: [
            "11",
            "12",
            "13",
            "14"
        ],
        correct: 1,
        explanation: "Чтобы найти пропущенное число, разделите 144 на 12. 144 ÷ 12 = 12."
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