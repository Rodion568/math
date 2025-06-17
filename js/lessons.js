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


document.addEventListener('DOMContentLoaded', function() {
    // Текущее состояние
    let currentView = 'courses';
    let currentCourse = '';
    
    // DOM элементы
    const coursesContainer = document.querySelector('.courses');
    const mathDashboard = document.querySelector('.math-dashboard');
    const mathSubjectsGrid = document.querySelector('.math-subjects-grid');
    const filtersContainer = document.querySelector('.math-learning-app');
    
    // Создаем контейнер для уроков
    const lessonsContainer = document.createElement('div');
    lessonsContainer.className = 'lessons-container';
    lessonsContainer.style.display = 'none';
    mathSubjectsGrid.appendChild(lessonsContainer);
    
    // Создаем кнопку "Назад"
    const backButton = document.createElement('button');
    backButton.className = 'back-button';
    backButton.textContent = '← Назад к курсам';
    backButton.style.display = 'none';
    backButton.addEventListener('click', showCoursesView);
    mathSubjectsGrid.insertBefore(backButton, coursesContainer);
    
    // Группировка предметов
    const subjectGroups = {
        'Арифметика': ['Арифметика'],
        'Математика': ['Алгебра', 'Геометрия', 'Базовая математика', 'Профильная математика', 'Высшая математика'],
        'Цифровая математика': ['Дискретная математика', 'Теория чисел', 'Теория вероятностей']
    };
    
    // Все карточки
    const allCards = Array.from(document.querySelectorAll('.course-card'));
    
    // Карточки с обучением (без уровня)
    const learningCards = allCards.filter(card => !card.querySelector('.course-text'));
    
    // Карточки с тестами (с указанием уровня)
    const testCards = allCards.filter(card => card.querySelector('.course-text'));
    
    // Обработчики для кнопок "Начать обучение"
    document.querySelectorAll('.start-lesson-button').forEach(button => {
        button.addEventListener('click', function(e) {
            if (button.tagName === 'A') {
                e.preventDefault();
            }
            
            const courseCard = this.closest('.course-card');
            if (courseCard.querySelector('.course-text')) return; // Не обрабатываем тесты
            
            currentCourse = courseCard.querySelector('h2').textContent;
            showLessonsView(currentCourse);
        });
    });
    
    // Показ уроков
    function showLessonsView(courseName) {
        currentView = 'lessons';
        
        // Скрываем курсы
        coursesContainer.style.display = 'none';
        
        // Показываем кнопку назад
        backButton.style.display = 'block';
        
        // Генерируем уроки
        lessonsContainer.innerHTML = `
            <h2 class="course-title">${courseName}</h2>
            <div class="lesson-list">
                <div class="lesson-card">
                    <h3>Урок 1: Основы ${courseName}</h3>
                    <a style="display: inline-block" href="../theory.html" class="start-lesson-btn">Начать урок</a>
                </div>
                <div class="lesson-card">
                    <h3>Урок 2: Продвинутые темы</h3>
                    <button class="start-lesson-btn">Начать урок</button>
                </div>
                <div class="lesson-card">
                    <h3>Урок 3: Практические задания</h3>
                    <button class="start-lesson-btn">Начать урок</button>
                </div>
                <div class="lesson-card">
                    <h3>Урок 4: Примеры из реальной жизни</h3>
                    <button class="start-lesson-btn">Начать урок</button>
                </div>
            </div>
        `;
        
        // Обработчики для кнопок уроков
        lessonsContainer.querySelectorAll('.start-lesson-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const lessonTitle = this.closest('.lesson-card').querySelector('h3').textContent;
                alert(`Начинаем ${lessonTitle} по курсу "${courseName}"`);
            });
        });
        
        lessonsContainer.style.display = 'block';
    }
    
    // Показ курсов
    function showCoursesView() {
        currentView = 'courses';
        
        // Показываем курсы
        coursesContainer.style.display = 'grid';
        
        // Скрываем кнопку назад и уроки
        backButton.style.display = 'none';
        lessonsContainer.style.display = 'none';
        
        // Применяем текущие фильтры
        applyFilters();
    }
    
    // Инициализация фильтров
    initFilters();
    
    function initFilters() {
        const filters = {
            subject: 'all',
            level: 'all',
            format: 'all'
        };

        document.querySelectorAll('.dropdown').forEach(dropdown => {
            const btn = dropdown.querySelector('.dropdown-btn');
            const content = dropdown.querySelector('.dropdown-content');

            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
            });

            dropdown.querySelectorAll('.dropdown-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const value = item.getAttribute('data-value');

                    if (dropdown.classList.contains('subject-dropdown')) {
                        filters.subject = value;
                        btn.textContent = value === 'all' ? 'Выберите предмет' : item.textContent;
                        // При смене предмета сбрасываем уровень
                        if (value !== 'all') {
                            filters.level = 'all';
                            document.querySelector('.level-dropdown .dropdown-btn').textContent = 'Уровень знаний';
                        }
                    }
                    else if (dropdown.classList.contains('level-dropdown')) {
                        filters.level = value;
                        btn.textContent = value === 'all' ? 'Уровень знаний' : item.textContent;
                        // При выборе уровня сбрасываем предмет
                        if (value !== 'all') {
                            filters.subject = 'all';
                            document.querySelector('.subject-dropdown .dropdown-btn').textContent = 'Выберите предмет';
                        }
                    }
                    else if (dropdown.classList.contains('format-dropdown')) {
                        filters.format = value;
                        btn.textContent = value === 'all' ? 'Формат обучения' : item.textContent;
                    }

                    content.style.display = 'none';
                    applyFilters();
                });
            });
        });

        function applyFilters() {
            let hasVisibleCards = false;
            const noResultsMessage = document.querySelector('.no-results-message');

            // Если фильтры не используются - показываем все
            if (filters.subject === 'all' && filters.level === 'all') {
                allCards.forEach(card => {
                    card.style.display = 'block';
                    hasVisibleCards = true;
                });
                
                noResultsMessage.style.display = 'none';
                return;
            }

            // Если выбран предмет - показываем только соответствующие курсы обучения
            if (filters.subject !== 'all') {
                learningCards.forEach(card => {
                    const cardTitle = card.querySelector('h2').textContent;
                    let shouldShow = false;

                    if (subjectGroups[filters.subject]) {
                        shouldShow = subjectGroups[filters.subject].includes(cardTitle);
                    } else {
                        shouldShow = cardTitle === filters.subject;
                    }

                    card.style.display = shouldShow ? 'block' : 'none';
                    if (shouldShow) hasVisibleCards = true;
                });

                // Скрываем все тесты при выборе предмета
                testCards.forEach(card => {
                    card.style.display = 'none';
                });
            }
            // Если выбран уровень - показываем только соответствующие тесты
            else if (filters.level !== 'all') {
                testCards.forEach(card => {
                    const cardLevel = card.querySelector('.course-text').textContent.replace('Уровень: ', '');
                    const shouldShow = cardLevel === filters.level;

                    card.style.display = shouldShow ? 'block' : 'none';
                    if (shouldShow) hasVisibleCards = true;
                });

                // Скрываем все курсы обучения при выборе уровня
                learningCards.forEach(card => {
                    card.style.display = 'none';
                });
            }

            noResultsMessage.style.display = hasVisibleCards ? 'none' : 'block';
        }

        document.addEventListener('click', () => {
            document.querySelectorAll('.dropdown-content').forEach(d => {
                d.style.display = 'none';
            });
        });
    }
});