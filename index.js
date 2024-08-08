const uppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseCharacters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "~`!@#$%^&*()-_+={}[]|:;<>,.?/";

document.getElementById('generate-btn').addEventListener('click', function() {
    const length = parseInt(document.getElementById('password-length').value);
    const includeUppercase = document.getElementById('include-uppercase').checked;
    const includeLowercase = document.getElementById('include-lowercase').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;

    const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    document.getElementById('password-display').textContent = password;
    updateStrengthIndicator(password);
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
    let strength = 'Weak';

    if (password.length > 8 && 
        /[A-Z]/.test(password) && 
        /[a-z]/.test(password) && 
        /[0-9]/.test(password) && 
        /[~`!@#$%^&*()\-_=+{}\[\]\|:;<>,.?\/]/.test(password)) {
        strength = 'Strong';
    } else if (password.length > 6) {
        strength = 'Medium';
    }

    strengthIndicator.textContent = `Strength: ${strength}`;
}
