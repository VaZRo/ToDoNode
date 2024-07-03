function validatePasswords() {
    let password = document.getElementById('password');
    let repeatedPassword = document.getElementById('repeated-password');

    let regexTemplate = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6}$/;


    if(!regexTemplate.test(password)){
        alert("Passrod must have 1 Capital letter, 1 symbol and 1 number");
        return false;
    }
    if(password != repeatedPassword){
        alert("Passwords must match");
        return false;
    }

    return true;
}