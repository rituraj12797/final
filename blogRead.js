const likedIcon=document.querySelector(".liked");
const unlikedIcon=document.querySelector(".unliked");

likedIcon.style.display="none"

likedIcon.addEventListener("click",()=>{
    likedIcon.style.display="none"
    unlikedIcon.style.display=""
})

unlikedIcon.addEventListener("click",()=>{
    unlikedIcon.style.display="none"
    likedIcon.style.display="flex"
})

const textarea = document.querySelector(".blog-content");
textarea.addEventListener('keyup', autoResize, false);

function autoResize() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight+50) + 'px';
}

// function updateThumbnail(category){
//     let picture=document.querySelector(".thumbnail");
//     picture.src=`https://source.unsplash.com/1600x900/?${category}`;
//     console.log(picture.src);
// }
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
const id = getQueryParam('id');
 console.log(id) 
 const authorId = getQueryParam("authorId")
const READ = async() => { 
    const headers = new Headers();
    
    headers.append('Accept', '*/*');
    headers.append('Connection', 'keep-alive');

    const response = await fetch(`https://dep-mocha-six.vercel.app/api/v1/blogs/getblog/${id}`)
    const data= await response.json() 
    console.log(data)


    

    if(response.ok)  {
        document.getElementById("title").innerText = data?.blog?.title
        document.getElementById("category").innerText = data?.blog?.category


        const res = await fetch(`https://dep-mocha-six.vercel.app/api/v1/user/userdetails/${authorId}`)
        const data2= await res.json()



        document.getElementById("author").innerText = data?.blog?.title
        document.getElementById("author").innerText = data2.user.name
        document.getElementById("desc").innerText = data?.blog?.description
        document.getElementById("thumbnail").src = data?.blog?.thumbnail?.secure_url


    }else { 
        alert("Blog Does Not Exists") 
        location.href = "./blogRead.html"
    }
    console.log(data)
}
window.addEventListener("load" , READ)
