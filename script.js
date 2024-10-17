document.addEventListener('DOMContentLoaded', loadRecords);

document.getElementById('attendanceForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const periods = document.getElementById('periods').value;
    const carType = document.getElementById('carType').value;

    const record = { date, periods, carType };

    // Save to local storage
    let attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
    attendanceRecords.push(record);
    localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));

    // Show result
    document.getElementById('result').innerText = `Record saved! Date: ${date}, Periods: ${periods}, Car Type: ${carType}`;

    // Reload records
    loadRecords();
    
    this.reset(); // Clear the form
});

function loadRecords() {
    const records = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results

    records.forEach(record => {
        const p = document.createElement('p');
        p.innerText = `Date: ${record.date}, Periods: ${record.periods}, Car Type: ${record.carType}`;
        resultDiv.appendChild(p);
    });
}

document.getElementById('downloadBtn').addEventListener('click', function() {
    const records = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
    
    if (records.length === 0) {
        alert('No records to download.');
        return;
    }

    let htmlContent = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Attendance Records</title></head><body>';
    htmlContent += '<h1>Attendance Records</h1>';
    htmlContent += '<table border="1"><tr><th>Date</th><th>Number of Periods</th><th>Car Type</th></tr>';

    records.forEach(record => {
        htmlContent += `<tr><td>${record.date}</td><td>${record.periods}</td><td>${record.carType}</td></tr>`;
    });

    htmlContent += '</table></body></html>';

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance_records.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
