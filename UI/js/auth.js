class Validate {
  static email(email) {
    const emailResponse = document.getElementById('emailResponse');
    const error = [];
    const reg = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if (email === undefined || email === '') {
      error.push('Email is required');
    } else if (!reg.test(email)) {
      error.push('Please enter a valid email');
    }
    if (error.length > 0) {
      emailResponse.innerHTML = `${Validate.display(error)}`;
      emailResponse.style.display = 'block';
      emailResponse.style.opacity = 1;
      return false;
    }
    return true;
  }

  static password(password) {
    const passwordResponse = document.getElementById('passwordResponse');
    const error = [];
    if (password === undefined || password === '') {
      error.push('Password is required');
    } else if (password.length < 5) {
      error.push('Password should be more than five characters');
    }
    if (error.length > 0) {
      passwordResponse.innerHTML = `${Validate.display(error)}`;
      passwordResponse.style.display = 'block';
      passwordResponse.style.opacity = 1;
      return false;
    }
    return true;
  }

  static username(username) {
    const usernameResponse = document.getElementById('usernameResponse');
    const error = [];
    let regexp = /^\S+$/;
    if (username === undefined || username === "") {
      error.push('username is required');
    } else if (!regexp.test(username)) {
      error.push('Username cannot contain spaces');
    } else if ( username.length < 3) {
      error.push('Username should be more than 3 characters')
    }
    if (error.length > 0) {
      usernameResponse.innerHTML = `${Validate.display(error)}`;
      usernameResponse.style.display = 'block';
      usernameResponse.style.opacity = 1;
      return false;
    }
    return true;
  }

  static display(arr) {
    return arr.join('<br\>');
  }

  static clearDisplay(elem) {
    if (elem) {
      elem.style.opacity = 0; 
    }
  }
}

const errorTemplate = (error) => {
  return `${error.email || ''} <br\> ${error.username || ''}`;
}

const showerror = (error) => {
  const loginerror = document.getElementById('loginerror');
  const loginbtn = document.getElementById('loginbtn');
  const signupbtn = document.getElementById('signupbtn');
  const signuperror = document.getElementById('signuperror');
  if (loginbtn && loginerror) {
    loginbtn.innerHTML = 'Log in';
    loginerror.innerHTML = `${error}`;
    loginerror.style.display = 'block';
  }
  if (signupbtn && signuperror) {
    signupbtn.innerHTML = 'Sign up for questioner';
    signuperror.innerHTML = `${error.map(errorTemplate).join('')}`;
    signuperror.style.display = 'block';
  }
}

const handlesuccess = (success) => {
  const loginbtn = document.getElementById('loginbtn');
  const signupbtn = document.getElementById('signupbtn');
  const user = {
    token: success[0].token,
    username: success[0].user.username,
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

      return showerror(json.error);
    } else {
      return handlesuccess(json.data);
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
      return showerror(json.error);
    } else {
      return handlesuccess(json.data);
    }
  }
};

const emailResponse = document.getElementById('emailResponse');
const passwordResponse = document.getElementById('passwordResponse');
const usernameResponse = document.getElementById('usernameResponse');

const clearError = () => {
  emailResponse.innerHTML = '';
  passwordResponse.innerHTML = '';
  if (usernameResponse) { usernameResponse.innerHTML = ''; }
}

function initialise() {
  const loginForm = document.forms.login;
  const signupForm = document.forms.signup;
  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');
  const usernameField = document.getElementById('username');

  emailField.onkeyup = function() {
    Validate.clearDisplay(emailResponse);
  }

  passwordField.onkeyup = function(){
    Validate.clearDisplay(passwordResponse);
  }

  if(usernameField) {
    usernameField.onkeyup = function(){
      Validate.clearDisplay(usernameResponse);
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

window.onload = initialise();
