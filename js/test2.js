const questions = [
    {
        question: "Какие арифметические действия относятся к **первой ступени**?",
        answers: [
            "Сложение и умножение",
            "Вычитание и деление",
            "Сложение и вычитание",
            "Умножение и деление"
        ],
        correct: 2,
        explanation: "Действия первой ступени — это сложение и вычитание."
    },
    {
        question: "К какой ступени относятся действия умножения и деления?",
        answers: [
            "К первой ступени",
            "Ко второй ступени",
            "К третьей ступени",
            "Не относятся к ступеням"
        ],
        correct: 1,
        explanation: "Действия второй ступени — это умножение и деление."
    },
    {
        question: "В выражении `15 + 17 - 20 + 8 - 12`, в каком порядке выполняются действия?",
        answers: [
            "Справа налево",
            "Сначала сложение, затем вычитание",
            "В порядке их следования слева направо",
            "Сначала вычитание, затем сложение"
        ],
        correct: 2,
        explanation: "Если выражение содержит действия только одной ступени и нет скобок, то действия выполняются в порядке их следования слева направо."
    },
    {
        question: "Вычислите значение выражения: `60 : 15 · 7 : 2 · 3`",
        answers: [
            "14",
            "28",
            "42",
            "84"
        ],
        correct: 2,
        explanation: "60 : 15 = 4; 4 · 7 = 28; 28 : 2 = 14; 14 · 3 = 42."
    },
    {
        question: "Если выражение содержит действия обеих ступеней (например, `24 : 3 + 5 · 2 - 17`), какие действия выполняются первыми?",
        answers: [
            "Действия первой ступени",
            "Действия второй ступени",
            "Действия в скобках",
            "Действия, которые идут первыми слева"
        ],
        correct: 1,
        explanation: "Первыми выполняются действия второй ступени, в порядке их следования (слева направо), а затем действия первой ступени."
    },
    {
        question: "Вычислите значение выражения: `24 : 3 + 5 · 2 - 17`",
        answers: [
            "1",
            "10",
            "18",
            "20"
        ],
        correct: 0,
        explanation: "1. 24 : 3 = 8; 2. 5 · 2 = 10; 3. 8 + 10 = 18; 4. 18 - 17 = 1."
    },
    {
        question: "Что произойдет, если в выражении есть скобки?",
        answers: [
            "Скобки игнорируются.",
            "Действия внутри скобок выполняются последними.",
            "Действия внутри скобок выполняются первыми.",
            "Порядок действий остается тем же."
        ],
        correct: 2,
        explanation: "Хотя в конспекте нет явного примера со скобками, указано 'Если выражение содержит действия только одной ступени **и в нём нет скобок**'. Это подразумевает, что скобки меняют порядок. В математике действия в скобках всегда выполняются первыми."
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