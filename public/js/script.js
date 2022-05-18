



const usernameField = document.querySelector("#username");
const signUpSubmit = document.querySelector("#signUpSubmit");
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
var noUsernameAlert = document.getElementsByClassName("hiddenUsernameErrorAlert");
var noPasswordAlert = document.getElementsByClassName("hiddenPasswordErrorAlert");




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


// //   hinding parts of the form 
// function hideSpecies() {
//   if (document.getElementById("Other").checked == true) {
//     (document.getElementById("SpeciesPetForm")).show();
//   } else {
//     (document.getElementById("SpeciesPetForm")).hide();
//   }
// }

var dog

// determining what filters have been activated

function dogValidate() {
  if (document.getElementById("dogSwitch").checked) {
    // console.log("dog on")
    dog = true
  } else {
    // console.log("dog off")
    dog = false
  
  }
}

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

// document.addEventListener('DOMContentLoaded', function () {
//   var elems = document.querySelectorAll('.modal');
//   var instances = M.Modal.init(elems);

//   var url = '/getImages';
//   var imageContainer = document.querySelector('#imageContainer')
//   fetch(url)
//     .then(res => res.json())
//     .then((data) => {
//       var dataFeed = data.map((image) => {
//         return `
//         <img class="petImage" src="${image.path}" alt="image of cat">`
//       }).join(" ");
//       imageContainer.innerHTML = dataFeed;
//     });
// });

switchArray =[]

document.addEventListener('DOMContentLoaded', function () {
  var url = '/getAdoptablePets';
  var petContainer = document.querySelector('#petContainer')
  fetch(url)
    .then(res => res.json())
    .then((data) => {
      var dataFeed = data.map((pet) => {
        // if (document.getElementById("dogSwitch").checked) {
        //   // console.log("dog on")
        //   dog = true
        // } else {
        //   // console.log("dog off")
        //   dog = false
        
        // }
        // console.log(dog)

        // petArray = [pet]
        // for(var i = 0; i < petArray.length; i++){
        //   // console.log(petAray[i]);
        //   if(petArray[i].category == "dog"){
        //       // console.log(i + " is a dog")
        //       switchArray.push(petArray[i]);

        //   } 
        // }
        // console.log(switchArray)
        

        return `
        <div class="card petDashCard ">
    <div class="row valign-wrapper">
        <div class="col s6">
        <img class="petImage" src="${pet.path}" alt="Pet Image">
        </div>
        <div class="col s6">
            <span class="card-title">${pet.petName}</span>
            <p><b>Age:</b> ${pet.age} year(s)</p>
            <p><b>Breed:</b> ${pet.breed}, ${pet.category}</p>
            <p><b>About:</b> ${pet.description}</p>
        </div>
    </div>
</div>
        `

      }).join(" ");
      petContainer.innerHTML = dataFeed;
    });
});




//explore page 
document.addEventListener('DOMContentLoaded', function () {
  var url = '/getAllPets';
  var allPetsContainer = document.querySelector('#allPetsContainer')
  fetch(url)
    .then(res => res.json())
    .then((data) => {
      var dataFeed = data.map((pet) => {
        var dateField = document.querySelector('#dateField')
        // dateField.innerHTML = new Date(pet.date).toDateString()
        const petArray = [pet.path]
        console.log(petArray)
        // document.getElementById("imgs").src = "assets/cat.jpg".src;
        // document.getElementByClassName("sliderImages").innerHTML = "hello";
        
        // const petImg = ["hello","hello","hello"];

        // document.getElementById("imgs").innerHTML = petImg;

        // for(var i = 0; i < petImg.length; i++){
        //   document.getElementById("imgs").innerHTML = petImg;
          // console.log(petArray)
          
        //
        // console.log(imageArray)

      //   function LoadImages() {
      //     PetPic = new Image();
      //     PetPic.onload=function () {
      //         document["imgs"].src = "assets/cat.jpg";
      //     }
      //     searchPic.src = "assets/cat.jpg"; // This is correct and the path is correct
      // }


        //displaying the specific user profiles with all their pets 
        return `
          
            <a href="/profileTemplate/${pet.user}" ><img class="allPetImage" src="${pet.path[0]}" alt="Pet Image"></a>
        
        `
      
      }).join(" ");
      allPetsContainer.innerHTML = dataFeed;
    });
});



// document.addEventListener('DOMContentLoaded', function () {
//   var displayImageArray = document.getElementsByClassName("SliderImages")
//   for( var i = 0; i < req.files.length; i++ )

