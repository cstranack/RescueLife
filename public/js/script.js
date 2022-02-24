
const usernameField = document.querySelector("#username");
const signUpSubmit = document.querySelector("#signUpSubmit");
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');

if(typeof (signUpSubmit) != 'underfined' && signUpSubmit != null){
    signUpSubmit.addEventListener('click', (e) => {
        if (usernameField.value === '') {
            e.preventDefault();
            window.alert('Form Requires Username');
        }
        if(password.value != confirmPassword.value){
            e.preventDefault();
            window.alert('Passwords do not match');
        }
    });

}


const messageContainer = document.querySelector(".messageContainer");
const queryString = window.location.search;

if(queryString == '?incorrectLogin'){
    messageContainer.innerHTML = `<div class="card-panel red">
        <span class="card-title ">Incorrect Login Details</span>
    </div>`;
}

if(queryString == '?contactSaved'){
    messageContainer.innerHTML = `<div class="card-panel green">
        <span class="card-title ">Contact Saved</span>
    </div>`;
}
