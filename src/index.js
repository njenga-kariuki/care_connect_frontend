console.log('hi');

//CONSTANTS TO DECLARE UP FRONT//
const getStartedButton = document.querySelector('#form-start')
const formSection = document.querySelector("div[id='questions']")

//END CONSTANTS

//test fetch
fetch ('http://localhost:3000/api/v1/caregivers')
.then(resp=> console.log(resp.statusText))

//
// //Hides all questions except for the first  on page load
// function hideQuestionsOnPageLoad(){
//   let questionForm = Array.from(document.querySelectorAll("form[id='question-container'] div[id='form-question']"))
//   questionForm.forEach((question)=>{
//     if (question.getAttribute('data-id') === '1'){
//       question.style.display = 'block'
//     }else {
//       question.style.display = 'none'
//     }
//   })
// }
//
// //function to loop over radio buttons of a questiondiv to check if one value is checked
// function checkForCheckedInput(questionDiv){
//   return Array.from(questionDiv.querySelectorAll('input')).find((input)=>input.checked ||input.checkValidity())
// }
//
// //event listener for radio button q's that will show unhide next question if valid input is entered
// function questionEventListenerClick(question){
//   question.addEventListener('click',(e)=>{
//     let i= parseInt(question.getAttribute('data-id'))
//     if (checkForCheckedInput(question) && i<5){
//       let nextQuestion = document.querySelector(`div[id='form-question'][data-id='${i+1}']`)
//       nextQuestion.style.display = 'block'
//       i++
//     }
//   })
// }
//
// function questionEventListnerClassClear(question){
//   question.addEventListener('click',(e)=> this.className = "")
// }
//
// //event listener for numeric input q's that will show unhide next question if valid input is entered
// function questionEventListenerKeyup(question){
//   question.addEventListener('keyup',(e)=>{
//     let i= parseInt(question.getAttribute('data-id'))
//     if (checkForCheckedInput(question) && i<5){
//       let nextQuestion = document.querySelector(`div[id='form-question'][data-id='${i+1}']`)
//       nextQuestion.style.display = 'block'
//       i++
//     }
//   })
// }
//
// //finds questions in form and adds event listeners based on question type
// function showNextQuestionWhenPreviousChecked(){
//   let questionForm = Array.from(document.querySelectorAll("form[id='question-container'] div[id='form-question']"))
//   questionForm.forEach((question)=>{
//     questionEventListnerClassClear(question)
//     if (question.querySelector('p').getAttribute('data-id') === 'zip'){
//       questionEventListenerKeyup(question)
//     } else {
//       questionEventListenerClick(question)
//     }
//   })
// }


//BEGIN QUESTION INIT + HANDLING
function showQuestion(n) {
  let x = document.getElementsByClassName("question");
  x[n].style.display = "block";

  if (n === 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Find CareGivers";
    submitButtonHandling();
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  fixStepIndicator(n)
}

function nextPrev(n){
  let x = document.getElementsByClassName("question");
  if (n === 1 && !validateForm()) return false;

  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  showQuestion(currentTab);
}

function validateForm(){
  let valid = true;
  let x = document.getElementsByClassName("question");
  let y = x[currentTab].getElementsByTagName("input");
  for (let i = 0; i < y.length; i++) {
    if (y[i].value == "") {
      y[i].className += " invalid";
      valid = false;
    }
  }
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}

function fixStepIndicator(n){
  let x = document.getElementsByClassName("step");
  for (let i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}

function formButtonPrevious(){
  let prevButton = document.querySelector("button[id='prevBtn']")
  prevButton.addEventListener('click',()=> nextPrev(-1))
}

function formButtonNext(){
  let nextButton = document.querySelector("button[id='nextBtn']")
  nextButton.addEventListener('click',()=> nextPrev(1))
}

//function that adds form to page on click of get started and hides the button
function formToggleOnClick(){
  formSection.style.display = 'none';
  getStartedButton.addEventListener('click',(e)=>{
  formSection.style.display = 'block'
  getStartedButton.style.display = 'none'
  })
}





//Store all question responses in an array for querying the database
// function submitButtonHandling(){
//   let submitButton = document.getElementById("nextBtn")
//   if (submitButton.innerHTML === "Find CareGivers"){
//
//     //add event listener on submit button
//     submitButton.addEventListener('click',()=>{
//       //get the values from every question into an object
//       let answerObj = {}
//       //get each of the five Questions
//       let questionForm = Array.from(document.querySelectorAll("form[id='question-container'] div[id='form-question']"))
//       // create an object that stores of all of them
//       questionForm.forEach((question)=>{
//         answerObj[question.innerText] = []
//
//         let questionResponse = Array.from(question.querySelectorAll('input')).filter((input)=>input.checked ||input.checkValidity())
//         answerObj[question.innerText].push(questionResponse)
//       })
//     })
//     console.log(answerObj);
//   }
// }
//END QUESTION INIT + HANDLING


//RUNNERS
// hideQuestionsOnPageLoad()
// showNextQuestionWhenPreviousChecked()
//BEGIN - show hide questions
let currentTab = 0;
formToggleOnClick()
showQuestion(currentTab);
formButtonPrevious();
formButtonNext();
//END - show hide questions
