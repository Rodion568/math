document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown');

    // Обработчик для всех кнопок выпадающих списков
    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.dropdown-btn');
        const content = dropdown.querySelector('.dropdown-content');

        btn.addEventListener('click', function (e) {
            e.stopPropagation();

            // Закрываем все другие открытые списки
            document.querySelectorAll('.dropdown-content').forEach(item => {
                if (item !== content) {
                    item.classList.remove('show');
                    item.previousElementSibling.classList.remove('active');
                }
            });

            // Переключаем текущий список
            content.classList.toggle('show');
            btn.classList.toggle('active');
        });

        // Обработчик для пунктов списка
        content.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function () {
                btn.textContent = this.textContent;
                content.classList.remove('show');
                btn.classList.remove('active');
            });
        });
    });

    // Закрытие при клике в любом месте страницы
    document.addEventListener('click', function () {
        document.querySelectorAll('.dropdown-content').forEach(content => {
            content.classList.remove('show');
        });
        document.querySelectorAll('.dropdown-btn').forEach(btn => {
            btn.classList.remove('active');
        });
    });
});



// document.addEventListener('DOMContentLoaded', function () {
//     // Текущие выбранные фильтры
//     const filters = {
//         subject: 'all',
//         level: 'all',
//         format: 'all'
//     };

//     // Инициализация dropdown-меню
//     function initDropdowns() {
//         document.querySelectorAll('.dropdown').forEach(dropdown => {
//             const btn = dropdown.querySelector('.dropdown-btn');
//             const content = dropdown.querySelector('.dropdown-content');

//             // Обработчик клика по кнопке
//             btn.addEventListener('click', (e) => {
//                 e.stopPropagation();
//                 content.style.display = content.style.display === 'block' ? 'none' : 'block';
//             });

//             // Обработчики для элементов dropdown
//             dropdown.querySelectorAll('.dropdown-item').forEach(item => {
//                 item.addEventListener('click', (e) => {
//                     e.stopPropagation();
//                     const value = item.getAttribute('data-value');

//                     // Определяем тип фильтра
//                     if (dropdown.classList.contains('subject-dropdown')) {
//                         filters.subject = value;
//                         btn.textContent = value === 'all' ? 'Выберите предмет' : item.textContent;
//                     }
//                     else if (dropdown.classList.contains('level-dropdown')) {
//                         filters.level = value;
//                         btn.textContent = value === 'all' ? 'Уровень знаний' : item.textContent;
//                     }
//                     else if (dropdown.classList.contains('format-dropdown')) {
//                         filters.format = value;
//                         btn.textContent = value === 'all' ? 'Формат обучения' : item.textContent;
//                     }

//                     content.style.display = 'none';
//                     applyFilters();
//                 });
//             });
//         });

//         // Закрытие dropdown при клике вне его
//         document.addEventListener('click', () => {
//             document.querySelectorAll('.dropdown-content').forEach(d => {
//                 d.style.display = 'none';
//             });
//         });
//     }

//     // Применение фильтров
//     function applyFilters() {
//         const cards = document.querySelectorAll('.course-card');
//         let hasVisibleCards = false;

//         cards.forEach(card => {
//             const cardSubject = card.querySelector('h2').textContent;
//             const cardLevel = card.querySelector('.course-text:nth-of-type(1)').textContent.replace('Уровень: ', '');
//             const cardFormat = card.querySelector('.course-text:nth-of-type(2)').textContent.replace('Формат обучения: ', '');

//             // Проверяем соответствие фильтрам
//             const subjectMatch = filters.subject === 'all' || cardSubject.includes(filters.subject);
//             const levelMatch = filters.level === 'all' || cardLevel === filters.level;
//             const formatMatch = filters.format === 'all' || cardFormat === filters.format;

//             // Показываем/скрываем карточку
//             if (subjectMatch && levelMatch && formatMatch) {
//                 card.style.display = 'block';
//                 hasVisibleCards = true;
//             } else {
//                 card.style.display = 'none';
//             }
//         });

//         // Показываем или скрываем сообщение "Ничего не найдено"
//         const noResultsMessage = document.querySelector('.no-results-message');
//         if (noResultsMessage) {
//             noResultsMessage.style.display = hasVisibleCards ? 'none' : 'block';
//         }
//     }

//     // Инициализация
//     initDropdowns();
// });


// document.addEventListener('DOMContentLoaded', function() {
//     // Текущее состояние
//     let currentView = 'courses';
//     let currentCourse = '';

