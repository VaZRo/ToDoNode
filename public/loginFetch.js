document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('/users/login', {
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
})