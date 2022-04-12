
const usernameField = document.querySelector("#username");
const signUpSubmit = document.querySelector("#signUpSubmit");
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
var noUsernameAlert = document.getElementsByClassName("hiddenUsernameErrorAlert");
var noPasswordAlert = document.getElementsByClassName("hiddenPasswordErrorAlert");

var globalVariable = {
  dogs: false
}

//this code prevents empty fields being submitted to the database
if (typeof (signUpSubmit) != 'underfined' && signUpSubmit != null) {
  signUpSubmit.addEventListener('click', (e) => {
    if (usernameField.value === '') {
      console.log("xxx");
      e.preventDefault();
      // toggle class to show 'no username' alert
      noUsernameAlert[0].style.display = "inline-block";
    }
    else {
      noUsernameAlert[0].style.display = "none";
    }

    if (password.value != confirmPassword.value) {
      e.preventDefault();
      console.log("bbb");
      var noPasswordAlert = document.getElementsByClassName("hiddenPasswordErrorAlert");
      // toggle class to show 'passwords dont match' alert
      noPasswordAlert[0].style.display = "inline-block";
    }
    else {
      noPasswordAlert[0].style.display = "none";
    }
  });
}


const messageContainer = document.querySelector(".messageContainer");
const queryString = window.location.search;

if (queryString == '?incorrectLogin') {
  messageContainer.innerHTML = `<div class="card-panel red">
        <span class="card-title ">Incorrect Login Details</span>
    </div>`;
}

if (queryString == '?contactSaved') {
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
  if (document.getElementById("Other").checked == true) {
    (document.getElementById("SpeciesPetForm")).show();
  } else {
    (document.getElementById("SpeciesPetForm")).hide();
  }
}

var dogs

// determining what filters have been activated

function dogValidate(dogs) {
  if (document.getElementById("dogSwitch").checked) {
    console.log("dog on")
    dogs = true;
    return dogs;
  } else {
    console.log("dog off")
    dogs = false;
    return dogs;
  }
}

console.log(dogs)


function catValidate() {
  if (document.getElementById("catSwitch").checked) {
    console.log("cat on")
  } else {
    console.log("cat off")
  }
}

function equineValidate() {
  if (document.getElementById("equineSwitch").checked) {
    console.log("equine on")
  } else {
    console.log("equine off")
  }
}

function otherValidate() {
  if (document.getElementById("otherSwitch").checked) {
    console.log("other on")
  } else {
    console.log("other off")
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // var elems = document.querySelectorAll('.modal');
  // var instances = M.Modal.init(elems);

  var url = '/getImages';
  var imageContainer = document.querySelector('#imageContainer')
  fetch(url)
    .then(res => res.json())
    .then((data) => {
      var dataFeed = data.map((image) => {
        return `
        <img class="petImage" src="${image.path}" alt="image of cat">`
      }).join(" ");
      imageContainer.innerHTML = dataFeed;
    });
});



document.addEventListener('DOMContentLoaded', function () {
  var url = '/getPets';
  var petContainer = document.querySelector('#petContainer')
  fetch(url)
    .then(res => res.json())
    .then((data) => {
      var dataFeed = data.map((pet) => {
        return `
        <div class="card petDashCard">
    <div class="row">
        <div class="col s6">
        <img class="petImage" src="${pet.path}" alt="Pet Image">
        </div>
        <div class="col s6">
            <span class="card-title">${pet.petName}</span>
            <p><b>Type:</b> ${pet.category}</p>
            <p><b>Age:</b> ${pet.age} year(s)</p>
            <p><b>Breed:</b> ${pet.breed}</p>
            <p><b>About:</b> ${pet.description}</p>
        </div>
    </div>
</div>
        `

      }).join(" ");
      petContainer.innerHTML = dataFeed;
    });
});









/* <div class="col s12 m2 l3">
<div class="card">
  <img class="petImage" src="${image.path}" alt="image of cat">
  <p>${image.title}</p>
  <p>${image.description}</p>
</div>
</div> */