//     // DOM элементы
//     const coursesContainer = document.querySelector('.courses');
//     const mathDashboard = document.querySelector('.math-dashboard');
//     const mathSubjectsGrid = document.querySelector('.math-subjects-grid');
//     const filtersContainer = document.querySelector('.math-learning-app');

//     // Создаем контейнер для уроков
//     const lessonsContainer = document.createElement('div');
//     lessonsContainer.className = 'lessons-container';
//     lessonsContainer.style.display = 'none';
//     mathSubjectsGrid.appendChild(lessonsContainer);

//     // Создаем кнопку "Назад"
//     const backButton = document.createElement('button');
//     backButton.className = 'back-button';
//     backButton.textContent = '← Назад к курсам';
//     backButton.style.display = 'none';
//     backButton.addEventListener('click', showCoursesView);
//     mathSubjectsGrid.insertBefore(backButton, coursesContainer);

//     // Группировка предметов
//     const subjectGroups = {
//         'Арифметика': ['Арифметика'],
//         'Математика': ['Алгебра', 'Геометрия', 'Базовая математика', 'Профильная математика', 'Высшая математика'],
//         'Цифровая математика': ['Дискретная математика', 'Теория чисел', 'Теория вероятностей']
//     };

//     // Все карточки
//     const allCards = Array.from(document.querySelectorAll('.course-card'));

//     // Карточки с обучением (без уровня)
//     const learningCards = allCards.filter(card => !card.querySelector('.course-text'));

//     // Карточки с тестами (с указанием уровня)
//     const testCards = allCards.filter(card => card.querySelector('.course-text'));

//     // Обработчики для кнопок "Начать обучение"
//     document.querySelectorAll('.start-lesson-button').forEach(button => {
//         button.addEventListener('click', function(e) {
//             if (button.tagName === 'A') {
//                 e.preventDefault();
//             }

//             const courseCard = this.closest('.course-card');
//             if (courseCard.querySelector('.course-text')) return; // Не обрабатываем тесты

//             currentCourse = courseCard.querySelector('h2').textContent;
//             showLessonsView(currentCourse);
//         });
//     });

//     // Показ уроков
//     function showLessonsView(courseName) {
//         currentView = 'lessons';

//         // Скрываем курсы
//         coursesContainer.style.display = 'none';

//         // Показываем кнопку назад
//         backButton.style.display = 'block';

//         // Генерируем уроки
//         lessonsContainer.innerHTML = `
//             <h2 class="course-title">${courseName}</h2>
//             <div class="lesson-list">
//                 <div class="lesson-card">
//                     <h3>Урок 1: Основы ${courseName}</h3>
//                     <a style="display: inline-block" href="../theory.html" class="start-lesson-btn">Начать урок</a>
//                 </div>
//                 <div class="lesson-card">
//                     <h3>Урок 2: Продвинутые темы</h3>
//                     <button class="start-lesson-btn">Начать урок</button>
//                 </div>
//                 <div class="lesson-card">
//                     <h3>Урок 3: Практические задания</h3>
//                     <button class="start-lesson-btn">Начать урок</button>
//                 </div>
//                 <div class="lesson-card">
//                     <h3>Урок 4: Примеры из реальной жизни</h3>
//                     <button class="start-lesson-btn">Начать урок</button>
//                 </div>
//             </div>
//         `;

//         // Обработчики для кнопок уроков
//         lessonsContainer.querySelectorAll('.start-lesson-btn').forEach(btn => {
//             btn.addEventListener('click', function() {
//                 const lessonTitle = this.closest('.lesson-card').querySelector('h3').textContent;
//                 alert(`Начинаем ${lessonTitle} по курсу "${courseName}"`);
//             });
//         });

//         lessonsContainer.style.display = 'block';
//     }

//     // Показ курсов
//     function showCoursesView() {
//         currentView = 'courses';

//         // Показываем курсы
//         coursesContainer.style.display = 'grid';

//         // Скрываем кнопку назад и уроки
//         backButton.style.display = 'none';
//         lessonsContainer.style.display = 'none';

//         // Применяем текущие фильтры
//         applyFilters();
//     }

//     // Инициализация фильтров
//     initFilters();

//     function initFilters() {
//         const filters = {
//             subject: 'all',
//             level: 'all',
//             format: 'all'
//         };

//         document.querySelectorAll('.dropdown').forEach(dropdown => {
//             const btn = dropdown.querySelector('.dropdown-btn');
//             const content = dropdown.querySelector('.dropdown-content');

