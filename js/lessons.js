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