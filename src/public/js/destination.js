document.addEventListener('DOMContentLoaded', function () {
    const limitSelect = document.getElementById('limit');

    function updatePaginationLinks(selectedValue) {
        const paginationLinks = document.querySelectorAll('.pagination a');
        paginationLinks.forEach(link => {
            const currentPage = link.getAttribute('data-page');
            link.href = `/destination?p=${currentPage}&l=${selectedValue}`;
        });
    }

    updatePaginationLinks(limitSelect.value);

    limitSelect.addEventListener('change', function () {
        const selectedValue = limitSelect.value;
        window.location.href = `/destination?p=1&l=${selectedValue}`;
        updatePaginationLinks(selectedValue);
    });


});