//             btn.addEventListener('click', (e) => {
//                 e.stopPropagation();
//                 content.style.display = content.style.display === 'block' ? 'none' : 'block';
//             });

//             dropdown.querySelectorAll('.dropdown-item').forEach(item => {
//                 item.addEventListener('click', (e) => {
//                     e.stopPropagation();
//                     const value = item.getAttribute('data-value');

//                     if (dropdown.classList.contains('subject-dropdown')) {
//                         filters.subject = value;
//                         btn.textContent = value === 'all' ? 'Выберите предмет' : item.textContent;
//                         // При смене предмета сбрасываем уровень
//                         if (value !== 'all') {
//                             filters.level = 'all';
//                             document.querySelector('.level-dropdown .dropdown-btn').textContent = 'Уровень знаний';
//                         }
//                     }
//                     else if (dropdown.classList.contains('level-dropdown')) {
//                         filters.level = value;
//                         btn.textContent = value === 'all' ? 'Уровень знаний' : item.textContent;
//                         // При выборе уровня сбрасываем предмет
//                         if (value !== 'all') {
//                             filters.subject = 'all';
//                             document.querySelector('.subject-dropdown .dropdown-btn').textContent = 'Выберите предмет';
//                         }
//                     }
//                     else if (dropdown.classList.contains('format-dropdown')) {
//                         filters.format = value;
//                         btn.textContent = value === 'all' ? 'Формат обучения' : item.textContent;
//                     }

//                     content.style.display = 'none';
//                     applyFilters();
//                 });
//             });
//         });

//         function applyFilters() {
//             let hasVisibleCards = false;
//             const noResultsMessage = document.querySelector('.no-results-message');

//             // Если фильтры не используются - показываем все
//             if (filters.subject === 'all' && filters.level === 'all') {
//                 allCards.forEach(card => {
//                     card.style.display = 'block';
//                     hasVisibleCards = true;
//                 });

//                 noResultsMessage.style.display = 'none';
//                 return;
//             }

//             // Если выбран предмет - показываем только соответствующие курсы обучения
//             if (filters.subject !== 'all') {
//                 learningCards.forEach(card => {
//                     const cardTitle = card.querySelector('h2').textContent;
//                     let shouldShow = false;

//                     if (subjectGroups[filters.subject]) {
//                         shouldShow = subjectGroups[filters.subject].includes(cardTitle);
//                     } else {
//                         shouldShow = cardTitle === filters.subject;
//                     }

//                     card.style.display = shouldShow ? 'block' : 'none';
//                     if (shouldShow) hasVisibleCards = true;
//                 });

//                 // Скрываем все тесты при выборе предмета
//                 testCards.forEach(card => {
//                     card.style.display = 'none';
//                 });
//             }
//             // Если выбран уровень - показываем только соответствующие тесты
//             else if (filters.level !== 'all') {
//                 testCards.forEach(card => {
//                     const cardLevel = card.querySelector('.course-text').textContent.replace('Уровень: ', '');
//                     const shouldShow = cardLevel === filters.level;

//                     card.style.display = shouldShow ? 'block' : 'none';
//                     if (shouldShow) hasVisibleCards = true;
//                 });

//                 // Скрываем все курсы обучения при выборе уровня
//                 learningCards.forEach(card => {
//                     card.style.display = 'none';
//                 });
//             }

//             noResultsMessage.style.display = hasVisibleCards ? 'none' : 'block';
//         }

//         document.addEventListener('click', () => {
//             document.querySelectorAll('.dropdown-content').forEach(d => {
//                 d.style.display = 'none';
//             });
//         });
//     }
// });


// document.addEventListener('DOMContentLoaded', function() {
//     console.log('lessons.js loaded and DOMContentLoaded fired.');

//     let currentView = 'courses';
//     let currentCourse = '';

//     const coursesContainer = document.querySelector('.courses');
//     const mathSubjectsGrid = document.querySelector('.math-subjects-grid');
//     const noResultsMessage = document.querySelector('.no-results-message'); // Define here for broader scope

//     const lessonsContainer = document.createElement('div');
//     lessonsContainer.className = 'lessons-container';
//     lessonsContainer.style.display = 'none';
//     mathSubjectsGrid.appendChild(lessonsContainer);

//     const backButton = document.createElement('button');
//     backButton.className = 'back-button';
//     backButton.textContent = '← Назад к курсам';
//     backButton.style.display = 'none';
//     backButton.addEventListener('click', showCoursesView);
//     mathSubjectsGrid.insertBefore(backButton, coursesContainer);

