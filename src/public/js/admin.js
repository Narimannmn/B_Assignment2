// admin-scripts.js

document.addEventListener('DOMContentLoaded', function () {
    const limitSelect = document.getElementById('limit');

    function updatePaginationLinks(selectedValue) {
        const paginationLinks = document.querySelectorAll('.pagination a');
        paginationLinks.forEach(link => {
            const currentPage = link.getAttribute('data-page');
            link.href = `/admin?p=${currentPage}&l=${selectedValue}`;
        });
    }

    updatePaginationLinks(limitSelect.value);

    limitSelect.addEventListener('change', function () {
        const selectedValue = limitSelect.value;
        window.location.href = `/admin?p=1&l=${selectedValue}`;
        updatePaginationLinks(selectedValue);
    });
});

function openEditModal(id, adults, children, price, img1, img2, img3, dateArrival, dateDeparture) {
    var form = document.getElementById("updateForm");
    form.action = `/admin/update/${id}`;

    document.getElementById('editAdults').value = parseInt(adults);
    document.getElementById('editChildren').value = parseInt(children);
    document.getElementById('editPrice').value = parseInt(price);
    document.getElementById('editImg1').value = img1;
    document.getElementById('editImg2').value = img2;
    document.getElementById('editImg3').value = img3;

    const dateArrivalFormatted = new Date(dateArrival).toISOString().split('T')[0];
    document.getElementById('editDateArrival').value = dateArrivalFormatted;

    const dateDepartureFormatted = new Date(dateDeparture).toISOString().split('T')[0];
    document.getElementById('editDateDeparture').value = dateDepartureFormatted;

    var updateModal = new bootstrap.Modal(document.getElementById('updateTourModal'));
    updateModal.show();
}

function removeTour(id) {
    if (confirm('Are you sure you want to delete this tour?')) {
        fetch(`/admin/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Delete successful', data);
                window.location.reload(); // Reload the page to update the list of tours
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
