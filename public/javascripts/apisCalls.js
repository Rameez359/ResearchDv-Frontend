const SERVER_URL = 'http://localhost:3000';
const CLIENT_URL = 'http://localhost:3001';

const registerStepOne = async () => {
    try {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const month = document.getElementById('month').value;
        const day = document.getElementById('day').value;
        const year = document.getElementById('year').value;

        if (!(name && email && month && day && year)) {
            displayError('register-error', '*Incomplete information. Please fill out all fields.');
            return false;
        }
        if (!isValidEmail(email)) {
            displayError('inValidEmail', '*Please Enter Valid Email Address.');
            return false;
        }
        const dateOfBirth = new Date(`${year}-${month}-${day}`);
        console.log(dateOfBirth);

        const verifyAccount = await getData(`${SERVER_URL}/checkDuplicateAccount`, { email });
        if (verifyAccount.requestStatus !== 'TRUE') {
            displayError(
                'register-error',
                '*This email is already registered. Please sign in or use a different email to create a new account.'
            );
            return false;
        }
        const data = {
            name: name,
            email: email,
            dateOfBirth: dateOfBirth,
        };
        const response = await postData(`${SERVER_URL}/localSignupStepOne`, data);
        console.log('Success:', response);

        if (response.statusCode === 201) {
            console.log(response.response.userId,"checking")
            localStorage.setItem('userId', `${response.response.userId}`);
        }
        document.getElementById('modal-content-step-one').classList.add('display-none');
        document.getElementById('modal-content-step-three').classList.remove('display-none');
    } catch (error) {
        console.error(`Error in registration step one: ${error}`);
    }
};

const registerStepTwo = async () => {
    try {
        const code = document.getElementById('verification-code').value;
        if (code) {
            const userId = localStorage.getItem('userId');
            const data = {
                code: code,
                userId: userId,
            };

            const response = await postData(`${SERVER_URL}/localSignupStepTwo`, data);
            console.log('Success:', response);

            if (response.statusCode === 200) {
                document.getElementById('modal-content-step-two').classList.add('display-none');
                document.getElementById('modal-content-step-three').classList.remove('display-none');
            }
        } else {
            playError();
            document.getElementById('code-error').classList.remove('display-none');
            return false;
        }
    } catch (error) {
        console.log(`Error in verifying code: ${error}`);
    }
};

const registerStepThree = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPass = document.getElementById('confirm-password').value;
    if (!(username && password && confirmPass)) {
        displayError('username-error', '*Incomplete information. Please fill out all fields.');
        return false;
    }

    if (!(password === confirmPass)) {
        displayError('username-error', '*Password mismatch. Please ensure that both entered passwords match.');
        return false;
    }

    const checkUsername = await postData(`${SERVER_URL}/checkDuplicateUsername`, { username });

    if (checkUsername.requestStatus === 'FALSE') {
        displayError('username-error', '**This username is already register.');
        return false;
    } else {
        const userId = localStorage.getItem('userId');
        const data = {
            username: username,
            userId: userId,
            password: password,
        };

        const response = await postData(`${SERVER_URL}/localSignupStepThree`, data);
        console.log('Success:', response);
        closeModal();
    }
};

const signIn = async () => {
    const username_mail = document.getElementById('username-mail').value;
    const password = document.getElementById('user-password').value;
    if (!(username_mail && password)) {
        displayError('signin-error', '*Incomplete information. Please fill out all fields.');
        return false;
    }

    const data = {
        username_mail: username_mail,
        password: password,
    };
    const checkUser = await postData(`${SERVER_URL}/localSignIn`, data);
    
    if (checkUser.statusCode === 200) {
        console.log(JSON.stringify(checkUser));
        localStorage.clear(); 
        localStorage.setItem('userId', `${checkUser.response.userId}`);
        localStorage.setItem('signInToken', `${checkUser.response.token}`);

        window.location.href = '/dashboard';
    } 
    else if (checkUser.statusCode === 404) {
        displayError('signin-error', '*'+checkUser.response);
    }
    else if (checkUser.statusCode === 401) {
        displayError('signin-error', '*'+checkUser.response);
    }
};
