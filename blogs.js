// declaring variable s
var body = document.querySelector('body');
var ham = document.querySelector('.ico2');
var cross = document.querySelector('.ico3');
var sort_button = document.querySelector('.sort');

// drop angle for arrow of sortby
var angle_drop = {
    value: 0
}
sort_button.addEventListener('click', () => {
    document.querySelector('.sorting_method').classList.toggle('expand_sort')
    angle_drop.value += 180

    document.querySelector('.drop_icon').style.cssText = `transform:rotate(${angle_drop.value}deg)`
})





// for nav
function switches() {

    var ham = document.querySelector('.ico2');
    var cross = document.querySelector('.ico3');
    ham.classList.toggle('wrap');
    cross.classList.toggle('wrap');
    hide_nav();
}
function hide_nav() {
    document.querySelector('.vertical_navbar').classList.toggle('visible_verticle_navbar');
}
ham.addEventListener('click', switches);
cross.addEventListener('click', switches);


// sorting algo







// passing components
async function pass_blog(blog_index,image,category,likes,Title,blog_discription,author,Date){
    const res = await fetch(`https://dep-mocha-six.vercel.app/api/v1/user/userdetails/${author}`)
    const data2= await res.json()
    console.log(data2)
    var blog_container=document.querySelector('.blog_container')
    var date_attribute = string_to_date(Date)
    var blog_content = `<div  Date=${date_attribute} class="blog_${blog_index} blog" category=${category} likes=${likes}>
<div class="background bg${blog_index}" style="background-image:url(${image})">
    ${Title}
</div>
<div class="blog_disc">
    <div class="overview">Overview</div>
    <div class="blog_discription">${blog_discription}
    </div>
    <div class="Read">
        <a class="author" style="color:#ffc700;text-decoration:none;" href="./author_data.html?id=${data2.user._id}">Written By: ${data2.user.name}</a>
        <div class="caetogry">
            ${category}
        </div>
        <a class="Read_blog" href="./blogRead.html?id=${blog_index}&authorId=${data2.user._id}" style="color:#000000;text-decoration:none;" > Read</a>
        <div class="likes">Likes:  <span class="likes_blog_1">${likes}</span></div>
        <div class="date" >Date: ${Date}</div>
    </div>
</div>
</div>`
blog_container.innerHTML+=blog_content;
let blog_list=document.querySelectorAll('.blog');
var body_height= parseInt(getComputedStyle(document.querySelector('body')).getPropertyValue('height'),10);
var screen_height = window.innerHeight;

if(blog_list.length>6){
    let new_height = body_height + screen_height;
    body.style.cssText=`height:${new_height}px`;
}; 
}




var blogContainer = document.querySelector('.blog_container')
var blog_nodelist = document.querySelectorAll('.blog')
var Technology = document.querySelector('.sorting_meth1');
var Architecture = document.querySelector('.sorting_meth2');
var blogs = document.querySelectorAll('.blog');
var array_of_objects = [];
var Adventure = document.querySelector('.sorting_meth3');
var Experience = document.querySelector('.sorting_meth4');

for(let i=0;i<blog_nodelist.length;i++){
    array_of_objects.push(blog_nodelist[i]);
}





 // expect that date is in the form dd-mm-yyyy as string 
function string_to_date(str){
    var [day_str,month_str,year_str] = str.split('-');
    let day=parseInt(day_str);
    let month=parseInt(month_str);
    let year=parseInt(year_str);
    let date_uploaded = new Date();
    date_uploaded.setDate(day)// from api we will set the date
    date_uploaded.setMonth(month)// from api 
    date_uploaded.setYear(year)// from api
    var datime = date_uploaded.getTime()
    return datime;
}


// To get recent blogs 

let GET_RECENT_BLOGS = async () => {
    const response = await fetch("https://dep-mocha-six.vercel.app/api/v1/blogs/")

    const  data = await response.json()

    console.log(data)
    
    
    for (let i=0 ;i < data.blogs.length ;i ++ ) {
        pass_blog(data.blogs[i]._id , data.blogs[i].thumbnail?.secure_url  , data.blogs[i].category , 0 ,data.blogs[i].title, data.blogs[i].description , data.blogs[i].author , data.blogs[i].createdAt)
    }

}
window.addEventListener("load" , GET_RECENT_BLOGS)


// To get blogs by category 
// You just have to fetch https://dep-mocha-six.vercel.app/api/v1/blogs/getblogByCategory/:category
// Here :category will be urlSearchParameters 
// GET request it is 









const GET_BY_CATEGORY = async  (category )  =>   {
    
    console.log(" i running")
    var blog_container=document.querySelector('.blog_container')
    blog_container.innerHTML='';

    const get_by_cat = await fetch(`https://dep-mocha-six.vercel.app/api/v1/blogs/getblogByCategory/${category}`);
    const data = await get_by_cat.json();
    console.log(data);
    for (let i=0 ;i < data.blogs.length ;i ++ ) {
        pass_blog(data.blogs[i]._id , data.blogs[i].thumbnail?.secure_url  , data.blogs[i].category , 0 ,data.blogs[i].title, data.blogs[i].description , data.blogs[i].author , data.blogs[i].createdAt)
        }


}


        // Technology.addEventListener('click',GET_BY_CATEGORY("Health_and_Wellness"));