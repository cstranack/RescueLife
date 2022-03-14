
const usernameField = document.querySelector("#username");
const signUpSubmit = document.querySelector("#signUpSubmit");
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
var noUsernameAlert = document.getElementsByClassName("hiddenUsernameErrorAlert");
var noPasswordAlert = document.getElementsByClassName("hiddenPasswordErrorAlert");

//this code prevents empty fields being submitted to the database
if(typeof (signUpSubmit) != 'underfined' && signUpSubmit != null){
    signUpSubmit.addEventListener('click', (e) => {
        if(usernameField.value === ''){
            console.log("xxx");
            e.preventDefault();
            // toggle class to show 'no username' alert
              noUsernameAlert[0].style.display = "inline-block";   
        }
        else{
          noUsernameAlert[0].style.display = "none"; 
        }
  
        if(password.value != confirmPassword.value){
            e.preventDefault();
            console.log("bbb");
            var noPasswordAlert = document.getElementsByClassName("hiddenPasswordErrorAlert");
            // toggle class to show 'passwords dont match' alert
              noPasswordAlert[0].style.display = "inline-block";
        }
        else{
          noPasswordAlert[0].style.display = "none"; 
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


// flip card signUp

// var card = document.getElementById('signInCard');

// document.getElementById('flip').addEventListener('click', function() {
//     card.classList.toggle('flipped');
// }, false);

// function change() 
// {
//     var elem = document.getElementById("flip");
//     if (elem.value=="Don't have an account? Sign up here") elem.value = "Have an account? Login here";
//     else if (elem.value == "Have an account? Login here") elem.value = "Don't have an account? Sign up here";
// }


// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.collapsible');
//     var instances = M.Collapsible.init(elems, options);
//   });


//   hinding parts of the form 
function hideSpecies() {
    if (document.getElementById("Other").checked == true){
        (document.getElementById("SpeciesPetForm")).show();
    } else {
        (document.getElementById("SpeciesPetForm")).hide();
      }
    }



 


  
