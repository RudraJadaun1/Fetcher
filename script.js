// script.js
function validatePassword() {
    const password = document.getElementById('password').value;
    const correctPassword = 'your_secure_password'; // Change this to your secure password

    if (password === correctPassword) {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        loadData();
    } else {
        alert('Incorrect password!');
    }
}

function loadData() {
    const data = 'Your secure data goes here...'; // Replace with actual data fetching logic
    document.getElementById('data').innerText = data;
}
