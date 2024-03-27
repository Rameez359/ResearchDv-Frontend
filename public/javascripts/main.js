// Get the modal
var modal = document.getElementById('myModal');
var btn = document.getElementById('create-account');

// btn.onclick = function () {
//     var newColor = 'lightblue';
//     document.body.style.backgroundColor = newColor;
//     modal.style.display = 'block';
// };

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

const OpenSignUpModal = () => {
    console.log('sign up button clicked');

    document.getElementById('modal-content-step-two').classList.add('display-none');
    document.getElementById('modal-content-step-three').classList.add('display-none');
    document.getElementById('sign-in').classList.add('display-none');

    document.getElementById('modal-content-step-one').classList.remove('display-none');
    modal.style.display = 'block';
};

const OpenSignInModal = () => {
    console.log('sign in button clicked');
    document.getElementById('modal-content-step-one').classList.add('display-none');
    document.getElementById('modal-content-step-two').classList.add('display-none');
    document.getElementById('modal-content-step-three').classList.add('display-none');

    document.getElementById('sign-in').classList.remove('display-none');
    modal.style.display = 'block';
};

const closeModal = () => {
    console.log('Working');
    modal.style.display = 'none';
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const checkEmail = () => {
    const email = document.getElementById('email').value;
    if (!isValidEmail(email)) {
        displayError('inValidEmail', '*Please Enter Valid Email Address.');
        return false;
    }
    removeError('inValidEmail')
    return true;
};

const validateNumberInput = (input) => {
    input.value = input.value.replace(/\D/g, '');
};

function playError() {
    const audio = new Audio('audios/error.mp3'); // Replace with the path to your audio file
    audio.play();
}

function displayError(messageId, errorMessage) {
    playError();
    const errorElement = document.getElementById(messageId);
    errorElement.innerHTML = `<div class="error">${errorMessage}</div>`;
    errorElement.classList.remove('display-none');
}
function removeError(messageId) {
    const errorElement = document.getElementById(messageId);
    errorElement.classList.add('display-none');
}

function autoExpand(element) {
    element.style.height = 'auto';
    element.style.height = (element.scrollHeight) + 'px';
}

var dayDropdown = document.getElementById('day');
var monthDropdown = document.getElementById('month');
var yearDropdown = document.getElementById('year');
var currentYear = new Date().getFullYear();

for (var i = 1; i <= 31; i++) {
    var option = document.createElement('option');
    option.value = i;
    option.text = i;
    dayDropdown.add(option);
}

for (var i = currentYear; i >= currentYear - 100; i--) {
    var option = document.createElement('option');
    option.value = i;
    option.text = i;
    yearDropdown.add(option);
}