//     // This object is crucial for your specific filtering logic
//     const subjectGroups = {
//         'Арифметика': ['Арифметика'],
//         'Математика': ['Алгебра', 'Геометрия', 'Базовая математика', 'Профильная математика', 'Высшая математика'],
//         'Цифровая математика': ['Дискретная математика', 'Теория чисел', 'Теория вероятностей']
//     };
//     console.log('Subject Groups:', subjectGroups);

//     const allLearningCards = Array.from(document.querySelectorAll('.course-card'));
//     console.log('All Learning Cards found:', allLearningCards.map(card => card.querySelector('h2').textContent));


//     document.querySelectorAll('.start-lesson-button').forEach(button => {
//         button.addEventListener('click', function(e) {
//             if (button.tagName === 'A') {
//                 e.preventDefault();
//             }
//             const courseCard = this.closest('.course-card');
//             currentCourse = courseCard.querySelector('h2').textContent;
//             console.log('Clicked "Начать обучение" for:', currentCourse);
//             showLessonsView(currentCourse);
//         });
//     });

//     function showLessonsView(courseName) {
//         console.log('Entering showLessonsView for:', courseName);
//         currentView = 'lessons';

//         coursesContainer.style.display = 'none';
//         backButton.style.display = 'block';

//         lessonsContainer.innerHTML = `
//             <h2 class="course-title">${courseName}</h2>
//             <div class="lesson-list">
//                 <div class="lesson-card">
//                     <h3>Урок 1: Основы ${courseName}</h3>
//                     <a style="display: inline-block" href="../theory.html" class="start-lesson-btn">Начать урок</a>
//                 </div>
//                 <div class="lesson-card">
//                     <h3>Урок 2: Продвинутые темы</h3>
//                     <button class="start-lesson-btn">Начать урок</button>
//                 </div>
//                 <div class="lesson-card">
//                     <h3>Урок 3: Практические задания</h3>
//                     <button class="start-lesson-btn">Начать урок</button>
//                 </div>
//                 <div class="lesson-card">
//                     <h3>Урок 4: Примеры из реальной жизни</h3>
//                     <button class="start-lesson-btn">Начать урок</button>
//                 </div>
//             </div>
//         `;

//         lessonsContainer.querySelectorAll('.start-lesson-btn').forEach(btn => {
//             btn.addEventListener('click', function() {
//                 const lessonTitle = this.closest('.lesson-card').querySelector('h3').textContent;
//                 console.log(`Starting lesson: ${lessonTitle} for course: "${courseName}"`);
//                 alert(`Начинаем ${lessonTitle} по курсу "${courseName}"`);
//             });
//         });

//         lessonsContainer.style.display = 'block';
//     }

//     function showCoursesView() {
//         console.log('Entering showCoursesView.');
//         currentView = 'courses';

//         coursesContainer.style.display = 'grid';
//         backButton.style.display = 'none';
//         lessonsContainer.style.display = 'none';

//         applyFilters(); // Re-apply filters when returning to courses view
//     }

//     initFilters();

//     function initFilters() {
//         console.log('Initializing filters.');
//         const filters = {
//             subject: 'all',
//         };

//         const subjectDropdown = document.querySelector('.subject-dropdown');
//         if (subjectDropdown) {
//             console.log('Subject dropdown found.');
//             const btn = subjectDropdown.querySelector('.dropdown-btn');
//             const content = subjectDropdown.querySelector('.dropdown-content');

//             btn.addEventListener('click', (e) => {
//                 e.stopPropagation();
//                 content.style.display = content.style.display === 'block' ? 'none' : 'block';
//                 console.log('Dropdown button clicked. Content display:', content.style.display);
//             });

//             subjectDropdown.querySelectorAll('.dropdown-item').forEach(item => {
//                 item.addEventListener('click', (e) => {
//                     e.stopPropagation();
//                     const value = item.getAttribute('data-value');
//                     filters.subject = value;
//                     btn.textContent = value === 'all' ? 'Выберите предмет' : item.textContent;
//                     console.log('Dropdown item clicked. Selected subject:', filters.subject);

//                     content.style.display = 'none';
//                     showCoursesView(); // Always go back to courses view when filter is applied
//                 });
//             });
//         } else {
//             console.warn('Subject dropdown not found. Filtering will not work.');
//         }


//         function applyFilters() {
//             console.log('Applying filters. Current subject filter:', filters.subject);
//             let hasVisibleCards = false;
//             // const noResultsMessage = document.querySelector('.no-results-message'); // Already defined at top

