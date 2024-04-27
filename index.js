/******** dark mode ********/
let themeButton = document.getElementById("theme-button");
let icon = document.getElementById("icon");
let icon1 = document.getElementById("icon-1");
let icon2 = document.getElementById("icon-2");
let clicked = true;
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
  if(clicked == true){
    icon.src = "Images/icondark.png";
    icon1.src = "Images/icon-1dark.png";
    icon2.src = "Images/icon-2dark.png";
    clicked = false;
  }
  else{
    icon.src = "Images/icon.png";
    icon1.src = "Images/icon-1.png";
    icon2.src = "Images/icon-2.png";
    clicked = true;
  }
}

themeButton.addEventListener("click", toggleDarkMode); // when theme button is clicked, toggleDarkMode function is called

/******** add signute to pane ********/
let signNowButton = document.getElementById("sign-now-button");

const addSignature = (person) => {
  // new paragraph element on the page where the other signatures are
  let signature = document.createElement("p");
  //  text content: the new paragraph element
  signature.textContent = `🖊️ ${person.name}  from ${person.hometown} supports this.`; 
  let signatures = document.querySelector(".signatures");
  signatures.appendChild(signature);

  let count = 3;
  let counter = document.getElementById("counter");

  counter.remove();
  count = count + 1
  counter = document.createElement("p");
  counter.id = "counter"

  counter.textContent = "🖊️ " + count + " people have signed this petition and support this cause.";
  signatures.appendChild(counter)
}

/******** validation form ********/
const validateForm = () => {
  let containsErrors = false;
  var petitionInputs = document.getElementById("sign-petition").elements;

  let person = {
    name: petitionInputs[0].value,
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value
  }
  
  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      containsErrors = true;
      petitionInputs[i].classList.add('error');
    }
    else {
      petitionInputs[i].classList.remove('error');
    }
  }
  
  const email = document.getElementById('email');
  
  if (!email.value.includes('.com')){
    containsErrors = true;
    email.classList.add('error');
  }
  else{
    email.classList.remove('error');
  }

  if (containsErrors == false){
    addSignature(person);
    toggleModal(person)
    for (let i = 0; i < petitionInputs.length; i++){
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }
}

/******** toggle modal ********/
let modal = document.getElementById("thanks-modal");


const toggleModal = (person) =>{
  let modalContent = document.getElementById("thanks-modal-content");
  let intervalId = setInterval(scaleImage, 500);
    
  modal.style.display = "flex";
  
  modalContent.textContent = `Thank you ${person.name} for signing our petition!`;
  
  setTimeout(() => {modal.style.display = "none"; clearInterval(intervalId);}, 10000)
}

signNowButton.addEventListener('click', validateForm); // when sign now button is clicked, validateForm function is called

/******** Image animation ********/
let scaleFactor = 1;
let modalImage = document.getElementById("modal-img");
const scaleImage = () =>{
  if (scaleFactor === 1){
    scaleFactor = 0.8;
  }
  else{
    scaleFactor = 1;
  }
  modalImage.style.transform = `scale(${scaleFactor})`;
}

/******** Close modal ********/
let closeButton = document.getElementById("close-modal");
closeButton.addEventListener('click', ()=>{modal.style.display = "none";});

/******** Scroll animation ********/
let animation = {
  revealDistance: 30,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '1s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
}

let revealableContainers = document.querySelectorAll('.revealable');

const reveal = () =>{
  for(let i = 0; i < revealableContainers.length; i++){
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if(topOfRevealableContainer < windowHeight - animation.revealDistance){
      revealableContainers[i].classList.add('active');
    }
    else{
      revealableContainers[i].classList.remove('active');
    }
  }
}
reveal();
window.addEventListener('scroll', reveal); // when the page is scrolled, reveal function is called
