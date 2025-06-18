const questions = [
    {
        question: "Вычисли: 1000 – 543 + 217 = ?",
        answers: [
            "673",
            "674",
            "675",
            "676"
        ],
        correct: 1,
        explanation: "1000 – 543 = 457. Затем 457 + 217 = 674."
    },
    {
        question: "Вычисли: (256 – 189) × 2 = ?",
        answers: [
            "132",
            "134",
            "136",
            "138"
        ],
        correct: 1,
        explanation: "Сначала 256 – 189 = 67. Затем 67 × 2 = 134."
    },
    {
        question: "Умножь трёхзначные числа: 123 × 45 = ?",
        answers: [
            "5435",
            "5535",
            "5635",
            "5735"
        ],
        correct: 1,
        explanation: "123 × 45 = 5535."
    },
    {
        question: "Найди корень с точностью до десятых: √20 ≈ ?",
        answers: [
            "4.3",
            "4.4",
            "4.5",
            "4.6"
        ],
        correct: 3, // Changed to 3 because 4.47 is closer to 4.5. If strict rounding to one decimal: 4.47 -> 4.5
        explanation: "√16 = 4 и √25 = 5. √20 находится между ними. Точное значение √20 ≈ 4.472, что округляется до 4.5."
    },
    {
        question: "Задача: Квадратный сад и прямоугольный огород имеют одинаковую площадь (64 м²). Длина огорода 16 м. Чему равна ширина огорода?",
        answers: [
            "3 м",
            "4 м",
            "5 м",
            "6 м"
        ],
        correct: 1,
        explanation: "Площадь прямоугольника = длина × ширина. Значит, ширина = Площадь / длина = 64 м² / 16 м = 4 м."
    },
    {
        question: "Вставь пропущенное число: ?² = 625",
        answers: [
            "15",
            "20",
            "25",
            "30"
        ],
        correct: 2,
        explanation: "Квадрат 25 равен 625 (25 × 25 = 625)."
    },
    {
        question: "Вставь пропущенное число: √? = 7",
        answers: [
            "36",
            "42",
            "49",
            "56"
        ],
        correct: 2,
        explanation: "Чтобы найти число, нужно возвести 7 в квадрат: 7 × 7 = 49."
    },
    {
        question: "Вычисли, используя хитрость для чисел, оканчивающихся на 5: 25² = ?",
        answers: [
            "525",
            "600",
            "625",
            "650"
        ],
        correct: 2,
        explanation: "Для чисел, оканчивающихся на 5, последние две цифры квадрата всегда 25. Остальные цифры получаются умножением первой цифры (2) на следующую за ней (3): 2 × 3 = 6. Итого: 625."
    },
    {
        question: "Докажи, что: √(9 + 16) = √9 + √16 (верно ли?)",
        answers: [
            "Верно",
            "Неверно",
            "Только для некоторых чисел",
            "Зависит от порядка операций"
        ],
        correct: 1,
        explanation: "√(9 + 16) = √25 = 5. А √9 + √16 = 3 + 4 = 7. Так как 5 ≠ 7, утверждение неверно."
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