//             if (filters.subject === 'all') {
//                 console.log('Filter is "all", showing all cards.');
//                 allLearningCards.forEach(card => {
//                     card.style.display = 'block';
//                     hasVisibleCards = true;
//                 });
//             } else {
//                 allLearningCards.forEach(card => {
//                     const cardTitle = card.querySelector('h2').textContent;
//                     let shouldShow = false;

//                     if (subjectGroups[filters.subject]) {
//                         shouldShow = subjectGroups[filters.subject].includes(cardTitle);
//                         console.log(`Checking card "${cardTitle}" against group "${filters.subject}". Should show: ${shouldShow}`);
//                     } else {
//                         shouldShow = cardTitle === filters.subject;
//                         console.log(`Checking card "${cardTitle}" directly against subject "${filters.subject}". Should show: ${shouldShow}`);
//                     }

//                     card.style.display = shouldShow ? 'block' : 'none';
//                     if (shouldShow) hasVisibleCards = true;
//                 });
//             }

//             noResultsMessage.style.display = hasVisibleCards ? 'none' : 'block';
//             console.log('No results message display:', noResultsMessage.style.display);
//         }

//         document.addEventListener('click', (event) => {
//             // Check if the click was inside a dropdown button or content
//             let isClickInsideDropdown = false;
//             document.querySelectorAll('.dropdown').forEach(dropdown => {
//                 if (dropdown.contains(event.target)) {
//                     isClickInsideDropdown = true;
//                 }
//             });

//             if (!isClickInsideDropdown) {
//                 document.querySelectorAll('.dropdown-content').forEach(d => {
//                     if (d.style.display === 'block') {
//                         console.log('Closing dropdown content due to outside click.');
//                     }
//                     d.style.display = 'none';
//                 });
//             }
//         });

//         // Initial application of filters when page loads
//         applyFilters();
//     }
// });



// document.addEventListener('DOMContentLoaded', function() {
//     // Связь между категориями и предметами
//     const subjectGroups = {
//         'Арифметика': ['Арифметика'],
//         'Математика': ['Алгебра', 'Геометрия', 'Базовая математика', 'Профильная математика', 'Высшая математика'],
//         'Цифровая математика': ['Дискретная математика', 'Теория чисел', 'Теория вероятностей']
//     };

//     // DOM элементы
//     const subjectDropdown = document.querySelector('.subject-dropdown');
//     const subjectBtn = subjectDropdown.querySelector('.dropdown-btn');
//     const subjectContent = subjectDropdown.querySelector('.dropdown-content');
//     const allCards = Array.from(document.querySelectorAll('.course-card'));
//     const noResultsMessage = document.querySelector('.no-results-message');

//     // Текущий выбранный фильтр
//     let currentFilter = 'all';

//     // Инициализация фильтров
//     function initFilters() {
//         // Обработчик клика по кнопке фильтра
//         subjectBtn.addEventListener('click', function(e) {
//             e.stopPropagation();
//             subjectContent.style.display = subjectContent.style.display === 'block' ? 'none' : 'block';
//         });

//         // Обработчики для элементов фильтра
//         subjectContent.querySelectorAll('.dropdown-item').forEach(item => {
//             item.addEventListener('click', function(e) {
//                 e.stopPropagation();
//                 currentFilter = this.getAttribute('data-value');
//                 subjectBtn.textContent = currentFilter === 'all' ? 'Выберите предмет' : this.textContent;
//                 subjectContent.style.display = 'none';
//                 applyFilter();
//             });
//         });

//         // Закрытие фильтра при клике вне его
//         document.addEventListener('click', function() {
//             subjectContent.style.display = 'none';
//         });

//         // Применяем фильтр при загрузке страницы (если есть в URL)
//         const urlParams = new URLSearchParams(window.location.search);
//         if (urlParams.has('subject')) {
//             const subject = urlParams.get('subject');
//             const item = subjectContent.querySelector(`.dropdown-item[data-value="${subject}"]`);
//             if (item) {
//                 currentFilter = subject;
//                 subjectBtn.textContent = item.textContent;
//             }
//         }

//         applyFilter();
//     }

//     // Применение текущего фильтра
//     function applyFilter() {
//         let hasVisibleCards = false;

//         allCards.forEach(card => {
//             const cardTitle = card.querySelector('h2').textContent;
//             let shouldShow = true;

//             if (currentFilter !== 'all') {
//                 shouldShow = subjectGroups[currentFilter]?.includes(cardTitle) || false;
//             }

//             card.style.display = shouldShow ? 'block' : 'none';
//             if (shouldShow) hasVisibleCards = true;
//         });

