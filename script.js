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
    
    this.reset(); // Clear the form
});