//   document.body.appendChild(displayImageArray);


  

// })









// document.addEventListener('DOMContentLoaded', function () {
//   var url = '/getUsersPets';
//   var usersPetsContainer = document.querySelector('#usersPetsContainer')
//   fetch(url)
//     .then(res => res.json())
//     .then((data) => {
//       var dataFeed = data.map((pet) => {
//         var newDate = new Date(pet.date).toDateString()

//         return `

//         <h1>${pet.petName}</h1>
  

//         <div class="row valign-wrapper">
//           <div class="col s2">
//             <button class="sliderButton" id="prev"><i class="material-icons">chevron_left</i></button>
//           </div>
//           <div class="col s8">
//             <img class="usersPetImage" src="${pet.path}" alt="Pet Image"/>
//             <br>
//             <div class="pictureDate">${newDate}</div>
//           </div>
//           <div class="col s2">
//               <button class="sliderButton" id="next"><i class="material-icons">chevron_right</i></button>
//           </div>
//         </div>
        
//         <br> 
//         <br>
       

//         <div class="row valign-wrapper">
//           <div class="col s10">
//             <div class="card usersPetCard">
//               <span class="card-title">${pet.petName}</span>
//               <p>${pet.petName} is a ${pet.age} year old ${pet.breed}</p>
//               <p><b>About:</b> ${pet.description}</p>
//             </div>
//           </div>
//           <div class="col s2">
//           <a href="/addImage/${pet._id}"><button class="editbutton">Edit Profile</button></a>
//           </div>


//         </div>
//         `
//       }).join(" "); 
//       usersPetsContainer.innerHTML = dataFeed;
//     });
// });





// document.addEventListener('DOMContentLoaded', function () {
//   var url = '/getPetProfile';
//   var petProfileContainer = document.querySelector('#petProfileContainer')
//   fetch(url)
//     .then(res => res.json())
//     .then((data) => {
//       var dataFeed = data.map((pet) => {
//         var newDate = new Date(pet.date).toDateString()
        
//         return `

//         <h1>${pet.petName}</h1>
        

//         <div class="row valign-wrapper">
//           <div class="col s2">
//             <button class="sliderButton" id="prev"><i class="material-icons">chevron_left</i></button>
//           </div>
//           <div class="col s8">
//             <img class="usersPetImage" src="${pet.path}" alt="Pet Image"/>
//             <br>
//             <div class="pictureDate">${newDate}</div>
//           </div>
//           <div class="col s2">
//               <button class="sliderButton" id="next"><i class="material-icons">chevron_right</i></button>
//           </div>
//         </div>
        
//         <br> 
//         <br>
       

//         <div class="row valign-wrapper">
//           <div class="col s10">
//             <div class="card usersPetCard">
//               <span class="card-title">${pet.petName}</span>
//               <p>${pet.petName} is a ${pet.age} year old ${pet.breed}</p>
//               <p><b>About:</b> ${pet.description}</p>
//             </div>
//           </div>
//           <div class="col s2">
//           <a href="/addImage/${pet._id}"><button class="editbutton">Edit Profile</button></a>
//           </div>


//         </div>
//         `
//       }).join(" "); 
//       petProfileContainer.innerHTML = dataFeed;
//     });
// });


/* <div class="buttonContainer"> */


/* <div class="col s12 m2 l3">
<div class="card">
  <img class="petImage" src="${image.path}" alt="image of cat">
  <p>${image.title}</p>
  <p>${image.description}</p>
</div>
</div> */


 

// imageUpload.addEventListener('submit', async function (e) {
//   const files = e.target.uploadedImages.files;
//   if (files.length != 0) {
//       for (const single_file of files) {
//           data.append('uploadedImages', single_file)
//       }
//   }

//   const submit_data_fetch = await fetch('/addImage', {
//     method: 'POST',
//     body: data
//   });
// });

// const submit_data_fetch = await fetch('/addImage', {
//   method: 'POST',
//   body: data
// });



// Image slider


// $('.nonloop').owlCarousel({
//   center: true,
//   items:2,
//   loop:false,
//   margin:10,
//   responsive:{
//       600:{
//           items:4
//       }
//   }
// });



// $(document).ready(function() {
//   ('.owl-carousel').owlCarousel();
// });
 
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination

  // Navigation arrows
  navigation: {
    nextEl: '.sliderButtonNext',
    prevEl: '.sliderButtonPrev',
  },

  // And if we need scrollbar
 
});