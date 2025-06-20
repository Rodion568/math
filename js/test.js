// Все вопросы теста
const questions = [
    {
        question: "Сколько всего арифметических действий?",
        answers: [
            "Два",
            "Три",
            "Четыре",
            "Пять"
        ],
        correct: 2,
        explanation: "Согласно конспекту, арифметических действий всего четыре: сложение, вычитание, умножение, деление."
    },
    {
        question: "Какое из перечисленных действий относится к элементарной алгебре, а не к арифметическим действиям?",
        answers: [
            "Сложение",
            "Вычитание",
            "Умножение",
            "Возведение в степень"
        ],
        correct: 3,
        explanation: "Возведение в степень и извлечение корня относятся к элементарной алгебре."
    },
    {
        question: "Какой знак используется для обозначения деления?",
        answers: [
            "+",
            "-",
            "*",
            ":"
        ],
        correct: 3,
        explanation: "Знак деления - ':'."
    },
    {
        question: "Если мы берем число 7 и добавляем к нему 2 (7 + 2), какое арифметическое действие мы производим?",
        answers: [
            "Вычитание",
            "Умножение",
            "Сложение",
            "Деление"
        ],
        correct: 2,
        explanation: "Знак '+' означает сложение."
    },
    {
        question: "Как называется число, полученное в результате арифметического действия?",
        answers: [
            "Операнд",
            "Знак",
            "Результат",
            "Свойство"
        ],
        correct: 2,
        explanation: "Найденное число называется результатом этого действия."
    },
    {
        question: "Что ставится после арифметического выражения для записи результата вычислений?",
        answers: [
            "Знак умножения",
            "Знак деления",
            "Знак равенства",
            "Знак сложения"
        ],
        correct: 2,
        explanation: "Результат вычислений записывается после знака равенства '='."
    },
    {
        question: "Может ли умножение быть обозначено символом 'x'?",
        answers: [
            "Да",
            "Нет",
            "Только в элементарной алгебре",
            "Только для больших чисел"
        ],
        correct: 0,
        explanation: "Да, умножение может быть обозначено как '*', '·' или 'x'."
    }
];

// Элементы DOM
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