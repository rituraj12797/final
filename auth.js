const signUpButt=document.querySelector(".signUpButt")
const signInButt=document.querySelector(".signInButt")

const url="https://dep-mocha-six.vercel.app/api/v1/user/register"
const url2="https://dep-mocha-six.vercel.app/api/v1/user/login"


const postData = async(event)=>{
    event.preventDefault();
    const form=document.getElementById("sign-up-form");
    console.log(form)
    const formData=new FormData(form);
    const headers = new Headers();
    
    headers.append('Accept', '*/*');
    headers.append('Connection', 'keep-alive');

    // console.log(formData , headers)
   
    const response  = await fetch(url,{
        method:"POST",
        body: formData,
        headers : headers
    })
    // console.log(response)
    if(response.ok) {
        alert("registered SuccessFully") 
        alert("Now Login ") 
        location.reload() 
        
    }
    const data = await response.json( )
    console.log(data)
    
    
}

signUpButt.addEventListener("click",postData);

const getLogin = async(event)=>{
    event.preventDefault();
     
    const lgnemail=document.querySelector(".loginEmail").value;
    const lgnpassword=document.querySelector(".loginPassword").value;
    const request={
        email:lgnemail,
        password:lgnpassword,
    }
    const headers = new Headers();
    
    headers.append('Accept', '*/*');
    headers.append('Connection', 'keep-alive');
    const response  = await fetch(url2,{
        method:"POST",
        headers: {"Content-Type": "application/json;charset=utf-8"},
        body: JSON.stringify(request), 
        mode : "cors",
    })
    if(response.ok)  {
        const data = await response.json() 
        console.log(data)
        localStorage.setItem("user",  JSON.stringify(data))
        localStorage.setItem("isLoggedIn" , "true")
        alert("Logged in Successfully")
        window.location.href = "./landing_page.html"
        
    }else  {
        
        const data  =await response.json() 
        alert(data.message)
    }
    
}

signInButt.addEventListener("click",getLogin);

