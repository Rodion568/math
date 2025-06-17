document.addEventListener('DOMContentLoaded', function() {
    const allTestCards = Array.from(document.querySelectorAll('.course-card')).filter(card => card.querySelector('.course-text'));
    
    // Группировка предметов
    const subjectGroups = {
        'Арифметика': ['Арифметика'],
        'Математика': ['Математика'],
        'Цифровая математика': ['Цифровая математика']
    };

    // Handle "Начать тест" buttons
    document.querySelectorAll('.start-lesson-button').forEach(button => {
        button.addEventListener('click', function() {
            const courseCard = this.closest('.course-card');
            const courseTitle = courseCard.querySelector('h2').textContent;
            const courseLevel = courseCard.querySelector('.course-text').textContent;
            alert(`Начинаем тест по "${courseTitle}" (${courseLevel})`);
        });
    });

    initFilters();

    function initFilters() {
        const filters = {
            subject: 'all',
            level: 'all'
        };

        // Инициализация фильтра по предметам
        const subjectDropdown = document.querySelector('.subject-dropdown');
        if (subjectDropdown) {
            const subjectBtn = subjectDropdown.querySelector('.dropdown-btn');
            const subjectContent = subjectDropdown.querySelector('.dropdown-content');

            subjectBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                subjectContent.style.display = subjectContent.style.display === 'block' ? 'none' : 'block';
            });

            subjectDropdown.querySelectorAll('.dropdown-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const value = item.getAttribute('data-value');
                    filters.subject = value;
                    subjectBtn.textContent = value === 'all' ? 'Выберите предмет' : item.textContent;
                    subjectContent.style.display = 'none';
                    applyFilters();
                });
            });
        }

        // Инициализация фильтра по уровням
        const levelDropdown = document.querySelector('.level-dropdown');
        if (levelDropdown) {
            const levelBtn = levelDropdown.querySelector('.dropdown-btn');
            const levelContent = levelDropdown.querySelector('.dropdown-content');

            levelBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                levelContent.style.display = levelContent.style.display === 'block' ? 'none' : 'block';
            });

            levelDropdown.querySelectorAll('.dropdown-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const value = item.getAttribute('data-value');
                    filters.level = value;
                    levelBtn.textContent = value === 'all' ? 'Уровень знаний' : item.textContent;
                    levelContent.style.display = 'none';
                    applyFilters();
                });
            });
        }

        function applyFilters() {
            let hasVisibleCards = false;
            const noResultsMessage = document.querySelector('.no-results-message');

            allTestCards.forEach(card => {
                const cardTitle = card.querySelector('h2').textContent;
                const cardLevel = card.querySelector('.course-text').textContent.replace('Уровень: ', '');
                
                // Проверка фильтра по предмету
                const subjectMatch = filters.subject === 'all' || 
                                   (subjectGroups[filters.subject] && 
                                    subjectGroups[filters.subject].includes(cardTitle));
                
                // Проверка фильтра по уровню
                const levelMatch = filters.level === 'all' || cardLevel === filters.level;
                
                const shouldShow = subjectMatch && levelMatch;
                
                card.style.display = shouldShow ? 'block' : 'none';
                if (shouldShow) hasVisibleCards = true;
            });

            noResultsMessage.style.display = hasVisibleCards ? 'none' : 'block';
        }

        document.addEventListener('click', () => {
            document.querySelectorAll('.dropdown-content').forEach(d => {
                d.style.display = 'none';
            });
        });

        // Initial application of filters
        applyFilters();
    }
});