console.log(JSON.parse(localStorage.getItem("user")).user._id);
// let token;
if (localStorage.getItem("user")) {
  token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).token
    : "";
} else {
  alert("You are not Logged in ");
  location.href = "../index.html";
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

let getData = async (e) => {
  e.preventDefault();
  // let token = "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTcwYTU1Njc5ZmYxOWU5N2FhN2U2MCIsImVtYWlsIjoiYXl1c2h2aXNoNjU1NUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImRraGIiLCJpYXQiOjE2OTYwODIwMjAsImV4cCI6MTY5NjE2ODQyMH0.C1nzMd0j9tbwDi9ImnUMpStg5W3Ir6RsuNOpXXBi26Q; path=/api/v1/user; maxAge=1000*60*60*60; expires=Sun, 31 Dec 2023 23:59:59 GMT; domain=dep-mocha-six.vercel.app"
  // let token = (localStorage.getItem("user" )  ? JSON.parse(localStorage.user).token : "")
  let token2 = setCookie("token", token, {
    expires: "Sun, 31 Dec 2023 23:59:59 GMT",
    domain: "dep-mocha-six.vercel.app",
    path: "/api/v1/user",
  });
  console.log(token2);
  const response = await fetch(
    "https://dep-mocha-six.vercel.app/api/v1/user/me",
    {
      mode: "cors",
      method: "GET",
      headers: {
        Authentication: `Bearer ${token2}`,
      },
    }
  );
  console.log(response);
  if (response.ok) {
    const data = await response.json();
    console.log(data);
  } else {
    alert("you are not Logged in ");
    location.href = "../index.html";
  }

  // In the data all the response is there
};

window.addEventListener("load", getData);

const updateProfile = async (e) => {
  e.preventDefault();
  

  const formData = new FormData();

  formData.append(
    "avatar",
    document.getElementById("input-profile-image").files[0]
  );
  formData.append(
    "bio",
    document.getElementById("bio").value
  );
  formData.append(
    "username",
    document.getElementById("slug").value
  );
  formData.append(
    "name",
    document.getElementById("name_input").value
  );

  const headerss = new Headers();

  headerss.append(
    "Authentication",
    `Bearer ${setCookie("token", token, {
      expires: "Sun, 31 Dec 2023 23:59:59 GMT",
      domain: "dep-mocha-six.vercel.app",
      path: "/api/v1/user",
    })}`
  );
  headerss.append("Accept", "*/*");
  headerss.append("Connection", "keep-alive");
  console.log("jbd");
  console.log(headerss);
  const response = await fetch(
    "https://dep-mocha-six.vercel.app/api/v1/user/updateUser",
    {
      method: "POST",
      body: formData,
      headers: headerss,
      mode: "cors",
    }
  );
  console.log(response);
  const data = await response.json();
  console.log(data);
  if(response.ok) {
    alert("user Upadated SuccessFully ") 
    location.reload()
  }
  else  { 
      alert(data.message) 
      
  }
};
document.getElementById("submitt").addEventListener("click", updateProfile);
// I was not getting the save button


