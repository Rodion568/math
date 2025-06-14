// Все вопросы теста
const questions = [
    {
        question: "Чему равен предел \( \lim_{x \to 0} \frac{\\sin x}{x} \)?",
        answers: [
            "0",
            "1",
            "∞",
            "Не существует"
        ],
        correct: 1,
        explanation: "Это первый замечательный предел, который равен 1."
    },
    {
        question: "Какова производная функции \( f(x) = e^x \)?",
        answers: [
            "\( xe^{x-1} \)",
            "\( e^x \)",
            "\( \\ln x \)",
            "0"
        ],
        correct: 1,
        explanation: "Производная экспоненциальной функции \( e^x \) равна самой функции."
    },
    {
        question: "Чему равен определитель матрицы \( \\begin{bmatrix} 2 & 3 \\\\ 1 & 4 \\end{bmatrix} \)?",
        answers: [
            "5",
            "6",
            "7",
            "8"
        ],
        correct: 0,
        explanation: "Определитель вычисляется как ad - bc = 2*4 - 3*1 = 8 - 3 = 5."
    },
    {
        question: "Как записывается формула Бернулли?",
        answers: [
            "\( P_n(k) = C_n^k \\cdot p^k \\cdot (1-p)^{n-k} \)",
            "\( P(A) = \\frac{n(A)}{n(S)} \)",
            "\( E = mc^2 \)",
            "\( a^2 + b^2 = c^2 \)"
        ],
        correct: 0,
        explanation: "Формула Бернулли описывает вероятность k успехов в n испытаниях."
    },
    {
        question: "Чему равен интеграл \( \\int x^2 dx \)?",
        answers: [
            "\( \\frac{x^3}{3} + C \)",
            "\( 2x + C \)",
            "\( x^3 + C \)",
            "\( \\frac{x^2}{2} + C \)"
        ],
        correct: 0,
        explanation: "При интегрировании x² по правилу степенной функции получаем x³/3 + C."
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