//         noResultsMessage.style.display = hasVisibleCards ? 'none' : 'block';

//         // Обновляем URL
//         updateUrl();
//     }

//     // Обновление URL с параметром фильтра
//     function updateUrl() {
//         const url = new URL(window.location);
//         if (currentFilter !== 'all') {
//             url.searchParams.set('subject', currentFilter);
//         } else {
//             url.searchParams.delete('subject');
//         }
//         window.history.pushState({}, '', url);
//     }

//     // Обработчики для кнопок "Начать обучение"
//     document.querySelectorAll('.start-lesson-button').forEach(button => {
//         button.addEventListener('click', function(e) {
//             if (this.tagName === 'A') {
//                 e.preventDefault();
//                 const courseName = this.closest('.course-card').querySelector('h2').textContent;
//                 window.location.href = `theory.html?course=${encodeURIComponent(courseName)}`;
//             }
//         });
//     });

//     // Инициализация
//     initFilters();
// });



// document.addEventListener('DOMContentLoaded', function() {
//     // Текущее состояние
//     let currentView = 'courses';
//     let currentCourse = '';

//     // DOM элементы
//     const coursesContainer = document.querySelector('.courses');
//     const mathDashboard = document.querySelector('.math-dashboard');
//     const mathSubjectsGrid = document.querySelector('.math-subjects-grid');
//     const filtersContainer = document.querySelector('.math-learning-app');

//     // Создаем контейнер для уроков
//     const lessonsContainer = document.createElement('div');
//     lessonsContainer.className = 'lessons-container';
//     lessonsContainer.style.display = 'none';
//     mathSubjectsGrid.appendChild(lessonsContainer);

//     // Создаем кнопку "Назад"
//     const backButton = document.createElement('button');
//     backButton.className = 'back-button';
//     backButton.textContent = '← Назад к курсам';
//     backButton.style.display = 'none';
//     backButton.addEventListener('click', showCoursesView);
//     mathSubjectsGrid.insertBefore(backButton, coursesContainer);

//     // Группировка предметов
//     const subjectGroups = {
//         'Арифметика': ['Арифметика'],
//         'Математика': ['Алгебра', 'Геометрия', 'Базовая математика', 'Профильная математика', 'Высшая математика'],
//         'Цифровая математика': ['Дискретная математика', 'Теория чисел', 'Теория вероятностей']
//     };

//     // Все карточки
//     const allCards = Array.from(document.querySelectorAll('.course-card'));

//     // Карточки с обучением (без уровня)
//     const learningCards = allCards.filter(card => !card.querySelector('.course-text'));

//     // Карточки с тестами (с указанием уровня)
//     const testCards = allCards.filter(card => card.querySelector('.course-text'));

//     // Обработчики для кнопок "Начать обучение"
//     document.querySelectorAll('.start-lesson-button').forEach(button => {
//         button.addEventListener('click', function(e) {
//             if (button.tagName === 'A') {
//                 e.preventDefault();
//             }

//             const courseCard = this.closest('.course-card');
//             if (courseCard.querySelector('.course-text')) return; // Не обрабатываем тесты

//             currentCourse = courseCard.querySelector('h2').textContent;
//             showLessonsView(currentCourse);
//         });
//     });

//     // Показ уроков
//     function showLessonsView(courseName) {
//         currentView = 'lessons';

//         // Скрываем курсы
//         coursesContainer.style.display = 'none';

//         // Показываем кнопку назад
//         backButton.style.display = 'block';

//         // Генерируем уроки
//         lessonsContainer.innerHTML = `
//             <h2 class="course-title">${courseName}</h2>
//             <div class="lesson-list">
//                 <div class="lesson-card">
//                     <h3>Урок 1: Основы ${courseName}</h3>
//                     <a style="display: inline-block" href="../theory.html" class="start-lesson-btn">Начать урок</a>
//                 </div>
//                 <div class="lesson-card">
//                     <h3>Урок 2: Продвинутые темы</h3>
//                     <button class="start-lesson-btn">Начать урок</button>
//                 </div>
//                 <div class="lesson-card">
//                     <h3>Урок 3: Практические задания</h3>
//                     <button class="start-lesson-btn">Начать урок</button>
//                 </div>
//                 <div class="lesson-card">
//                     <h3>Урок 4: Примеры из реальной жизни</h3>
//                     <button class="start-lesson-btn">Начать урок</button>
//                 </div>
//             </div>
//         `;

