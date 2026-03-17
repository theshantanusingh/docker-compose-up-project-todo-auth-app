const API_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
    // Signup form handler
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const messageDiv = document.getElementById('auth-message');
            const submitBtn = signupForm.querySelector('button');
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                submitBtn.innerText = 'Creating account...';
                submitBtn.disabled = true;

                const response = await fetch(`${API_URL}/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    messageDiv.innerText = 'Signup successful! Redirecting...';
                    messageDiv.className = 'success-msg';
                    localStorage.setItem('done_token', data.token);
                    setTimeout(() => window.location.href = 'profile.html', 1500);
                } else {
                    messageDiv.innerText = data.error || 'Signup failed';
                    messageDiv.className = 'error-msg';
                    submitBtn.innerText = 'Get Started';
                    submitBtn.disabled = false;
                }
            } catch (err) {
                messageDiv.innerText = 'Server error. Please try again.';
                messageDiv.className = 'error-msg';
                submitBtn.innerText = 'Get Started';
                submitBtn.disabled = false;
            }
        });
    }

    // Login form handler
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const messageDiv = document.getElementById('auth-message');
            const submitBtn = loginForm.querySelector('button');
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                submitBtn.innerText = 'Signing in...';
                submitBtn.disabled = true;

                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    messageDiv.innerText = 'Login successful! Redirecting...';
                    messageDiv.className = 'success-msg';
                    localStorage.setItem('done_token', data.token);
                    setTimeout(() => window.location.href = 'profile.html', 1500);
                } else {
                    messageDiv.innerText = data.error || 'Login failed';
                    messageDiv.className = 'error-msg';
                    submitBtn.innerText = 'Sign In';
                    submitBtn.disabled = false;
                }
            } catch (err) {
                messageDiv.innerText = 'Server error. Please try again.';
                messageDiv.className = 'error-msg';
                submitBtn.innerText = 'Sign In';
                submitBtn.disabled = false;
            }
        });
    }

    // Logout handler
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('done_token');
            window.location.href = 'index.html';
        });
    }
});
