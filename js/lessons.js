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



document.addEventListener('DOMContentLoaded', function () {
    // Текущие выбранные фильтры
    const filters = {
        subject: 'all',
        level: 'all',
        format: 'all'
    };

    // Инициализация dropdown-меню
    function initDropdowns() {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            const btn = dropdown.querySelector('.dropdown-btn');
            const content = dropdown.querySelector('.dropdown-content');

            // Обработчик клика по кнопке
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
            });

            // Обработчики для элементов dropdown
            dropdown.querySelectorAll('.dropdown-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const value = item.getAttribute('data-value');

                    // Определяем тип фильтра
                    if (dropdown.classList.contains('subject-dropdown')) {
                        filters.subject = value;
                        btn.textContent = value === 'all' ? 'Выберите предмет' : item.textContent;
                    }
                    else if (dropdown.classList.contains('level-dropdown')) {
                        filters.level = value;
                        btn.textContent = value === 'all' ? 'Уровень знаний' : item.textContent;
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

        // Закрытие dropdown при клике вне его
        document.addEventListener('click', () => {
            document.querySelectorAll('.dropdown-content').forEach(d => {
                d.style.display = 'none';
            });
        });
    }

    // Применение фильтров
    function applyFilters() {
        const cards = document.querySelectorAll('.course-card');
        let hasVisibleCards = false;

        cards.forEach(card => {
            const cardSubject = card.querySelector('h2').textContent;
            const cardLevel = card.querySelector('.course-text:nth-of-type(1)').textContent.replace('Уровень: ', '');
            const cardFormat = card.querySelector('.course-text:nth-of-type(2)').textContent.replace('Формат обучения: ', '');

            // Проверяем соответствие фильтрам
            const subjectMatch = filters.subject === 'all' || cardSubject.includes(filters.subject);
            const levelMatch = filters.level === 'all' || cardLevel === filters.level;
            const formatMatch = filters.format === 'all' || cardFormat === filters.format;

            // Показываем/скрываем карточку
            if (subjectMatch && levelMatch && formatMatch) {
                card.style.display = 'block';
                hasVisibleCards = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Показываем или скрываем сообщение "Ничего не найдено"
        const noResultsMessage = document.querySelector('.no-results-message');
        if (noResultsMessage) {
            noResultsMessage.style.display = hasVisibleCards ? 'none' : 'block';
        }
    }

    // Инициализация
    initDropdowns();
});