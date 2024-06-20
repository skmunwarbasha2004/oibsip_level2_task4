document.addEventListener('DOMContentLoaded', function () {
    showLoginForm();
    if (localStorage.getItem('loggedInUser')) {
        showSecuredPage(localStorage.getItem('loggedInUser'));
    }
});

function showRegisterForm() {
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('secured-page').style.display = 'none';
}

function showLoginForm() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('secured-page').style.display = 'none';
}

function showSecuredPage(username) {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('secured-page').style.display = 'block';
    document.getElementById('user-name').innerText = username;
}

function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    
    if (username === '' || password === '') {
        alert('Please fill in all fields');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find(user => user.username === username);
    
    if (userExists) {
        alert('User already exists');
        return;
    }
    
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful');
    showLoginForm();
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    if (username === '' || password === '') {
        alert('Please fill in all fields');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);
    
    if (!user) {
        alert('Invalid username or password');
        return;
    }
    
    localStorage.setItem('loggedInUser', username);
    showSecuredPage(username);
}

function logout() {
    localStorage.removeItem('loggedInUser');
    showLoginForm();
}