//         // Обработчики для кнопок уроков
//         lessonsContainer.querySelectorAll('.start-lesson-btn').forEach(btn => {
//             btn.addEventListener('click', function() {
//                 const lessonTitle = this.closest('.lesson-card').querySelector('h3').textContent;
//                 alert(`Начинаем ${lessonTitle} по курсу "${courseName}"`);
//             });
//         });

//         lessonsContainer.style.display = 'block';
//     }

//     // Показ курсов
//     function showCoursesView() {
//         currentView = 'courses';

//         // Показываем курсы
//         coursesContainer.style.display = 'grid';

//         // Скрываем кнопку назад и уроки
//         backButton.style.display = 'none';
//         lessonsContainer.style.display = 'none';

//         // Применяем текущие фильтры
//         applyFilters();
//     }

//     // Инициализация фильтров
//     initFilters();

//     function initFilters() {
//         const filters = {
//             subject: 'all',
//             level: 'all',
//             format: 'all'
//         };

//         document.querySelectorAll('.dropdown').forEach(dropdown => {
//             const btn = dropdown.querySelector('.dropdown-btn');
//             const content = dropdown.querySelector('.dropdown-content');

//             btn.addEventListener('click', (e) => {
//                 e.stopPropagation();
//                 content.style.display = content.style.display === 'block' ? 'none' : 'block';
//             });

//             dropdown.querySelectorAll('.dropdown-item').forEach(item => {
//                 item.addEventListener('click', (e) => {
//                     e.stopPropagation();
//                     const value = item.getAttribute('data-value');

//                     if (dropdown.classList.contains('subject-dropdown')) {
//                         filters.subject = value;
//                         btn.textContent = value === 'all' ? 'Выберите предмет' : item.textContent;
//                         // При смене предмета сбрасываем уровень
//                         if (value !== 'all') {
//                             filters.level = 'all';
//                             document.querySelector('.level-dropdown .dropdown-btn').textContent = 'Уровень знаний';
//                         }
//                     }
//                     else if (dropdown.classList.contains('level-dropdown')) {
//                         filters.level = value;
//                         btn.textContent = value === 'all' ? 'Уровень знаний' : item.textContent;
//                         // При выборе уровня сбрасываем предмет
//                         if (value !== 'all') {
//                             filters.subject = 'all';
//                             document.querySelector('.subject-dropdown .dropdown-btn').textContent = 'Выберите предмет';
//                         }
//                     }
//                     else if (dropdown.classList.contains('format-dropdown')) {
//                         filters.format = value;
//                         btn.textContent = value === 'all' ? 'Формат обучения' : item.textContent;
//                     }

//                     content.style.display = 'none';
//                     applyFilters();
//                 });
//             });
//         });

//         function applyFilters() {
//             let hasVisibleCards = false;
//             const noResultsMessage = document.querySelector('.no-results-message');

//             // Если фильтры не используются - показываем все
//             if (filters.subject === 'all' && filters.level === 'all') {
//                 allCards.forEach(card => {
//                     card.style.display = 'block';
//                     hasVisibleCards = true;
//                 });

//                 noResultsMessage.style.display = 'none';
//                 return;
//             }

//             // Если выбран предмет - показываем только соответствующие курсы обучения
//             if (filters.subject !== 'all') {
//                 learningCards.forEach(card => {
//                     const cardTitle = card.querySelector('h2').textContent;
//                     let shouldShow = false;

//                     if (subjectGroups[filters.subject]) {
//                         shouldShow = subjectGroups[filters.subject].includes(cardTitle);
//                     } else {
//                         shouldShow = cardTitle === filters.subject;
//                     }

//                     card.style.display = shouldShow ? 'block' : 'none';
//                     if (shouldShow) hasVisibleCards = true;
//                 });

//                 // Скрываем все тесты при выборе предмета
//                 testCards.forEach(card => {
//                     card.style.display = 'none';
//                 });
//             }
//             // Если выбран уровень - показываем только соответствующие тесты
//             else if (filters.level !== 'all') {
//                 testCards.forEach(card => {
//                     const cardLevel = card.querySelector('.course-text').textContent.replace('Уровень: ', '');
//                     const shouldShow = cardLevel === filters.level;

//                     card.style.display = shouldShow ? 'block' : 'none';
//                     if (shouldShow) hasVisibleCards = true;
//                 });

//                 // Скрываем все курсы обучения при выборе уровня
//                 learningCards.forEach(card => {
//                     card.style.display = 'none';
//                 });
//             }

//             noResultsMessage.style.display = hasVisibleCards ? 'none' : 'block';
//         }

