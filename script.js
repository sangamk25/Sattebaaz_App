// function validateEmail(email) {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// }





function submitForm(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    // const email = document.getElementById('email').value;
    // const password = document.getElementById('password').value;

    // Simple validation
    if (username.trim() === '') {
        alert('Please enter a valid username.');
        return;
    }

    // if (email.trim() === '' || !validateEmail(email)) {
    //     alert('Please enter a valid email address.');
    //     return;
    // }

    // if (password.trim() === '') {
    //     alert('Please enter a valid password.');
    //     return;
    // }
    
    var isFormValid = false;
    if (username.trim() === 'sattebaaz') {
        isFormValid=true;
    }

    if (isFormValid) {
        
        // Redirect to the next page after form submission
        window.alert("Successfully registered!");

        window.location.href = "profile_ui.html";
    }
    else{
        alert('Please enter a valid username.');
        return;
    }

    // console.log('Username:', username);
    // console.log('Email:', email);
    // console.log('Password:', password);
}




