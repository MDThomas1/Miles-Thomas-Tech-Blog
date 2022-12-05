const loginButton = document.querySelector('#login-button')
const signUpButton = document.querySelector('#signup-button')
const logoutButton = document.querySelector('#logout-button')

    const userSignup = async (event) => {
        event.preventDefault();

        const username = document.querySelector('#username-signup').value.trim();
        const password = document.querySelector('#password-signup').value.trim();

        if (username && password) {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            })

            if (response.ok) {
                document.location.replace('/');
            } else {
                alert('It looks like there is something wrong with the details you have provided. Please try again.')  
            };
        };
    };

    signUpButton.addEventListener('submit', userSignup);


    const userLogin = async (event) => {
        event.preventDefault();

        const username = document.querySelector('#username-login').value.trim();
        const password = document.querySelector('#password-login').value.trim();

        if (username && password) {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ usename, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                alert('Username or password is incorrect! Please try again!')  
            };
        };
    };

    loginButton.addEventListener('submit', userLogin);


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
