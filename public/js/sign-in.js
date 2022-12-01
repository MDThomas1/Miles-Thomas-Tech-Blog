const signUpForm = document.querySelector('.signup-form')
const loginForm = document.querySelector('.login-form')
const logoutButton = document.querySelector('#logout-button')

if (signUpForm) {
    const userSignup = async (event) => {
        event.preventDefault();

        const username = document.querySelector('#username-signup').value.trim();
        const email = document.querySelector('#email-signup').value.trim();
        const password = document.querySelector('#password-signup').value.trim();
        const communication = document.querySelector('#message')

        if (username && email && password) {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: { 'Content-Type': 'application/json' },
            })

            if (response.ok) {
                document.location.replace('/');
            } else {
                communication.textContent = 'It looks like there is something wrong with the details you have provided. Please try again.'  
            };
        };
    };

    signUpForm.addEventListener('submit', userSignup);
}

if (loginForm) {
    const communication = document.querySelector('#message')

    const userLogin = async (event) => {
        event.preventDefault();

        const email = document.querySelector('#email-login').value.trim();
        const password = document.querySelector('#password-login').value.trim();

        if (email && password) {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                const data = await response.json()
                communication.textContent = data.message  
            };
        };
    };

    loginForm.addEventListener('submit', userLogin);
}

if (logoutButton) {
    const userLogout = async () => {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        };
    };

    logoutButton.addEventListener('click', userLogout);
};