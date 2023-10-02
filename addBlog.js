var addbutton = document.querySelector('.addbutton');



let token;
if (localStorage.getItem("user")) {
  token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).token
    : "";
} else {
  alert("You are not Logged in ");
  location.href = "./index.html";
}
function setCookie(name, value, options = {}) {
  const defaults = {
    path: "/", // The path for which the cookie is valid          // The expiration date (if empty, the cookie is a session cookie)
    maxAge: "1000*60*60*60", // The maximum age of the cookie in seconds (if set, takes precedence over 'expires')           // The domain for which the cookie is valid
    secure: false, // The cookie can only be transmitted over secure (HTTPS) connections
  };

  // Merge provided options with defaults
  const mergedOptions = { ...defaults, ...options };

  // Build the cookie string
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  // Add options to the cookie string
  for (const [key, val] of Object.entries(mergedOptions)) {
    if (val) {
      cookieString += `; ${key}=${val}`;
    }
  }

  // Set the cookie
  // document.cookie = cookieString;
  return cookieString;
  // console.log(cookieString)
}

// Example: Set a cookie named 'myCookie' with the value 'exampleValue'

const addBlog = async (e) => {
  e.preventDefault();

  const formDataa = new FormData();
  formDataa.append("title", document.getElementById("title").value);
  formDataa.append(
    "description",
    document.getElementById("desc").value
  );
  formDataa.append("category",document.getElementById("category"));
  formDataa.append("thumbnail" ,document.getElementById("thumbnail").files[0] )
  console.log(formDataa)
  const headerss = new Headers();
  headerss.append('Accept', '*/*');
  headerss.append('Connection', 'keep-alive');
  headerss.append(
    "Authentication",
    `Bearer ${setCookie("token", token, {
      expires: "Sun, 31 Dec 2023 23:59:59 GMT",
      domain: "dep-mocha-six.vercel.app",
      path: "/api/v1/user",
    })}`)
  const response = await fetch("https://dep-mocha-six.vercel.app/api/v1/blogs/create-blog" , {
    headers : headerss , 
    body:  formDataa, 
    mode: "cors", 
    method: "POST"


  })
  if(response.ok) 
  {
    // alert( "Blog created SuccessFully") 
    location.href="./landing_page.html"
  }
  else { 
    const data = await response.json( ) 

    // alert(data.message) 
    location.reload()
  }

  console.log(data)

};
addbutton.addEventListener("click" , addBlog) 
