const signUpButton=document.getElementById("signUp")
const signInButton=document.getElementById("signIn")
const container=document.getElementById("container")
// const newSignIn=document.querySelector(".hidden-sign-in")
// const newSignUp=document.querySelector(".hidden-sign-up")
const signInContainer=document.querySelector(".sign-in-container")
const signUpContainer=document.querySelector(".sign-up-container")

signUpButton.addEventListener("click",()=>{
    container.classList.add("right-panel-active")
})
// newSignUp.addEventListener("click",()=>{
//     container.classList.add("right-panel-active")
// })

signInButton.addEventListener("click",()=>{
    container.classList.remove("right-panel-active")
})
// newSignIn.addEventListener("click",()=>{
//     container.classList.remove("right-panel-active")
// })

