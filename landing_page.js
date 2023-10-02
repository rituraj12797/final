var body = document.querySelector('body')
var ham = document.querySelector('.ico2');
var cross = document.querySelector('.ico3');

function switches()
{

    var ham = document.querySelector('.ico2');
    var cross = document.querySelector('.ico3');
    ham.classList.toggle('wrap');
    cross.classList.toggle('wrap');
   hide_nav();
}
function hide_nav()
{
    document.querySelector('.vertical_navbar').classList.toggle('visible_verticle_navbar');
}
ham.addEventListener('click',switches);

var translate ={
    value:0
}
cross.addEventListener('click',switches);
console.log(translate.value);
function swiper()
{
    var feat = document.querySelector('.featured_blogs');
    feat.style.cssText=`transform:translateX(${translate.value}vw)`;
}
var featured_array = document.querySelectorAll('.featured_blg');
console.log()
document.querySelector('.left_button').addEventListener('click',()=>
{
    if(translate.value==0)
    {
        translate.value=-(featured_array.length-1)*100;
    swiper();

    }
    else{
        translate.value+=100;
    console.log(translate.value);
    swiper();
    }
})
document.querySelector('.right_button').addEventListener('click',()=>
{
    if(translate.value==-(featured_array.length-1)*100)
    {
        translate.value=0;
    swiper();

    }
   else{
    translate.value-=100;
    console.log(translate.value);
    swiper();
   }
})

let ALLBLOGS =  async () => { 
 
    const response  =await fetch("https://dep-mocha-six.vercel.app/api/v1/blogs/getAllblogs")
 
    const data = await response.json()
    // this is the api to fetch all blogs 

    console.log(data) 

}
window.addEventListener("load" , ALLBLOGS) 

// To get recent blogs 

let GET_RECENT_BLOGS = async () => {
    const response = await fetch("https://dep-mocha-six.vercel.app/api/v1/blogs/")

    const  data = await response.json()

    console.log(data)
}
window.addEventListener("load" , GET_RECENT_BLOGS)



const GET_BY_CATEGORY = async  (category )  =>   {
    
     const response = await fetch (`https://dep-mocha-six.vercel.app/api/v1/blogs/getblogByCategory/${category}`)

     const data = response.json() 

     console.log(data)

}









