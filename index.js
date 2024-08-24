const uppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseCharacters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "~`!@#$%^&*()-_+={}[]|:;<>,.?/";

document.getElementById('generate-btn').addEventListener('click', function() {
    const length = parseInt(document.getElementById('password-length').value);
    const numberOfPasswords = parseInt(document.getElementById('number-of-passwords').value);
    const includeUppercase = document.getElementById('include-uppercase').checked;
    const includeLowercase = document.getElementById('include-lowercase').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;

    const passwordList = document.getElementById('password-list');
    passwordList.innerHTML = '';

    for (let i = 0; i < numberOfPasswords; i++) {
        const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
        const listItem = document.createElement('li');
        listItem.textContent = password;
        passwordList.appendChild(listItem);
    }

    const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    document.getElementById('password-display').textContent = password;
    updateStrengthIndicator(password);
});

document.getElementById('save-btn').addEventListener('click', function() {
    const password = document.getElementById('password-display').textContent;
    if (password) {
        const blob = new Blob([password], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'password.txt';
        link.click();
        URL.revokeObjectURL(url);
    }
});


document.getElementById('copy-btn').addEventListener('click', function() {
    const password = document.getElementById('password-display').textContent;
    navigator.clipboard.writeText(password).then(() => {
        const copyBtn = document.getElementById('copy-btn');
        copyBtn.textContent = 'Copied!';
        copyBtn.style.backgroundColor = '#28a745';

        setTimeout(() => {
            copyBtn.textContent = 'Copy to Clipboard';
            copyBtn.style.backgroundColor = '#007bff';
        }, 1500);
    });
});

document.getElementById('toggle-visibility-btn').addEventListener('click', function() {
    const passwordDisplay = document.getElementById('password-display');
    const toggleBtn = document.getElementById('toggle-visibility-btn');
    
    if (passwordDisplay.style.webkitTextSecurity === 'disc') {
        passwordDisplay.style.webkitTextSecurity = 'none';
        toggleBtn.textContent = 'Hide Password';
    } else {
        passwordDisplay.style.webkitTextSecurity = 'disc';
        toggleBtn.textContent = 'Show Password';
    }
});

document.getElementById('random-length-btn').addEventListener('click', function() {
    const randomLength = Math.floor(Math.random() * (20 - 8 + 1)) + 8;
    document.getElementById('password-length').value = randomLength;
});

function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
    let characters = '';
    if (includeUppercase) characters += uppercaseCharacters;
    if (includeLowercase) characters += lowercaseCharacters;
    if (includeNumbers) characters += numberCharacters;
    if (includeSymbols) characters += symbolCharacters;

    if (characters === '') return '';

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

function updateStrengthIndicator(password) {
    const strengthIndicator = document.getElementById('strength-indicator');
    const strengthBar = document.getElementById('strength-bar');
    let strength = 'Weak';
    let strengthPercentage = 0;
    let barColor = '#ff4d4d';

    if (password.length > 8 && 
        /[A-Z]/.test(password) && 
        /[a-z]/.test(password) && 
        /[0-9]/.test(password) && 
        /[~`!@#$%^&*()\-_=+{}\[\]\|:;<>,.?\/]/.test(password)) {
        strength = 'Strong';
        strengthPercentage = 100;
        barColor = '#28a745';
    } else if (password.length > 6) {
        strength = 'Medium';
        strengthPercentage = 66;
        barColor = '#ffc107';
    }

    strengthIndicator.textContent = `Strength: ${strength}`;
    strengthBar.style.width = `${strengthPercentage}%`;
    strengthBar.style.backgroundColor = barColor;
}
