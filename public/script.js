const validatePasswords = () => {
    let password = document.getElementById('password').value;
    let repeatedPassword = document.getElementById('repeated-password').value;

    let regexTemplate = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;


    if(!regexTemplate.test(password)){
        console.log(password);
        console.log(regexTemplate.test(password));
        alert("Password must have 1 Capital letter, 1 symbol and 1 number");
        return false;
    }
    if(password != repeatedPassword){
        alert("Passwords must match");
        return false;
    }

    return true;
}

document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    if(validatePasswords()){
        fetch('/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            const errorPlaceholder = document.getElementById('error-message');
            if(data.error){
                errorPlaceholder.textContent = data.error;
                errorPlaceholder.style.display = 'block';
            }
            else if(data.redirectUrl){
                errorPlaceholder.style.display = 'none';
                window.location.href = data.redirectUrl;
            }
        })
        .catch((error) => {
            console.log('Error: ', error);
        })
    }
})