//         document.addEventListener('click', () => {
//             document.querySelectorAll('.dropdown-content').forEach(d => {
//                 d.style.display = 'none';
//             });
//         });
//     }
// });

document.addEventListener('DOMContentLoaded', function () {
    // Текущее состояние
    let currentView = 'courses';
    let currentCourse = '';
    let currentFilter = 'all';

    // DOM элементы
    const coursesContainer = document.querySelector('.courses');
    const mathSubjectsGrid = document.querySelector('.math-subjects-grid');
    const noResultsMessage = document.querySelector('.no-results-message');
    const lessonsContainer = document.querySelector('.lessons-container');
    const backButton = document.querySelector('.back-button');
    const dynamicCourseTitle = document.getElementById('dynamic-course-title');
    const courseNameSpans = document.querySelectorAll('.course-name');

    // Группировка предметов
    const subjectGroups = {
        'Арифметика': ['Арифметика'],
        'Математика': ['Алгебра', 'Геометрия', 'Базовая математика', 'Профильная математика', 'Высшая математика'],
        'Цифровая математика': ['Дискретная математика', 'Теория чисел', 'Теория вероятностей']
    };

    // Все карточки
    const allCards = Array.from(document.querySelectorAll('.course-card'));
    const learningCards = allCards.filter(card => !card.querySelector('.course-text'));

    const availableCourses = ['Арифметика'];

    // Обработчики для кнопок "Начать обучение"
    document.querySelectorAll('.start-lesson-button').forEach(button => {
        button.addEventListener('click', function (e) {
            if (button.tagName === 'A') {
                e.preventDefault();
            }

            const courseCard = this.closest('.course-card');
            currentCourse = courseCard.querySelector('h2').textContent;
            // Проверяем доступность уроков для этого курса
            if (availableCourses.includes(currentCourse)) {
                showLessonsView(currentCourse);
            } else {
                alert('Уроки для этого курса пока недоступны');
                // Или можно использовать window.location.href для перенаправления
            }
        });
    });

    // Обработчик кнопки "Назад"
    backButton.addEventListener('click', showCoursesView);

    // Показ уроков
    function showLessonsView(courseName) {
        currentView = 'lessons';
        currentCourse = courseName;
        coursesContainer.style.display = 'none';
        backButton.style.display = 'block';
        lessonsContainer.style.display = 'block';

        
        


        // Обновляем название курса во всех местах
        dynamicCourseTitle.textContent = courseName;
        courseNameSpans.forEach(span => span.textContent = courseName);
    }

    // Показ курсов
    function showCoursesView() {
        currentView = 'courses';
        currentCourse = '';
        coursesContainer.style.display = 'grid';
        backButton.style.display = 'none';
        lessonsContainer.style.display = 'none';
    }

    // Инициализация фильтров
    initFilters();

    function initFilters() {
        const subjectDropdown = document.querySelector('.subject-dropdown');
        const subjectBtn = subjectDropdown.querySelector('.dropdown-btn');
        const subjectContent = subjectDropdown.querySelector('.dropdown-content');

        // Устанавливаем начальный текст кнопки
        subjectBtn.textContent = 'Выберите предмет';

        subjectBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            subjectContent.style.display = subjectContent.style.display === 'block' ? 'none' : 'block';
        });

        subjectDropdown.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedValue = item.getAttribute('data-value');
                const selectedText = item.textContent;

                currentFilter = selectedValue;
                subjectBtn.textContent = selectedValue === 'all' ? 'Выберите предмет' : selectedText;
                subjectContent.style.display = 'none';

                if (currentView === 'lessons') {
                    showCoursesView();
                }
                applyFilters();
            });
        });

        function applyFilters() {
            let hasVisibleCards = false;

            learningCards.forEach(card => {
                const cardTitle = card.querySelector('h2').textContent;
                let shouldShow = currentFilter === 'all' ||
                    (subjectGroups[currentFilter] &&
                        subjectGroups[currentFilter].includes(cardTitle));

                card.style.display = shouldShow ? 'block' : 'none';
                if (shouldShow) hasVisibleCards = true;
            });

            noResultsMessage.style.display = hasVisibleCards ? 'none' : 'block';
        }

        document.addEventListener('click', () => {
            subjectContent.style.display = 'none';
        });

        applyFilters();
    }
    // New code to handle direct links to specific lessons views
    const urlParams = new URLSearchParams(window.location.search);
    const initialCourse = urlParams.get('course');
    if (initialCourse) {
        showLessonsView(initialCourse);
    }
});