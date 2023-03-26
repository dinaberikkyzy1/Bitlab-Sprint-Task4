const testUsers = [
  {
    email: "some@email.com",
    password: "123",
    full_name: "John Bob",
    country: "kazahstan",
    birthdate: "2002-01-12",
  },
  {
    email: "some@email.com",
    password: "1234",
    full_name: "Test SurTest",
    country: "kazahstan",
    birthdate: "2002-01-12",
  },
];

localStorage.setItem("users", JSON.stringify(testUsers));


const btnSubmitRegister = document.getElementById("btnSubmitRegister"),
  btnSubmitLogin = document.getElementById("btnSubmitLogin"),
  userLoginBlock = document.getElementById("userLogin"),
  userInitialBlock = document.getElementById("userData"),
  userRegisterBlock = document.querySelector("#userRegister");

const registerUser = () => {
  userRegisterBlock.style.display = "block";
  userLoginBlock.style.display = "none";


  document.querySelector("#registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const getUsers = localStorage.getItem("users");
    let userData = {
      email: document.querySelector("#email").value,
      password: document.querySelector('#password').value,
      full_name: document.querySelector('#full_name').value,
      country: document.getElementById('country').value,
      birthdate: document.getElementById('birthdate').value
    }

    testUsers.push(userData);
    console.log(testUsers);
    localStorage.setItem("users", JSON.stringify(testUsers));
    loginUser();
  }, true);
}


const loginUser = () => {
  userRegisterBlock.style.display = "none";
  userLoginBlock.style.display = "block";

  const getUsers = localStorage.getItem("users");

  let confirmUser = false;

  document.querySelector("#loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let userData = {
      email: document.getElementById("emailLogin").value,
      password: document.getElementById("passwordLogin").value,
    }

    for (let user of JSON.parse(getUsers)) {

      if (user.email === userData.email && user.password === userData.password) {
        confirmUser = true;
        localStorage.setItem("user", JSON.stringify(user));
        // window.location.reload(false);
        navMenu("tweets");
      }
    }

    if (!confirmUser) {
      alert("Проверьте вводные данные");
    }
  })
}

const initialUser = () => {
  userRegisterBlock.style.display = "none";
  userLoginBlock.style.display = "none";
  userInitialBlock.style.display = "block";
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    document.querySelector('.changeTweets').innerHTML = `<a href="#" class="link">Tweets</a>`
    document.querySelector('.changeLogin').innerHTML = `<a href="#" class="link">${user.full_name}</a>`
    document.querySelector('.changeRegister').innerHTML = "<a href=\"#\" onclick=\"logout()\" class='link'>Logout</a>"

    const newElement = document.createElement("div");
    newElement.className = "userInfo"
    newElement.innerHTML = `
    <div>
      <h1>Welcome ${user.full_name}</h1>
    </div>
    <div class="userInfo-block">
      <p>EMAIL :</p>
      <p>${user.email}</p>
    </div>
    <div class="userInfo-block">
      <p>FULL NAME :</p>
      <p>${user.full_name}</p>
    </div>
    <div class="userInfo-block">
      <p>COUNTRY :</p>
      <p>${user.country}</p>
    </div>
    <div class="userInfo-block">
      <p>BIRTHDATE :</p>
      <p>${user.birthdate}</p>
    </div>
  `;

    userInitialBlock.append(newElement);
  }
}

function logout() {
  localStorage.removeItem("user");
  window.location.reload(false);
  // loginUser();
}

function navMenu(menuLink) {
  if (menuLink === "login") {
    loginUser();
  } else if (menuLink === "tweets") {
    const getUser = localStorage.getItem("user");
    if (getUser) {
      initialUser()
    } else {
      loginUser();
    }
  } else {
    registerUser();
  }
}

function headChancge() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    document.querySelector('.changeTweets').innerHTML = `<a href="#" class="link">Tweets</a>`
    document.querySelector('.changeLogin').innerHTML = `<a href="#" class="link">${user.full_name}</a>`
    document.querySelector('.changeRegister').innerHTML = "<a href=\"#\" onclick=\"logout()\" class='link'>Logout</a>"
  }
}

headChancge();