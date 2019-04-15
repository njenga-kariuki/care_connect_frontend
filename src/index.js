console.log('hi');

//test fetch
fetch ('http://localhost:3000/api/v1/caregivers')
.then(resp=> console.log(resp.statusText))


//Hides all questions except for the first  on page load
function hideQuestionsOnPageLoad(){
  let questionForm = Array.from(document.querySelectorAll("form[id='question-container'] div[id='form-question']"))
  questionForm.forEach((question)=>{
    if (question.getAttribute('data-id') === '1'){
      question.style.display = 'block'
    }else {
      question.style.display = 'none'
    }
  })
}

//function to loop over radio buttons of a questiondiv to check if one value is checked
function checkForCheckedInput(questionDiv){
  return Array.from(questionDiv.querySelectorAll('input')).find((input)=>input.checked ||input.checkValidity())
}

//event listener for radio button q's that will show unhide next question if valid input is entered
function questionEventListenerClick(question){
  question.addEventListener('click',(e)=>{
    let i= parseInt(question.getAttribute('data-id'))
    if (checkForCheckedInput(question) && i<5){
      let nextQuestion = document.querySelector(`div[id='form-question'][data-id='${i+1}']`)
      nextQuestion.style.display = 'block'
      i++
    }
  })
}

//event listener for numeric input q's that will show unhide next question if valid input is entered
function questionEventListenerKeyup(question){
  question.addEventListener('keyup',(e)=>{
    let i= parseInt(question.getAttribute('data-id'))
    if (checkForCheckedInput(question) && i<5){
      let nextQuestion = document.querySelector(`div[id='form-question'][data-id='${i+1}']`)
      nextQuestion.style.display = 'block'
      i++
    }
  })
}

//finds questions in form and adds event listeners based on question type
function showNextQuestionWhenPreviousChecked(){
  let questionForm = Array.from(document.querySelectorAll("form[id='question-container'] div[id='form-question']"))
  questionForm.forEach((question)=>{
    if (question.querySelector('p').getAttribute('data-id') === 'zip'){
      questionEventListenerKeyup(question)
    } else {
      questionEventListenerClick(question)
    }
  })
}

//RUNNERS
hideQuestionsOnPageLoad()
showNextQuestionWhenPreviousChecked()
