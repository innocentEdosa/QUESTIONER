const usernameErrorResponse = document.getElementById('usernameErrorResponse');
const emailErrorResponse = document.getElementById('emailErrorResponse');
const passwordErrorResponse = document.getElementById('passwordErrorResponse');
const loginbtn = document.getElementById('loginbtn');
const signupbtn = document.getElementById('signupbtn');
const loginErrorResponse = document.getElementById('loginerror');


class Validate {
  static email(email) {
    const error = [];
    const reg = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if (email === undefined || email === '') {
      error.push('Email is required');
    } else if (!reg.test(email)) {
      error.push('Please enter a valid email');
    }
    if (error.length > 0) {
      emailErrorResponse.innerHTML = `${Validate.print(error)}`;
      Validate.display(emailErrorResponse);
      return false;
    }
    return true;
  }

  static password(password) {
    const error = [];
    if (password === undefined || password === '') {
      error.push('Password is required');
    } else if (password.length < 5) {
      error.push('Password should be more than five characters');
    }
    if (error.length > 0) {
      passwordErrorResponse.innerHTML = `${Validate.print(error)}`;
      Validate.display(passwordErrorResponse);
      return false;
    }
    return true;
  }

  static username(username) {
    const error = [];
    let regexp = /^\S+$/;
    if (username === undefined || username === "") {
      error.push('username is required');
    } else if (!regexp.test(username)) {
      error.push('Username cannot contain spaces');
    } else if (username.length < 3) {
      error.push('Username should be more than 3 characters')
    }
    if (error.length > 0) {
      usernameErrorResponse.innerHTML = `${Validate.print(error)}`;
      Validate.display(usernameErrorResponse);
      return false;
    }
    return true;
  }

  static print(arr) {
    return arr.join('<br\>');
  }

  static display(element) {
    element.style.display = 'block';
    element.style.opacity = 1;
  }

  static clearDisplay(elem) {
    if (elem) {
      elem.style.opacity = 0;
    }
  }
}

const fadeout = (value) => {
  value.style.opacity = 0;
  value.style.opacity = 0;
}
const fadein = (value) => {
  value.style.opacity = 1;
  value.style.display = 'block';
}
const fade = (value) => {
  setTimeout(fadein, 1000, value)
}

const checkSignupStatus = () => {
  let signupStatus = localStorage.getItem('signupStatus');
  const signupResponse = document.getElementById('signupResponse');
  if (signupStatus == 1) {
    signupResponse.innerHTML = `You have to be logged in to view meetups`;
    fade(signupResponse);
  }
  localStorage.removeItem('signupStatus');
}

const handleErrorResponse = (error) => {
  if (loginbtn) {
    loginbtn.innerHTML = 'Log in';
    if (error.email) {
      emailErrorResponse.innerHTML = `${Validate.print(error.email)}`;
      Validate.display(emailErrorResponse);
    }
    else {
      loginErrorResponse.innerHTML = `${error}`;
      Validate.display(loginErrorResponse);
    }
  }
  if (signupbtn) {
    signupbtn.innerHTML = 'Sign up for questioner';
    if (error.email) {
      emailErrorResponse.innerHTML = `${Validate.print(error.email)}`;
      Validate.display(emailErrorResponse);
    }
    if (error.username) {
      usernameErrorResponse.innerHTML = `${Validate.print(error.username)}`;
      Validate.display(usernameErrorResponse);
    }
  }
}

const handleSuccessResponse = (response) => {
  const user = {
    token: response[0].token,
    username: response[0].user.username,
    status: response[0].user.isAdmin,
    phonenumber: response[0].user.phoneNumber,
    email: response[0].user.email,
  }
  localStorage.removeItem('user');
  localStorage.setItem('user', JSON.stringify(user));
  console.log(user);
  if (loginbtn) {
    loginbtn.innerHTML = 'Login Successful';
    window.location.replace('meetup.html');
  }
  if (signupbtn) {
    signupbtn.innerHTML = 'Signup Successful';
    window.location.replace('meetup.html');
  }
}


const login = async (email, password) => {
  const checkemail = await Validate.email(email);
  const checkpassword = await Validate.password(password);
  if (checkemail && checkpassword) {
    clearError();
    const loginbtn = document.getElementById('loginbtn');
    loginbtn.innerHTML = `<img src="img/8.gif" alt="Loading" title="Loading" />`;
    const url = `https://innocentsquestioner.herokuapp.com/api/v1/auth/login`;
    const data = {
      email: email,
      password: password
    }

    const fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      }
    }

    const response = await fetch(url, fetchData);
    const json = await response.json();
    if (json.error) {
      return handleErrorResponse(json.error);
    } else {
      return handleSuccessResponse(json.data);
    }
  }
};


const signup = async (email, password, username) => {
  const checkemail = await Validate.email(email);
  const checkpassword = await Validate.password(password);
  const checkusername = await Validate.username(username);
  if (checkemail && checkpassword && checkusername) {
    clearError();
    const signupbtn = document.getElementById('signupbtn');
    signupbtn.innerHTML = `<img src="img/8.gif" alt="Loading" title="Loading" />`;
    const url = `https://innocentsquestioner.herokuapp.com/api/v1/auth/signup`;

    const data = {
      email: email,
      password: password,
      username: username,
      firstname: 'yourfirstname',
      lastname: 'yourlastname',
      othername: 'johndoe',
      phoneNumber: 0700000000
    }

    const fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      }
    }

    const response = await fetch(url, fetchData);
    const json = await response.json();
    if (json.error) {
      return handleErrorResponse(json.error);
    } else {
      return handleSuccessResponse(json.data);
    }
  }
};



const clearError = () => {
  emailErrorResponse.innerHTML = '';
  passwordErrorResponse.innerHTML = '';
  if (loginErrorResponse) { loginErrorResponse.style.display = 'none' }
  if (usernameErrorResponse) { usernameErrorResponse.innerHTML = ''; }
}

const initialiseForms = () => {
  const loginForm = document.forms.login;
  const signupForm = document.forms.signup;
  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');
  const usernameField = document.getElementById('username');

  emailField.onkeyup = function () {
    Validate.clearDisplay(emailErrorResponse);
  }
  passwordField.onkeyup = function () {
    Validate.clearDisplay(passwordErrorResponse);
  }
  if (usernameField) {
    usernameField.onkeyup = function () {
      Validate.clearDisplay(usernameErrorResponse);
    }
  }

  if (loginForm) {
    loginForm.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('login')) {
        const email = emailField.value;
        const password = passwordField.value;
        login(email, password);
      }
    });
  }
  if (signupForm) {
    signupForm.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('signup1')) {
        const email = emailField.value;
        const password = passwordField.value;
        const username = usernameField.value;
        signup(email, password, username);
      }
    });
  }
}

window.onload = function () {
  initialiseForms();
  checkSignupStatus();
}
