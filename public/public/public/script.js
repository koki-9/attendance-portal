document.getElementById('attendanceForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const periods = document.getElementById('periods').value;
    const carType = document.getElementById('carType').value;

    const data = { date, periods, carType };

    fetch('/api/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('attendanceForm').reset(); // Clear the form
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
