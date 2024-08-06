const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

document.getElementById('generate-btn').addEventListener('click', function() {
    const passwordLength = document.getElementById('password-length').value;
    const password = generatePassword(passwordLength);
    document.getElementById('password-display').textContent = password;
    updateStrengthIndicator(password);
});

document.getElementById('copy-btn').addEventListener('click', function() {
    const password = document.getElementById('password-display').textContent;
    navigator.clipboard.writeText(password).then(() => {
        alert('Password copied to clipboard');
    });
});

function generatePassword(length) {
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
